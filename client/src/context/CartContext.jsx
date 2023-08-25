import { useToast } from "@/components/ui/use-toast";
import React, { useState, useContext } from "react";

// Define the context type
export const CartContext = React.createContext({
  /**
   * @type {import("@/components/CartItem").CartItemType[]}
   */
  cart: [],
  addItem: (productId, quantity) => {},
  removeItem: (productId) => {},
  increaseQuantity: (productId) => {},
  decreaseQuantity: (productId) => {},
});

// The Provider component
export const CartProvider = ({ children }) => {
  const { toast } = useToast();
  // Define the state
  const [cart, setCart] = useState([]);

  // Define the functions

  const addItem = (product, quantity = 1) => {
    const item = cart.find((item) => item._id === product._id);
    if (item) {
      item.quantity++;
      item.totalPrice = item.price * item.quantity;
      setCart([...cart]);
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { ...product, quantity, totalPrice: product.price },
      ]);
    }
    toast({
      title: "Added to Cart",
      description: `${product.name} is added to your cart`,
    });
  };

  const removeItem = (productId) => {
    setCart((prevCart) => {
      return prevCart.filter((item) => item._id !== productId);
    });
  };

  const increaseQuantity = (productId) => {
    const item = cart.find((item) => item._id === productId);
    if (item) {
      item.quantity++;
      item.totalPrice = item.price * item.quantity;
      setCart([...cart]);
    }
  };

  const decreaseQuantity = (productId) => {
    const item = cart.find((item) => item._id === productId);
    if (item) {
      item.quantity--;
      item.totalPrice = item.price * item.quantity;
      if (item.quantity === 0) {
        removeItem(productId);
      } else {
        setCart([...cart]);
      }
    }
  };

  const resetCart = () => {
    setCart([]);
  };

  // Return the Provider component
  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// The Consumer component
export const useCart = () => {
  // Use the context to get the state and functions
  const context = useContext(CartContext);

  return context;
};
