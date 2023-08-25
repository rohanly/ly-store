import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import multer, { diskStorage } from "multer";
import { extname } from "path";
import {
  addProduct,
  deleteProduct,
  editProduct,
} from "../controllers/adminController.js";

const router = express.Router();

let storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/productImage/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  "/addProduct",
  isAuthenticated,
  isAdmin,
  upload.single("productImage"),
  addProduct
);

router.put(
  "/editProduct/:id",
  isAuthenticated,
  isAdmin,
  upload.single("productImage"),
  editProduct
);

router.delete("/deleteProduct", isAuthenticated, isAdmin, deleteProduct);

export default router;
