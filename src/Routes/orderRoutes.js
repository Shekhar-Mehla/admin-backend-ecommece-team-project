import express from "express";
import {
  addOrUpdateOrderNote,
  orderStatusController,
  sendOrderNoteEmail,
} from "../controllers/orderController.js";
import { fetchAllOrdersAdmin } from "../controllers/orderController.js";

const router = express.Router();
//this is for creating the order
router.patch("/status/:id", orderStatusController);
router.get("/history", fetchAllOrdersAdmin);
router.patch("/orders/:orderId/note", addOrUpdateOrderNote);
router.post("/orders/:orderId/send-note-email", sendOrderNoteEmail);

export default router;
