import express from "express";
import { orderStatusController } from "../controllers/orderController.js";
import { fetchAllOrdersAdmin } from "../controllers/orderController.js";

const router = express.Router();
//this is for creating the order
router.patch("/status/:id", orderStatusController);
router.get("/history", fetchAllOrdersAdmin);

export default router;
