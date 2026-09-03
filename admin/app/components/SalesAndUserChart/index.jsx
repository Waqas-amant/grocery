"use client";

import { Button, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchDatafromApi } from "../../utils/api";
import { IoReload } from "react-icons/io5";

const defaultMonths = [
  { name: "JAN", sales: 0, users: 0 },
  { name: "FEB", sales: 0, users: 0 },
  { name: "MAR", sales: 0, users: 0 },
  { name: "APR", sales: 0, users: 0 },
  { name: "MAY", sales: 0, users: 0 },
  { name: "JUN", sales: 0, users: 0 },
  { name: "JUL", sales: 0, users: 0 },
  { name: "AUG", sales: 0, users: 0 },
  { name: "SEP", sales: 0, users: 0 },
  { name: "OCT", sales: 0, users: 0 },
  { name: "NOV", sales: 0, users: 0 },
  { name: "DEC", sales: 0, users: 0 },
];

const SalesAndUserChart = ({
  salesDataProps,
  userDataProps,
  isLoadingProps,
  isErrorProps,
  onRetry,
}) => {
  const [isActiveChart, setIsActiveChart] = useState(0);
  const [salesData, setSalesData] = useState(salesDataProps || defaultMonths);
  const [userData, setUserData] = useState(userDataProps || defaultMonths);
  const [loading, setLoading] = useState(
    isLoadingProps !== undefined ? isLoadingProps : true
  );
  const [error, setError] = useState(isErrorProps || null);

  const fetchChartData = () => {
    setLoading(true);
    setError(null);
    fetchDatafromApi("/api/admin/dashboard/stats")
      .then((res) => {
        if (res && res.error === false && res.success !== false) {
          if (res.salesData && Array.isArray(res.salesData)) {
            setSalesData(res.salesData);
          }
          if (res.userData && Array.isArray(res.userData)) {
            setUserData(res.userData);
          }
        } else {
          setError(res?.message || "Failed to load chart statistics.");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch chart statistics:", err);
        setError("Network error while loading chart data.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (salesDataProps) {
      setSalesData(salesDataProps);
    }
    if (userDataProps) {
      setUserData(userDataProps);
    }
    if (isLoadingProps !== undefined) {
      setLoading(isLoadingProps);
    }
    if (isErrorProps !== undefined) {
      setError(isErrorProps);
    }
    if (!salesDataProps && !userDataProps && isLoadingProps === undefined) {
      fetchChartData();
    }
  }, [salesDataProps, userDataProps, isLoadingProps, isErrorProps]);

  return (
    <div className="bg-white p-5 rounded-md shadow-md mt-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] text-gray-700 font-[600] mb-5">
          Total Users & Total Sales
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="text"
            className={`capitalize! font-bold! ${
              isActiveChart === 0 ? "text-emerald-600!" : "text-gray-500!"
            }`}
            onClick={() => setIsActiveChart(0)}
          >
            Total Sales
          </Button>
          <Button
            variant="text"
            className={`capitalize! font-bold! ${
              isActiveChart === 1 ? "text-emerald-600!" : "text-gray-500!"
            }`}
            onClick={() => setIsActiveChart(1)}
          >
            Total Users
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="w-full h-[350px] flex flex-col items-center justify-center gap-3">
          <CircularProgress color="success" />
          <span className="text-gray-500 text-sm font-medium">
            Loading chart data...
          </span>
        </div>
      ) : error ? (
        <div className="w-full h-[350px] flex flex-col items-center justify-center gap-3 bg-red-50 rounded-md p-4 border border-red-100">
          <p className="text-red-600 text-sm font-medium">{error}</p>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<IoReload />}
            onClick={onRetry || fetchChartData}
          >
            Retry
          </Button>
        </div>
      ) : (
        <>
          {isActiveChart === 0 && (
            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#555", fontWeight: 500 }}
                  />
                  <YAxis
                    width={"auto"}
                    tick={{ fontSize: 12, fill: "#555", fontWeight: 500 }}
                  />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Sales"]}
                  />

                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#028290"
                    fill="#5ff4d6"
                    fillOpacity={0.25}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {isActiveChart === 1 && (
            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={userData}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#555", fontWeight: 500 }}
                  />
                  <YAxis
                    width={"auto"}
                    tick={{ fontSize: 12, fill: "#555", fontWeight: 500 }}
                  />
                  <Tooltip
                    formatter={(value) => [value, "Users"]}
                  />

                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#0263b2"
                    fill="#37a1f7"
                    fillOpacity={0.25}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SalesAndUserChart;
