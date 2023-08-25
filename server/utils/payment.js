const CryptoJS = require("crypto-js");
const { Buffer } = require("buffer");
​
const paymentData = {
  merchantId: "MERCHANTUAT",
  merchantTransactionId: payment._id.toString(),
  merchantUserId: merchantUserId,
  amount: amount,
  redirectUrl: "https://healthique.in/api/plans/updatePayment",
  redirectMode: "POST",
  callbackUrl: "https://healthique.in/api/plans/updatePayment",
  mobileNumber: mobileNumber,
  paymentInstrument: {
    type: "PAY_PAGE",
  },
};
​
let objJsonStr = JSON.stringify(paymentData);
​
const base64Value = Buffer.from(objJsonStr).toString("base64");
​
const inputString = `${base64Value}/pg/v1/pay099eb0cd-02cf-4e2a-8aca-3e6c6aff0399`;
​
let checksum = CryptoJS.SHA256(inputString).toString();
​
checksum = checksum + "###1";
​
console.log("base64Value", base64Value);
console.log("checksum", checksum);
​
const options = {
  method: "POST",
​
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    "X-VERIFY": checksum,
  },
  body: JSON.stringify({
    request: base64Value,
  }),
};
​
await fetch("https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay", options)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    let payUrl = response.data.instrumentResponse.redirectInfo.url;
    res.status(200).json(payUrl);
  })
  .catch((err) => {
    console.error(err);
  });