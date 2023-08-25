import mongoose, { model } from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  quantityInStock: { type: Number },
  category: { type: String },
});

const product = model("product", productSchema);

export default product;
