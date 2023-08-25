import axios from "axios";
import React, { useEffect, useState } from "react";


export default function Payment () {

  const [qrCode, setQrCode]  = useState("");

    const makePayment = async ()  =>{
      const order = {
        "customerName": "xyz",
        "amount": 100 * 100,
        "quantity": 5,
        "products": [
             {
                "_id": "64d9d975791ae841c4703b09",
                "name": "Classic salted",
                "price": 10,
                "quantity": 5
            }
        ]
    }
         axios.post("/api/order/makePayment", order).then((res) => {
          setQrCode(res.data.data.instrumentResponse.qrData);
         })

    }

    useEffect(() => {
        makePayment();
    }, [])
  return (

    <div>Payment

      <img width={200} src={`data:image/png;base64,${qrCode}`} alt="qr-code"/>
    </div>
  )
}
