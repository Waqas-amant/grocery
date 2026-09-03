"use client";

import React, { useState, useEffect } from "react";
import DashboardBoxes from "./components/DashboardBoxes/Index";
import ProductComponent from "./components/Products";
import UsersComponent from "./components/Users/Index";
import SalesAndUserChart from "./components/SalesAndUserChart";
import { fetchDatafromApi } from "./utils/api";

export default function Home() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = () => {
    setLoading(true);
    setError(null);
    fetchDatafromApi("/api/admin/dashboard/stats")
      .then((res) => {
        if (res && res.error === false && res.success !== false) {
          setDashboardData(res);
        } else {
          setError(res?.message || "Failed to load dashboard data.");
        }
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setError("Failed to connect to backend server.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-5">
      <DashboardBoxes
        statsData={
          dashboardData
            ? {
                totalUsers: dashboardData.totalUsers,
                totalOrders: dashboardData.totalOrders,
                totalProducts: dashboardData.totalProducts,
                totalCategories: dashboardData.totalCategories,
              }
            : null
        }
        isLoading={loading}
        isError={error}
        onRetry={fetchDashboardData}
      />

      <div className="py-2">
        <ProductComponent />
      </div>

      <UsersComponent />

      <SalesAndUserChart
        salesDataProps={dashboardData?.salesData}
        userDataProps={dashboardData?.userData}
        isLoadingProps={loading}
        isErrorProps={error}
        onRetry={fetchDashboardData}
      />
    </div>
  );
}
