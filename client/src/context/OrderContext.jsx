import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderContext = React.createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/order/");
      setOrders(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/order/${id}`);
      if (response.status === 200) {
        const updateOrders = orders.filter((order) => order.id !== id);
        setOrders(updateOrders);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id, order) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/order/${id}`, order);
      if (response.status === 200) {
        const updatedOrders = orders.map((order) => {
          if (order.id === id) {
            return order;
          } else {
            return order;
          }
        });
        setOrders(updatedOrders);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        refetch: fetchOrders,
        deleteOrder,
        updateOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

const useOrders = () => {
  const context = React.useContext(OrderContext);
  return context;
};

export { OrderProvider, useOrders };
