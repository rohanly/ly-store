import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import CartItem from "@/components/CartItem";
import { useCheckout } from "@/context/CheckoutContext";
import { BanknoteIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function Checkout() {
  const { checkout, addOrder } = useCheckout();
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const handlePayment = () => {
    try {
      const resp = addOrder(checkout, paymentMethod);
      console.log(resp);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePaymentMethod = (e) => {
    if (e.target.value) {
      setPaymentMethod(e.target.value);
    }
  };

  return (
    <section className="bg-gray-50 flex-1 py-12">
      <div className="ml-auto mr-auto w-full pl-8 pr-8 flex gap-x-5">
        <div className="bg-white w-3/4">
          <div className="flex flex-col gap-y-4 bg-background p-6">
            <div className="border-b border-gray-200 flex items-center pb-2 mb-4">
              <BanknoteIcon className="w-8 h-8 mx-2" />
              <span className="text-3xl font-semibold">Payment</span>
            </div>

            <RadioGroup
              className="gap-6"
              defaultValue="UPI"
              onClick={handlePaymentMethod}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="UPI" id="upi-payment" />
                <Label htmlFor="upi-payment"> UPI Payment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CARD" id="card-payment" />
                <Label htmlFor="card-payment"> Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CASH" id="cash-payment" />
                <Label htmlFor="cash-payment">CASH</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex flex-col gap-y-8 w-1/4">
          <div className="bg-white p-6">
            <div className="grid grid-cols-1 gap-y-6">
              <div>
                <div className="text-small-regular text-gray-700">
                  <div className="flex items-center justify-between text-base-regular text-gray-900 mb-2">
                    <span>Total Products</span>
                    <span>{checkout.totalQuantity}</span>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div className="flex items-center justify-between">
                      <span>Price</span>
                      <span>{checkout.totalPrice}</span>
                    </div>
                  </div>
                  <div className="h-px w-full border-b border-gray-200 border-dashed my-4"></div>
                  <div className="flex items-center justify-between text-base-regular text-gray-900 mb-2">
                    <span>Total</span>
                    <span>{checkout.totalPrice}</span>
                  </div>
                </div>
              </div>

              <Button
                disabled={!checkout.totalPrice}
                className="w-full"
                onClick={handlePayment}
              >
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
