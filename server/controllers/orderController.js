import createHttpError from "http-errors";
import OrderModel from "../schemas/orderSchema.js";
import ProductModel from "../schemas/productSchema.js";
import CryptoJS from "crypto-js";
import { Buffer } from "buffer";

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find().populate("products");
    res.json(orders);
  } catch (error) {
    return next(createHttpError(error));
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.findById(id).populate("products");
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order with id ${id} not found`,
      });
    }

    res.json(order);
  } catch (error) {
    return next(createHttpError(error));
  }
};

export const addOrder = async (req, res, next) => {
  let order;
  try {
    order = req.body;

    order = {
      ...order,
      userId: req.user?.id,
    };

    // // Try to update the product models
    // for (const product of order.products) {
    //   const productModel = await ProductModel.findById(product._id);
    //   productModel.quantityInStock -= product.quantity;
    //   await productModel.save();
    // }

    // Create the order
    const orderCreated = await OrderModel.create(order);
    res.json(orderCreated);
  } catch (error) {
    // If any errors occur, then roll back the changes
    // for (const product of order?.products) {
    //   const productModel = await ProductModel.findById(product._id);
    //   productModel.quantityInStock += product.quantity;
    //   await productModel.save();
    // }

    return next(createHttpError(error));
  }
};

export const editOrder = async (req, res, next) => {
  try {
    const {
      id,
      orderDate,
      customerName,
      shippingAddress,
      paymentMethod,
      products,
    } = req.body;
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order with id ${id} not found`,
      });
    }

    order.update({
      orderDate,
      customerName,
      shippingAddress,
      paymentMethod,
      products,
    });

    await order.save();
    res.json(order);
  } catch (error) {
    console.error(error);
    return next(createHttpError(error));
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order with id ${id} not found`,
      });
    }

    await order.remove();
    res.json({
      success: true,
      message: `Order with id ${id} deleted successfully`,
    });
  } catch (error) {
    return next(createHttpError(error));
  }
};

export const completeOrder = async (req, res, next) => {
  try {
    const { code, transactionId } = req.body;

    if (code === "PAYMENT_SUCCESS") {
      const order = await OrderModel.findOneAndUpdate(
        { _id: transactionId },
        { $set: { paymentStatus: "success" } }
      );

      // Try to update the product models
      for (const product of order.products) {
        const productModel = await ProductModel.findById(product._id);
        productModel.quantityInStock -= product.quantity;
        await productModel.save();
      }

      res.redirect(`${process.env.REDIRECT_DOMAIN}/order/${transactionId}`);
    } else {
      const payment = await OrderModel.findOneAndUpdate(
        { _id: transactionId },
        { $set: { paymentStatus: "failed" } }
      );
      res.redirect(`${process.env.REDIRECT_DOMAIN}/order/failed`);
    }
  } catch (error) {
    return next(createError.InternalServerError(error));
  }
};

export const makePayment = async (req, res, next) => {
  try {
    const orderCreated = await OrderModel.create({ ...req.body });

    const paymentData = {
      merchantId: "MERCHANTUAT",
      merchantTransactionId: orderCreated._id.toString(),
      merchantUserId: "MUID123",
      amount: req.body.amount * 100,
      redirectUrl: `${process.env.REDIRECT_DOMAIN}/api/order/completeOrder`,
      redirectMode: "POST",
      callbackUrl: `${process.env.REDIRECT_DOMAIN}/api/order`,
      mobileNumber: 9999999999,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    let objJsonStr = JSON.stringify(paymentData);
    const base64Value = Buffer.from(objJsonStr).toString("base64");
    const inputString = `${base64Value}/pg/v1/pay099eb0cd-02cf-4e2a-8aca-3e6c6aff0399`;
    let checksum = CryptoJS.SHA256(inputString).toString();
    checksum = checksum + "###1";
    console.log("base64Value", base64Value);
    console.log("checksum", checksum);

    const options = {
      method: "POST",

      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      body: JSON.stringify({
        request: base64Value,
      }),
    };

    await fetch(
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        let payUrl = response.data.instrumentResponse.redirectInfo.url;
        res.status(200).json(payUrl);
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    return next(createHttpError(error));
  }
};
