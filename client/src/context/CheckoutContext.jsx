import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useSession } from "./SessionContext";
import { useNavigate } from "react-router-dom";

const CheckoutContext = React.createContext();

export const CheckoutProvider = ({ children }) => {
  const { cart, resetCart } = useCart();
  const { sessionUser } = useSession();
  const navigate = useNavigate();

  const [checkout, setCheckout] = useState({});

  useEffect(() => {
    let totalQuantity = 0;
    let totalPrice = 0;
    for (let item of cart) {
      totalQuantity += item.quantity;
      totalPrice += item.totalPrice;
    }
    setCheckout({ totalPrice, totalQuantity });
  }, [cart]);

  const addOrder = async (
    { totalPrice, totalQuantity },
    paymentMethod,
    email
  ) => {
    const products = [];

    for (const item of cart) {
      products.push({
        _id: item._id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
      });
    }
    let newOrder = {
      orderDate: new Date(),
      customerName: sessionUser?.name ?? email,
      paymentMethod: paymentMethod ?? "UPI",
      products,
      userId: sessionUser?._id,
      amount: totalPrice,
      quantity: totalQuantity,
    };
    try {
      // const response = await axios.post("/api/order/", newOrder);
      axios.post("/api/order/makePayment", newOrder).then(({ data }) => {
        window.location.replace(data);
      });
      // resetCart();
      // setCheckout({});
      // console.log("Order Placed Successfully! 🎉");
    } catch (err) {
      console.log(err);
    }
  };

  const makePayment = async () => {};

  return (
    <CheckoutContext.Provider value={{ checkout, addOrder }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);

  return context;
};
