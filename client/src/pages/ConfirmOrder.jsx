import React, { useEffect, useRef, useState } from "react";
import prdImg from "@/assets/images/cart-img.webp";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import jsPDF from "jsPDF";
import html2canvas from "html2canvas";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ConfirmOrder = () => {
  const [order, setOrder] = useState({});
  const orderDivRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  let { orderId } = useParams();
  const fetchOrder = async (orderId) => {
    try {
      const response = await axios.get(`/api/order/${orderId}`);
      setOrder(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async () => {
    // setIsDownloading(true);
    window.print();
    // html2canvas(orderDivRef.current, {
    //   scrollY: 0,
    // }).then((canvas) => {
    //   // canvas.width = orderDivRef.current.offsetWidth;
    //   // canvas.height = orderDivRef.current.offsetHeight;
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF({
    //     orientation: "p",
    //     unit: "mm",
    //     format: "a4",
    //     putOnlyUsedFonts: true,
    //   });
    //   pdf.addImage(imgData, "PNG", 0, 0);
    //   pdf.save(`order_${order._id}.pdf`);
    //   setIsDownloading(false);
    // });
  };

  useEffect(() => {
    fetchOrder(orderId);
  }, []);

  return (
    <section className="bg-gray-50 py-6">
      <div
        ref={orderDivRef}
        className="flex justify-center ml-auto mr-auto w-full pl-8 pr-8 pb-8"
      >
        <div className="max-w-4xl h-full pb-12 bg-white w-full">
          <div className="flex justify-center items-start p-4">
            <Button
              id="download-as-pdf"
              className="ml-auto"
              disabled={isDownloading}
              onClick={handleDownload}
            >
              Download as PDF
            </Button>
          </div>
          <div className="flex justify-center items-start p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="66"
              height="66"
              viewBox="0 0 66 66"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M66 33.0032C66 51.2305 51.2256 66 33 66C14.7744 66 0 51.2242 0 33.0032C0 14.7821 14.7744 0 33 0C51.2256 0 66 14.7758 66 33.0032Z"
                fill="#F8DF00"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M54.4817 25.5965H51.1124C51.1124 21.4963 47.7809 18.1645 43.6811 18.1645V14.7949C49.6387 14.7949 54.4817 19.6446 54.4817 25.5965Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.6795 42.4569C22.0169 42.4569 20.6692 41.1217 20.644 39.4589V39.4463C20.644 39.4337 20.644 39.4274 20.644 39.4211V29.8792V18.1958H14.5793V38.848C14.5793 42.9104 17.0921 46.3871 20.644 47.8231C21.7587 48.2703 22.9741 48.5222 24.2463 48.5222H26.7087V42.4569C26.715 42.4569 23.7299 42.4569 23.6795 42.4569Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M39.0398 24.2861V24.8214H39.0335V33.3997H39.021C39.021 35.0751 37.6606 36.4292 35.9855 36.4292C34.3103 36.4292 32.9563 35.0751 32.9563 33.3997V24.8151V24.2861H26.879V33.3997C26.879 38.4321 30.9599 42.5134 35.9918 42.5134C37.0624 42.5134 38.0826 42.3181 39.0398 41.978V45.5051C39.0398 45.5114 39.0398 45.524 39.0398 45.5303V45.5429C39.0209 47.1993 37.6732 48.5409 36.0106 48.5409C35.9666 48.5409 32.9752 48.5409 32.9752 48.5409V54.6062H35.4376C36.7097 54.6062 37.9251 54.3605 39.0398 53.907C42.5918 52.4773 45.1045 49.0006 45.1045 44.9319V24.2798H39.0398V24.2861Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="p-10 border-b border.gray-200">
            <span className="text-gray-700 text-sm font-medium uppercase">
              Thank you, your order was successfully placed
            </span>
            {/* <h1 className="mt-2 uppercase text-2xl-semi">{`#${order.count}`}</h1> */}
            <p className="mt-2">Order ID: {order._id}</p>
            <div className="flex items-center text-gray-700 text-sm font-medium gap-x-4 mt-4">
              <span>{moment(order.orderDate).format("DD/MM/YYYY")}</span>
              <span className="font-semibold"> {order.quantity} items</span>
            </div>
          </div>
          <div className="h-full max-h-[500px] overflow-auto">

            <div className="flex gap-x-2 px-10 pt-4 border-b border-gray-200">
              <Table className="max-h-[500px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.products?.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>₹{product.price * product.quantity}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-medium">Total</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="font-medium">₹{order.amount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="h-20"></div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmOrder;
