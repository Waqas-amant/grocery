"use client";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductSlider from "./ProductSlider";

const categories = [
  "Fruits Vegetables",
  "Meat and SeaFood",
  "BreakFast & Dairy",
  "Beverages",
  "Biscuits & Snacks",
  "Frozen Food",
  "Grocery & Staples",
  "Baby & Pregnancy",
  "Healthcare",
];

const PopularProduct = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section className="bg-white py-8">
      <div className="container">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="col1 md:w-[30%]">
            <h2 className="text-[20px] text-gray-800 font-medium">
              Popular Products
            </h2>
            <p className="text-[14px] text-gray-500">
              Don’t miss the current offer
            </p>
          </div>
          <div className="col2 md:w-[70%] flex items-center justify-start md:justify-end">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="product categories"
            >
              {categories.map((category) => (
                <Tab key={category} label={category} />
              ))}
            </Tabs>
          </div>
        </div>
        <div className="mt-4">
          <ProductSlider />
        </div>
      </div>
    </section>
  );
};

export default PopularProduct;
