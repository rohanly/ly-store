import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema({
  orderDate: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  customerName: { type: String },
  products: {
    type: [
      {
        _id: { type: Types.ObjectId, ref: "product" },
        quantity: { type: Number, required: true },
        name: { type: String, required: true },
        price: { type: String, required: true },
      },
    ],
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "PENDING",
    enum: ["SUCCESS", "FAILED", "PENDING"],
  },
});

export default model("order", orderSchema);
