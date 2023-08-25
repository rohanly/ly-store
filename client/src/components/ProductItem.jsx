import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A product item.
 *
 * @typedef {Object} ProductItemType
 * @property {number} _id The unique identifier for the product item.
 * @property {string} name The name of the product item.
 * @property {string} description A description of the product item.
 * @property {string} category A description of the product item.
 * @property {number} price The price of the product item.
 * @property {string} image The URL of the product item image.
 * @property {number} quantityInStock The quantity of the product item in stock.
 *
 * @param {ProductItemType} product
 */
export default function ProductItem(product) {
  const { cart, addItem, removeItem, increaseQuantity, decreaseQuantity } =
    useCart();
  const [cartItem, setCartItem] = useState({});
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const res = cart.filter((p) => p._id === product._id);
    if (res.length) {
      setCartItem(res.at(-1));
      setAddedToCart(true);
    } else {
      setCartItem({});
      setAddedToCart(false);
    }
  }, [cart]);

  const handleRemove = () => {
    removeItem(product._id);
  };

  return (
    <Card
      className={cn("transition-colors duration-150 ease-out overflow-hidden")}
    >
      <img
        src={product.image}
        alt="product-image"
        className="w-full max-h-[250px] object-contain"
      />
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <div className="text-xs text-slate-600">{product.category}</div>
        <CardTitle>₹ {product.price}</CardTitle>
        <CardDescription className="truncate">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        {addedToCart ? (
          <div className="w-full flex flex-col md:flex-row ">
            <div className="flex-1 flex items-center border-2 bg-background rounded-lg max-w-[120px] overflow-hidden">
              <button
                className="flex-1  bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground h-full "
                onClick={() => decreaseQuantity(product._id)}
              >
                -
              </button>
              <h2 className="flex-1 text-center">{cartItem.quantity}</h2>
              <button
                className="flex-1 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground  h-full"
                onClick={() => increaseQuantity(product._id)}
              >
                +
              </button>
            </div>
            <Button
              variant="outline"
              className="ml-auto bg-transparent border border-slate-500 hover:border-destructive hover:bg-white rounded-md text-slate-500 hover:text-destructive"
              onClick={handleRemove}
            >
              <Trash className="w-4 h-4 " />
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            disabled={product.quantityInStock <= 0}
            onClick={() => addItem(product)}
          >
            <ShoppingCart className="mr-2" /> Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
