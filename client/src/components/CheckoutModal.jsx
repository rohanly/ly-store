import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCart } from "@/context/CartContext";
import { Button, buttonVariants } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useCheckout } from "@/context/CheckoutContext";
import { Loader2 } from "lucide-react";

export default function CheckoutModal({ open, setOpen }) {
  const { cart } = useCart();
  const { checkout, addOrder } = useCheckout();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const resp = await addOrder(checkout, "UPI", email);
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Dialog asChild open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            complete your purchase with ease.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-center">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="off"
              autoFocus
              value={email}
              onChange={handleEmail}
              className="col-span-3"
              required
              placeholder="username@ly.design"
              pattern=".+@ly\.design"
              title="Enter your Lemon Yellow email ID"
            />
            <span></span>
            <p className="col-span-3 text-destructive text-xs">{error}</p>
          </div>

          <Button type="submit" disabled={loading || error} className="w-full">
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>Pay {`₹ ${checkout.totalPrice}`}</span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
