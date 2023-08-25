import express from "express";
import {
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);

// Set a new router for the updateProductById controller
const updateRouter = express.Router();
updateRouter.post("/:id", updateProductById);

// Add the updateRouter to the main router
router.use("/update", updateRouter);

export default router;
