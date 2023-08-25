import React, { useEffect, useState } from "react";
import { Trash2Icon } from "lucide-react";
import EditProduct from "@/pages/admin/EditProduct";
import { useProducts } from "@/context/ProductContext";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrders } from "@/context/OrderContext";
import { RefreshCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";
import { cn } from "@/lib/utils";

const AdminDataTable = () => {
  const {
    products,
    refetch: refetchProducts,
    loading: loadingProducts,
    deleteProduct,
  } = useProducts();
  const {
    orders,
    refetch: refetchOrders,
    loading: loadingOrders,
  } = useOrders();

  return (
    <section className="w-full mt-10 pl-4 flex flex-col gap-8">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold mb-4 flex items-center">
          Products
          <button>
            <RefreshCcw
              onClick={refetchProducts}
              className="w-5 h-5 ml-2 text-secondary-foreground"
            />
          </button>
        </h1>
        {loadingProducts ? (
          <Spinner />
        ) : (
          <div className="h-full max-h-[500px] overflow-auto">
            <Table className="border">
              <TableCaption>A list of products.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Edit</TableHead>
                  <TableHead className="text-right">Delete</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.quantityInStock}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell className="text-right">
                      <EditProduct productDetails={product} />
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        className="hover:underline text-red-500"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-4 flex items-center">
          Orders
          <button>
            <RefreshCcw
              onClick={refetchOrders}
              className="w-5 h-5 ml-2 text-secondary-foreground"
            />
          </button>
        </h1>
        {loadingOrders ? (
          <Spinner />
        ) : (
          <div className="max-h-[500px] overflow-auto">
            <Table className="border ">
              <TableCaption>A list of orders.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">
                      {moment(order.orderDate).format("MM/DD/YYYY")}
                    </TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>
                      <ul>
                        {order.products?.map((product) => (
                          <li
                            key={product._id}
                          >{`${product.name} x ${product.quantity}`}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ₹ {order.amount}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "font-semibold uppercase",
                        order.paymentStatus?.toLowerCase() === "success"
                          ? "text-green-500"
                          : order.paymentStatus?.toLowerCase() === "pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      )}
                    >
                      {order.paymentStatus}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDataTable;

function Spinner() {
  return (
    <div className="mb-4">
      <Skeleton className="h-[40px] mb-1" />
      <Skeleton className="h-[40px] mb-1" />
    </div>
  );
}
