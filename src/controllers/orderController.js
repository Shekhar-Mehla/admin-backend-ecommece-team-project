import Order from "../models/Order/orderSchema.js";

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
      .populate("items.productId", "title thumbnail")
      .populate("buyer", "fName lName email phone")
      .sort({ createdAt: -1 })
      .lean();

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured while fetching order history",
    });
  }
};
