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
import Rating from "@mui/material/Rating";
import { IoIosStar } from "react-icons/io";

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };
const Sidebar = () => {
  const [isOpenCatOpen, setIsOpenCatOpen] = useState(true);
  const [isOpenRatingFilter, setIsOpenRatingFilter] = useState(true);
  const [price, setPrice] = useState([0, 30000]);
  return (
    <aside className="sticky top-37.5 flex flex-col gap-5">
      <div className="box">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[16px] font-semibold text-gray-700">
            Shop by Categroy
          </h3>
          <Button
            onClick={() => setIsOpenCatOpen(!isOpenCatOpen)}
            className="min-w-8.75! w-8.75! h-8.75! rounded-full! text-gray-800! hover:bg-gray-200! "
          >
            {isOpenCatOpen === true ? (
              <TfiAngleUp size={20} className="text-gray-800!" />
            ) : (
              <LiaAngleDownSolid size={20} className="text-gray-800!" />
            )}
          </Button>
        </div>
        <Collapse isOpened={isOpenCatOpen}>
          <div className="scroll overflow-scroll max-h-[250px]">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Fruits & Vegetables"
              />
              <FormControlLabel control={<Checkbox />} label="Meat & Seafood" />

              <FormControlLabel
                control={<Checkbox />}
                label="Breakfast & Dairy"
              />

              <FormControlLabel control={<Checkbox />} label="Bread & Bakery" />

              <FormControlLabel control={<Checkbox />} label="Beverages" />

              <FormControlLabel control={<Checkbox />} label="Frozen Foods" />

              <FormControlLabel
                control={<Checkbox />}
                label="Biscuits & Snacks"
              />

              <FormControlLabel
                control={<Checkbox />}
                label="Grocery & Staples"
              />
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

        {/* ✅ Add className here */}
        <RangeSlider
          className="range-slider"
          value={price}
          onInput={setPrice}
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
            className="min-w-8.75! w-8.75! h-8.75! rounded-full! text-gray-800! hover:bg-gray-200! "
          >
            {isOpenRatingFilter === true ? (
              <TfiAngleUp size={20} className="text-gray-800!" />
            ) : (
              <LiaAngleDownSolid size={20} className="text-gray-800!" />
            )}
          </Button>
        </div>
        <Collapse isOpened={isOpenRatingFilter}>
          <div className="scroll overflow-scroll max-h-[250px] ratingFilter">
            <div className="flex flex-col gap-2">
              <div className="item flex items-center w-full gap-2">
                <Checkbox {...label} />
                <div className="flex gap-1">
                  <IoIosStar size={20} className="text-[#ffc107]" />
                  <IoIosStar size={20} className="text-[#ffc107]" />
                  <IoIosStar size={20} className="text-[#ffc107]" />
                  <IoIosStar size={20} className="text-[#ffc107]" />
                  <IoIosStar size={20} className="text-[#ffc107]" />
                </div>
              </div>

              <div className="item flex items-center w-full gap-2">
                <Checkbox {...label} />
                <div className="flex gap-1">
                  <IoIosStar size={20} className="text-[#ffc107]" />
                  <IoIosStar size={20} className="text-[#ffc107]" />
                  <IoIosStar size={20} className="text-[#ffc107]" />
                  <IoIosStar size={20} className="text-[#ffc107]" />
                </div>
              </div>

              <div className="item flex items-center w-full gap-2">
                <Checkbox {...label} />
                <div className="flex gap-1">
                  <IoIosStar size={20} className="text-[#ffc107]" />
                  <IoIosStar size={20} className="text-[#ffc107]" />
                  <IoIosStar size={20} className="text-[#ffc107]" />
                </div>
              </div>

              <div className="item flex items-center w-full gap-2">
                <Checkbox {...label} />
                <div className="flex gap-1">
                  <IoIosStar size={20} className="text-[#ffc107]" />
                  <IoIosStar size={20} className="text-[#ffc107]" />
                </div>
              </div>

              <div className="item flex items-center w-full gap-2">
                <Checkbox {...label} />
                <div className="flex gap-1">
                  <IoIosStar size={20} className="text-[#ffc107]" />
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </aside>
  );
};

export default Sidebar;
