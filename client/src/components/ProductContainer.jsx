import React from "react";
import ProductItem from "./ProductItem";
import { useProducts } from "@/context/ProductContext";

export default function ProductContainer() {
  const { products, loading, error } = useProducts();
  if (loading) return <div>loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className="flex-1 ml-auto mr-auto w-full pr-8 pl-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products &&
          products.map((product) => (
            <ProductItem key={product._id} {...product} />
          ))}
      </div>
    </div>
  );
}
