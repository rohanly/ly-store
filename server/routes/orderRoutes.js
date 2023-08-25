import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addOrder,
  completeOrder,
  deleteOrder,
  editOrder,
  getAllOrders,
  getOrderById,
  makePayment,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", isAuthenticated, getAllOrders);
router.get("/:id", isAuthenticated, getOrderById);
router.post("/", isAuthenticated, addOrder);
router.put("/", isAuthenticated, editOrder);

router.post("/completeOrder", completeOrder);
router.post("/makePayment", makePayment);
router.delete("/", isAuthenticated, deleteOrder);

export default router;
