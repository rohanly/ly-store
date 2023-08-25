import UserModel from "../schemas/userSchema.js";
import ProductModel from "../schemas/productSchema.js";

export const getAllUsersAdmin = async (req, res, next) => {
  try {
    const users = await UserModel.find();

    res.status(200).json(users);
  } catch (error) {
    return next(createError.InternalServerError(error));
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    res.status(200).json({ user });
  } catch (error) {
    return next(createError.InternalServerError(error));
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const image = req.file;
    console.log(image);
    let productCreated = {};
    if (image) {
      const filePath = `/${image.destination}/${image.filename}`;

      productCreated = await ProductModel.create({
        ...product,
        image: filePath,
      });
    } else {
      productCreated = await ProductModel.create(product);
    }
    res.json(productCreated);
  } catch (error) {
    console.error(error);
  }
};

export const editProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, price, image, quantityInStock, category } = req.body;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with id ${id} not found`,
      });
    }

    const updatedProduct = {
      name,
      price,
      image,
      quantityInStock,
      category,
    };

    if (image) {
      updatedProduct.image = `/${image.destination}/${image.filename}`;
    }

    const result = await ProductModel.updateOne(
      { _id: product._id },
      { $set: updatedProduct }
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with id ${id} not found`,
      });
    }

    await product.remove();
    res.json({
      success: true,
      message: `Product with id ${id} deleted successfully`,
    });
  } catch (error) {
    console.error(error);
  }
};
