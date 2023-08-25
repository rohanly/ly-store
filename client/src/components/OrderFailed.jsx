import { XCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function OrderFailed() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };
  return (
    <section className="bg-gray-50 py-6 min-h-[calc(100vh-64px)]">
      <div className="flex justify-center ml-auto mr-auto w-full pl-8 pr-8 pb-8">
        <div className="max-w-4xl h-full pb-12 bg-white w-full">
          <div className="flex justify-center items-start p-4">
            <XCircle className="w-20 h-20 text-red-500" />
          </div>
          <div className="p-10 flex flex-col gap-8 justify-center items-center">
            <h1 className="text-gray-700 text-3xl font-semibold uppercase">
              Oh no, your payment failed!
            </h1>
            <Button className="h-12 px-12" onClick={goBack}>
              Back to Home
            </Button>
          </div>
          <div className="h-10"></div>
        </div>
      </div>
    </section>
  );
}

export default OrderFailed;
