import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { useSession } from "@/context/SessionContext";

const Cart = () => {
  const ref = useRef(null);

  const { isAuthenticated } = useSession();
  const { checkout } = useCheckout();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <section ref={ref} className="bg-gray-100 py-12">
      <div className="ml-auto mr-auto w-full pl-8 pr-8 flex gap-x-5">
        <div className="bg-white w-3/4">
          <div className="flex flex-col gap-y-8 bg-white p-6">
            {!isAuthenticated ? (
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    Already have an account?
                  </h2>
                  <p className="text-base text-gray-700 mt-2">
                    Login in for a better experience.
                  </p>
                </div>
                <div>
                  <Link to="/account/login">
                    <Button variant="secondary">Login</Button>
                  </Link>
                </div>
              </div>
            ) : null}

            <div>
              <div className="border-b border-gray-200 pb-3 flex items-center mb-8">
                <span className="text-3xl font-semibold">Shopping Bag</span>
              </div>

              <CartContainer />
            </div>
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
              <Link to="/checkout">
                <Button disabled={!isAuthenticated} className="w-full">
                  GO TO CHECKOUT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;

function CartContainer() {
  const { cart } = useCart();
  return (
    <div>
      {cart.map((item) => (
        <CartItem key={item._id} {...item} />
      ))}
    </div>
  );
}
