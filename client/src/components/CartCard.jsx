import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { Button } from "./ui/button";
import CheckoutModal from "./CheckoutModal";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function CartCard({ showCheckout }) {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleCheckout = () => {
    setOpen(false);
    showCheckout();
  };

  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={100}>
      <HoverCardTrigger>
        <Button variant="secondary">
          <ShoppingCart />

          {cart.length ? <span className="ml-2">{cart.length}</span> : null}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="-translate-x-4 translate-y-4 w-full max-w-[500px]">
        <div className="overflow-y-auto max-h-[350px]">
          {cart.length ? (
            cart.map((item) => <CartItem key={item._id} {...item} />)
          ) : (
            <div className="w-full min-w-[250px]">your cart is empty</div>
          )}
        </div>

        <Button
          onClick={handleCheckout}
          disabled={!cart.length}
          className="w-full mt-4"
        >
          CHECKOUT
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}
