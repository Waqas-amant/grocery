import UserModel from "../models/user.model.js";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import categroyModel from "../models/categroy.model.js";

const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

// Helper to get sales aggregation for a given year
async function getMonthlySalesData(year) {
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year + 1, 0, 1);

  const salesAgg = await OrderModel.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfYear, $lt: endOfYear },
        order_status: { $nin: ["cancelled", "Cancelled", "CANCELLED"] },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalSales: { $sum: { $ifNull: ["$totalAmt", 0] } },
      },
    },
  ]);

  const salesMap = {};
  salesAgg.forEach((item) => {
    salesMap[item._id] = item.totalSales || 0;
  });

  return monthNames.map((month, index) => ({
    name: month,
    sales: salesMap[index + 1] || 0,
  }));
}

// Helper to get user registration aggregation for a given year
async function getMonthlyUsersData(year) {
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year + 1, 0, 1);

  const usersAgg = await UserModel.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfYear, $lt: endOfYear },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalUsers: { $sum: 1 },
      },
    },
  ]);

  const usersMap = {};
  usersAgg.forEach((item) => {
    usersMap[item._id] = item.totalUsers || 0;
  });

  return monthNames.map((month, index) => ({
    name: month,
    users: usersMap[index + 1] || 0,
  }));
}

// GET /api/admin/dashboard/stats
export async function getDashboardStats(request, response) {
  try {
    const currentYear = new Date().getFullYear();

    const [totalUsers, totalOrders, totalProducts, totalCategories, salesData, userData] =
      await Promise.all([
        UserModel.countDocuments(),
        OrderModel.countDocuments(),
        ProductModel.countDocuments(),
        categroyModel.countDocuments(),
        getMonthlySalesData(currentYear),
        getMonthlyUsersData(currentYear),
      ]);

    return response.status(200).json({
      error: false,
      success: true,
      totalUsers,
      totalOrders,
      totalProducts,
      totalCategories,
      salesData,
      userData,
    });
  } catch (error) {
    console.error("GET DASHBOARD STATS ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message || "Failed to fetch dashboard statistics",
    });
  }
}

// GET /api/admin/dashboard/sales
export async function getSalesStats(request, response) {
  try {
    const currentYear = new Date().getFullYear();
    const salesData = await getMonthlySalesData(currentYear);

    return response.status(200).json({
      error: false,
      success: true,
      salesData,
    });
  } catch (error) {
    console.error("GET SALES STATS ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message || "Failed to fetch sales statistics",
    });
  }
}

// GET /api/admin/dashboard/users
export async function getUserStats(request, response) {
  try {
    const currentYear = new Date().getFullYear();
    const userData = await getMonthlyUsersData(currentYear);

    return response.status(200).json({
      error: false,
      success: true,
      userData,
    });
  } catch (error) {
    console.error("GET USER STATS ERROR:", error);
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message || "Failed to fetch user registration statistics",
    });
  }
}
