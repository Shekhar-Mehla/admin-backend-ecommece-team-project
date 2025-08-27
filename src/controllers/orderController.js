import Order from "../models/Order/orderSchema.js";
import User from "../models//User/userSchema.js";
import Product from "../models/Product/productSchema.js";
import responseClient from "../utility/responseClient.js";

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

export const getDashboardData = async (req, res) => {
  try {
    // Sales Data by Month
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          sales: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          month: {
            $arrayElemAt: [
              [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              { $subtract: ["$_id", 1] },
            ],
          },
          sales: 1,
          orders: 1,
        },
      },
    ]);

    // Guest vs Signed-in User Data
    const userTypeData = await Order.aggregate([
      {
        $group: {
          _id: "$isGuest",
          value: { $sum: 1 }, // count how many orders
        },
      },
      {
        $project: {
          name: {
            $cond: [
              { $eq: ["$_id", true] }, // if isGuest is true
              "Guest User", // label
              "Signed-in User", // else label
            ],
          },
          value: 1,
          _id: 0,
        },
      },
    ]);

    // Order Status Data
    const statusData = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          value: { $sum: 1 },
        },
      },
      {
        $project: {
          name: "$_id",
          value: 1,
          _id: 0,
        },
      },
    ]);

    // Total Revenue
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    //total  orders
    const totalOrders = await Order.countDocuments();

    // total active user
    const activeUserCount = await User.countDocuments({
      status: "active",
      role: "user",
    });

    //total products
    const totalProducts = await Product.countDocuments();

    responseClient({
      res,
      payload: {
        salesData,
        userTypeData,
        statusData,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalOrders,
        activeUserCount,
        totalProducts,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};

export const getTopProducts = async (req, res, next) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: "$items" }, // break each product line into its own doc
      {
        $group: {
          _id: "$items.productId",
          sold: { $sum: "$items.quantity" },
          revenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } },
        },
      },
      {
        $lookup: {
          from: "products", // MongoDB collection name
          localField: "_id",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $project: {
          _id: 1,
          sold: 1,
          revenue: 1,
          title: "$productInfo.title",
        },
      },
      { $sort: { sold: -1 } }, // most sold first
      { $limit: 6 }, // top 6
    ]);

    responseClient({
      res,
      payload: topProducts,
    });
  } catch (error) {
    next(error);
  }
};
