"use client";

import React, { useState, useEffect } from "react";
import Box from "./Box";
import { TbUsers } from "react-icons/tb";
import { GoGift } from "react-icons/go";
import { LiaProductHunt } from "react-icons/lia";
import { MdOutlineCategory } from "react-icons/md";
import { fetchDatafromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { IoReload } from "react-icons/io5";

const DashboardBoxes = ({ statsData, isLoading, isError, onRetry }) => {
  const [stats, setStats] = useState(
    statsData || {
      totalUsers: 0,
      totalOrders: 0,
      totalProducts: 0,
      totalCategories: 0,
    }
  );
  const [loading, setLoading] = useState(isLoading !== undefined ? isLoading : true);
  const [error, setError] = useState(isError || null);

  const fetchStats = () => {
    setLoading(true);
    setError(null);
    fetchDatafromApi("/api/admin/dashboard/stats")
      .then((res) => {
        if (res && res.error === false && res.success !== false) {
          setStats({
            totalUsers: res.totalUsers ?? 0,
            totalOrders: res.totalOrders ?? 0,
            totalProducts: res.totalProducts ?? 0,
            totalCategories: res.totalCategories ?? 0,
          });
        } else {
          setError(res?.message || "Failed to load dashboard statistics.");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard stats:", err);
        setError("Network error while loading dashboard statistics.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (statsData) {
      setStats(statsData);
    }
    if (isLoading !== undefined) {
      setLoading(isLoading);
    }
    if (isError !== undefined) {
      setError(isError);
    }
    if (!statsData && isLoading === undefined) {
      fetchStats();
    }
  }, [statsData, isLoading, isError]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center justify-between my-2">
        <p className="text-red-600 text-sm font-medium">{error}</p>
        <Button
          size="small"
          variant="outlined"
          color="error"
          startIcon={<IoReload />}
          onClick={onRetry || fetchStats}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      <Box
        title="Total Users"
        count={loading ? <CircularProgress size={18} style={{ color: "white" }} /> : (stats.totalUsers ?? 0)}
        icon={<TbUsers size={40} className="text-white ml-auto" />}
        bg="#10b981"
        link="/users"
      />
      <Box
        title="Total Orders"
        count={loading ? <CircularProgress size={18} style={{ color: "white" }} /> : (stats.totalOrders ?? 0)}
        icon={<GoGift size={40} className="text-white ml-auto" />}
        bg="#3872fa"
        link="/orders"
      />
      <Box
        title="Total Products"
        count={loading ? <CircularProgress size={18} style={{ color: "white" }} /> : (stats.totalProducts ?? 0)}
        icon={<LiaProductHunt size={40} className="text-white ml-auto" />}
        bg="#4f49e4"
        link="/products-list"
      />
      <Box
        title="Total Categories"
        count={loading ? <CircularProgress size={18} style={{ color: "white" }} /> : (stats.totalCategories ?? 0)}
        icon={<MdOutlineCategory size={40} className="text-white ml-auto" />}
        bg="#f22c61"
        link="/categroy-list"
      />
    </div>
  );
};

export default DashboardBoxes;
