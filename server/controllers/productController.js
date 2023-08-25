import ProductModel from "../schemas/productSchema.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return next(createError.InternalServerError(error));
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return next(createError.InternalServerError(error));
  }
};

export const deleteProductById = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await ProductModel.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return next(createError.InternalServerError(error));
  }
};

export const updateProductById = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updateProduct = {
      ...product,
      ...req.body,
    };

    console.log("⚡⚡⚡", req.body);
    await ProductModel.findByIdAndUpdate(req.params.id, updateProduct, {
      new: true,
    });
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    return next(createError.InternalServerError(error));
  }
};
