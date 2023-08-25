import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/product/");
      setProducts(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/product/${id}`);
      if (response.status === 200) {
        toast({
          title: "Product deleted successfully!",
        });
        fetchProducts();
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (product, file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("productImage", product.productImage);
    formData.append("price", product.price);
    formData.append("quantityInStock", product.quantityInStock);
    formData.append("category", product.category);
    formData.append("productImage", file);
    try {
      const response = await axios.put(
        `/api/admin/editProduct/${product._id}`,
        formData
      );
      if (response.status === 200) {
        toast({
          title: "Product Updated Successfully!",
          description: `${product.name} is updated`,
        });
        fetchProducts();
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        refetch: fetchProducts,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProducts = () => {
  const context = React.useContext(ProductContext);
  return context;
};

export { ProductProvider, useProducts };
