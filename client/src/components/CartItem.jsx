import React from "react";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext";

/**
 * A cart item.
 *
 * @typedef {Object} CartItemType
 * @property {number} _id The unique identifier for the product item.
 * @property {string} name The name of the product item.
 * @property {string} description A description of the product item.
 * @property {number} price The price of the product item.
 * @property {number} totalPrice The price of the product item.
 * @property {string} image The URL of the product item image.
 * @property {number} quantityInStock The quantity of the product item in stock.
 * @property {number} quantity The quantity of the product item in cart.
 *
 * @param {CartItemType} product
 */
export default function CartItem(product) {
  const { removeItem, increaseQuantity, decreaseQuantity } = useCart();

  const handleRemove = () => {
    removeItem(product._id);
  };
  return (
    <div className="flex gap-x-2 p-4 w-full max-w-[400px] border-b">
      <div className="">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-[200px]"
        />
      </div>
      <div className="flex flex-col justify-between gap-y-8 w-full">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-semibold">{product.name}</span>
            <span className="text-sm">Quantity: {product.quantity}</span>
          </div>
          <div className="ml-auto">
            <span className="font-semibold">₹ {product.totalPrice}</span>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <Button
            variant="ghost"
            className="flex items-center gap-x-2"
            onClick={handleRemove}
          >
            <TrashIcon className="w-4 h-4 text-slate-600" />
            <span className="text-slate-600">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
