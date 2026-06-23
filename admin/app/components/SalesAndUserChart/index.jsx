"use client";

import { Button } from "@mui/material";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesdata = [
  { name: "FEB", sales: 456 },
  { name: "JAN", sales: 123 },
  { name: "MAR", sales: 1234 },
  { name: "APR", sales: 3455 },
  { name: "MAY", sales: 2345 },
  { name: "JUN", sales: 6781 },
  { name: "JUL", sales: 1222 },
  { name: "AUG", sales: 1333 },
  { name: "SEP", sales: 1200 },
  { name: "OCT", sales: 1453 },
  { name: "NOV", sales: 1234 },
  { name: "DEC", sales: 1254 },
];
const userData = [
  { name: "JAN", users: 567 },
  { name: "FEB", users: 432 },
  { name: "MAR", users: 123 },
  { name: "APR", users: 675 },
  { name: "MAY", users: 786 },
  { name: "JUN", users: 876 },
  { name: "JUL", users: 435 },
  { name: "AUG", users: 443 },
  { name: "SEP", users: 234 },
  { name: "OCT", users: 677 },
  { name: "NOV", users: 765 },
  { name: "DEC", users: 556 },
];

const SalesAndUserChart = () => {
  const [isActiveChart, setIsActiveChart] = useState(0);
  return (
    <div className="bg-white p-5 rounded-md shadow-md mt-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] text-gray-700 font-[600] mb-5">
          Total Users & Total Sales
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="text"
            className="text-emerald-600! capitalize! font-bold!"
            onClick={() => setIsActiveChart(0)}
          >
            Total Sales
          </Button>
          <Button
            variant="text"
            className="text-emerald-600! capitalize! font-bold!"
            onClick={() => setIsActiveChart(1)}
          >
            Total Users
          </Button>
        </div>
      </div>
      {isActiveChart === 0 && (
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={salesdata}
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
              <Tooltip />

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
              <Tooltip />

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
    </div>
  );
};

export default SalesAndUserChart;
