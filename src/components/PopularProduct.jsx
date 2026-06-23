"use client";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductSlider from "./ProductSlider";
const PopularProduct = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section className="bg-white py-8">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="col1 w-[30%] ">
            <h2 className="text-[20px] text-gray-800 font-medium">
              Popular Products
            </h2>
            <p className="text-[14px]">Do not mis the current offer</p>
          </div>
          <div className="col2 w-[70%] flex items-center justify-end">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Fruits Vegetables" />
              <Tab label="Meat and SeaFood" />
              <Tab label="BreakFast & Dairy" />
              <Tab label="Berverages" />
              <Tab label="Buscuits & Snacks" />
              <Tab label="Frozen Food" />
              <Tab label="Grocery & Stables" />
              <Tab label="Baby & Pregrancy" />
              <Tab label="Healthcare" />
            </Tabs>
          </div>
        </div>
        <ProductSlider />
      </div>
    </section>
  );
};

export default PopularProduct;
