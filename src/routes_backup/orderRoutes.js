import express from "express";
import {
  getDashboardData,
  getTopProducts,
  orderStatusController,
} from "../controllers/orderController.js";
import { fetchAllOrdersAdmin } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
//this is for creating the order
router.patch("/status/:id", authMiddleware, orderStatusController);
router.get("/history", authMiddleware, fetchAllOrdersAdmin);
router.get("/dashboard", authMiddleware, getDashboardData);
router.get("/top-products", authMiddleware, getTopProducts);

export default router;
