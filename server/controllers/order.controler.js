import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import AddressModel from "../models/address.model.js";

// Get all orders (with pagination and search)
export async function getAllOrders(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;

    const totalOrders = await OrderModel.countDocuments();
    const orders = await OrderModel.find()
      .populate("userId", "name email mobile avatar")
      .populate("delivery_address")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return response.status(200).json({
      error: false,
      success: true,
      orders: orders,
      total: totalOrders,
      page: page,
      totalPages: Math.ceil(totalOrders / limit),
    });
  } catch (error) {
    console.log("GET ALL ORDERS ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

// Update order status
export async function updateOrderStatus(request, response) {
  try {
    const { id } = request.params;
    const { orderStatus } = request.body;

    const order = await OrderModel.findByIdAndUpdate(
      id,
      { order_status: orderStatus },
      { new: true }
    );

    if (!order) {
      return response.status(404).json({
        message: "Order not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Order status updated successfully",
      error: false,
      success: true,
      order: order,
    });
  } catch (error) {
    console.log("UPDATE ORDER STATUS ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

// Delete order
export async function deleteOrder(request, response) {
  try {
    const { id } = request.params;
    const order = await OrderModel.findByIdAndDelete(id);

    if (!order) {
      return response.status(404).json({
        message: "Order not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Order deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log("DELETE ORDER ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

// Get user orders (user dashboard)
export async function getUserOrders(request, response) {
  try {
    const orders = await OrderModel.find({ userId: request.userId })
      .populate("userId", "name email mobile avatar")
      .populate("delivery_address")
      .sort({ createdAt: -1 });

    return response.status(200).json({
      error: false,
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.log("GET USER ORDERS ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}


