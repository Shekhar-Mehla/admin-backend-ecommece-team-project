import nodeMailer from "../config/nodeMailer.js";
import Order from "../models/Order/orderSchema.js";
import nodemailer from "nodemailer";

//changing order status
export const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { orderStatus, paymentStatus } = req.body;
    //validation
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Please orderId is required",
      });
    }
    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData["payment.status"] = paymentStatus;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });
    //validation for order
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order status is updated successfuly",
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured while changing order status",
    });
  }
};

//this is for fetching all the order history for admin
export const fetchAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "items.productId",
        select: "title thumbnail price",
        model: "Product",
      })
      .populate({
        path: "buyer",
        select: "name email phone",
        model: "User",
        options: { strictPopulate: false },
      })
      .sort({ createdAt: -1 })
      .lean();
    const ordersWithCustomerInfo = orders.map((order) => {
      let customerName = "Guest";
      let customerPhone = "";
      let customerEmail = "";
      if (order.buyer) {
        customerName = order.buyer.name;
        customerPhone = order.buyer.phone;
        customerEmail = order.buyer.email;
      } else if (order.isGuest && order.guestInfo) {
        customerName =
          `${order.guestInfo.firstName || ""} ${
            order.guestInfo.lastName || ""
          }`.trim() || "Guest";
        customerPhone = order.guestInfo.phoneNumber || "";
        customerEmail = order.guestInfo.email || "";
      }

      return {
        ...order,
        customerName,
        customerPhone,
        customerEmail,
      };
    });

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders: ordersWithCustomerInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured while fetching order history",
    });
  }
};

//This is for add or update the order note
export const addOrUpdateOrderNote = async (req, res) => {
  const { orderId } = req.params;
  const { note } = req.body;
  console.log(note, "Notes");
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.orderNotes = note;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order note updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//This is for updating the order
export const sendOrderNoteEmail = async (req, res) => {
  const { orderId } = req.params;
  const { note } = req.body;

  try {
    if (!note) {
      return res
        .status(400)
        .json({ success: false, message: "Note is required" });
    }

    // Find the order and buyer details
    const order = await Order.findById(orderId)
      .populate("items.productId", "title price thumbnail")
      .populate("buyer", "fName email");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    const userEmail = order.buyer?.email || order.guestInfo?.email;
    const userName = order.buyer?.fName || order.guestInfo?.fName;

    if (!userEmail) {
      return res
        .status(400)
        .json({ success: false, message: "User email not found" });
    }

    // Email Template

    const html = `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 10px; max-width: 700px; margin: auto; background: #ffffff; border: 1px solid #eee; border-radius: 8px;">
    <h2 style="color: #2c3e50; text-align: center;">🛍️ Order Update</h2>
    
    <p>Hi <strong>${userName || "Customer"}</strong>,</p>
    <p>We have an important update for your order   <strong>#${String(
      order._id
    ).slice(-6)}</strong> placed on 
      <em>${new Date(order.createdAt).toLocaleDateString()}</em>.
    </p>

    <h3 style="color: #2c3e50; margin-top: 10px;">📌 Note from our team:</h3>
    <div style="background: #f4f6f8; padding: 15px; border-left: 4px solid #2c3e50; font-style: italic; margin-bottom: 20px;">
      ${note}
    </div>

    <h3 style="color: #2c3e50;">🛒 Order Details</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <thead>
        <tr style="background: #2c3e50; color: #fff;">
          <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Product</th>
          <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Price</th>
          <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Qty</th>
        </tr>
      </thead>
      <tbody>
        ${order.items
          .map(
            (item) => `
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">
                <img src="${item.productId.thumbnail}" alt="${
              item.productId.title
            }" 
                     style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; vertical-align: middle; margin-right: 8px;">
                ${item.productId.title}
              </td>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">$${item.productId.price.toFixed(
                2
              )}</td>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${
                item.quantity
              }</td>
            </tr>
          `
          )
          .join("")}
      </tbody>
    </table>

    <p style="font-size: 16px; font-weight: bold; text-align: right; margin-top: 10px;">
      Total: $${order.totalAmount.toFixed(2)}
    </p>

    <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">

    <p style="font-size: 14px; color: #555;">
      Thank you for shopping with us! If you have any questions, simply reply to this email or call Mahesh and we’ll be happy to help.
    </p>

    <p style="margin-top: 20px; font-weight: bold; color: #2c3e50;">
      Best regards,<br>Group Project Team
    </p>
  </div>
`;

    const transport = nodeMailer();
    const info = await transport.sendMail({
      from: '"Group Project" <physmarika@gmail.com>',
      to: userEmail,
      subject: "Your Order updates",
      html,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
};
