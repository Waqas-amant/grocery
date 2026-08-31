"use client";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { LiaAngleDownSolid } from "react-icons/lia";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "react-collapse";
import { TfiAngleUp } from "react-icons/tfi";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { IoIosStar } from "react-icons/io";

const categories = [
  "All",
  "Fruits",
  "Meat",
  "Breakfast",
  "Beverages",
  "Frozen",
  "Biscuits",
  "Grocery",
];

const Sidebar = ({ onCategoryChange, onPriceChange }) => {
  const [isOpenCatOpen, setIsOpenCatOpen] = useState(true);
  const [isOpenRatingFilter, setIsOpenRatingFilter] = useState(true);
  const [price, setPrice] = useState([0, 30000]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
    onPriceChange?.(value);
  };

  return (
    <aside className="sticky top-37.5 flex flex-col gap-5">
      <div className="box">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[16px] font-semibold text-gray-700">
            Shop by Category
          </h3>
          <Button
            onClick={() => setIsOpenCatOpen(!isOpenCatOpen)}
            className="min-w-8.75! w-8.75! h-8.75! rounded-full! text-gray-800! hover:bg-gray-200!"
          >
            {isOpenCatOpen ? (
              <TfiAngleUp size={20} className="text-gray-800!" />
            ) : (
              <LiaAngleDownSolid size={20} className="text-gray-800!" />
            )}
          </Button>
        </div>
        <Collapse isOpened={isOpenCatOpen}>
          <div className="scroll overflow-scroll max-h-[250px]">
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryChange(category)}
                    />
                  }
                  label={category}
                />
              ))}
            </FormGroup>
          </div>
        </Collapse>
      </div>

      <div className="box">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-semibold text-gray-700">
            Filter by Price
          </h3>
        </div>
        <RangeSlider
          className="range-slider"
          value={price}
          onInput={handlePriceChange}
          min={0}
          max={30000}
          step={5}
        />
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-700 text-[14px]">${price[0]}</span>
          <span className="text-gray-700 text-[14px]">${price[1]}</span>
        </div>
      </div>

      <div className="box">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[16px] font-semibold text-gray-700">
            Filter by Rating
          </h3>
          <Button
            onClick={() => setIsOpenRatingFilter(!isOpenRatingFilter)}
            className="min-w-8.75! w-8.75! h-8.75! rounded-full! text-gray-800! hover:bg-gray-200!"
          >
            {isOpenRatingFilter ? (
              <TfiAngleUp size={20} className="text-gray-800!" />
            ) : (
              <LiaAngleDownSolid size={20} className="text-gray-800!" />
            )}
          </Button>
        </div>
        <Collapse isOpened={isOpenRatingFilter}>
          <div className="scroll overflow-scroll max-h-[250px] ratingFilter">
            <div className="flex flex-col gap-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div
                  key={rating}
                  className="item flex items-center w-full gap-2"
                >
                  <Checkbox />
                  <div className="flex gap-1">
                    {Array.from({ length: rating }).map((_, index) => (
                      <IoIosStar
                        key={`${rating}-${index}`}
                        size={20}
                        className="text-[#ffc107]"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Collapse>
      </div>
    </aside>
  );
};

export default Sidebar;
