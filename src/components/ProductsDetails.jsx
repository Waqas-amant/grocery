"use client";
import React, { useState } from "react";
import ProductZoom from "./ProductZoom";
import Rating from "@mui/material/Rating";
import QtyBox from "./QtyBox";
import { Button } from "@mui/material";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";

const ProductDetailsComponent = () => {
  const [isActiveTab, setIsActiveTab] = useState(0);
  const [value, setValue] = useState(2);
  return (
    <>
      <div className="flex gap-10 items-center">
        <ProductZoom />
        <div className="content">
          <h1 className="text[30px] font-bold text-gray-800 my-4 ">
            Lay's American Style Cream & Onion Potato Chips 82 g
          </h1>
          <div className="flex items-center gap-4 my-4 ">
            <p className="text-[18px] text-gray-500 font-normal flex items-center gap-3">
              Brand <span className="font-medium">Lay's</span>
            </p>
            <Rating name="read-only" value={4} readOnly />
            <span className="text-[18px] font-[400] cursor-pointer text-emerald-600 hover:text-secondary">
              Review(0)
            </span>
          </div>
          <div className="flex items-center gap-5 my-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-red-600 text-[25px] font-bold">$25.99</span>
              <span className="text-gray-300 text-[25px] font-bold line-through">
                $38.10
              </span>
            </div>
            <p className="text-[18px] text-gray-600 flex items-center gap-4 my-3">
              Available In Stock
              <span className="text-emerald-600 font-bold">74,769 Items</span>
            </p>
          </div>
          <p className="text-[16px] font-light text-gray-600 leading-8 pr-40">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make va type specimen book. Lorem Ipsum is
            simply dummy text of the printing and typesetting industry.<br></br>{" "}
            <br></br> Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </p>
          <div className="flex items-center gap-5">
            <QtyBox />

            <Button className="btn-g px-8! h-11.25! gap-1">
              <IoCartOutline size={25} /> Add To Cart
            </Button>
            <Tooltip title="Add To Wishlist" placement="top">
              <Button className="w-11.25! min-w-11.25! h-11.25! rounded-full! border border-[rgba(0,0,0,0.1)] text-gray-700 hover:bg-gray-200">
                <FaRegHeart size={20} className="text-gray-600" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 mt-8 mb-5">
        <span
          className={`text-[18px] font-medium cursor-pointer pb-1 border-b-2 ${
            isActiveTab === 0
              ? "border-emerald-600 text-emerald-600"
              : "text-gray-800 border-transparent"
          }`}
          onClick={() => setIsActiveTab(0)}
        >
          Description
        </span>

        <span
          className={`text-[18px] font-medium cursor-pointer pb-1 border-b-2 ${
            isActiveTab === 1
              ? "border-emerald-600 text-emerald-600"
              : "text-gray-800 border-transparent"
          }`}
          onClick={() => setIsActiveTab(1)}
        >
          Reviews
        </span>
      </div>
      {isActiveTab === 0 && (
        <p className="text-[16px] font-light text-gray-600 leading-8 pr-40 w-[80%]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make va type specimen book. <br />
          <br />
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book
        </p>
      )}

      {isActiveTab === 1 && (
        <div className="reviewSection w-[70%]">
          <h2 className="text-[18px] text-gray-700 font-medium mb-8 ">
            Customer Question and answer
          </h2>
          <div className="scroll max-h-[300px] overflow-y-scroll flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="imageWrapper">
                <div className="flex items-center justify-center w-[60px] h-[60px] rounded-full overflow-hidden">
                  <img
                    src={"/profile1.jpg"}
                    alt="profile image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="info flex flex-col gap-1 pr-10 w-[70%]">
                <h3 className="text-[15px] text-gray-700 font-medium">
                  MD MERAJ
                </h3>
                <span className="text-[14px] text-gray-700 font-normal">
                  2026-6-04
                </span>
                <p className="text-[15px] font-light text-gray-600 leading-7 pr-40 w-[80%]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make va type
                  specimen book. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.
                </p>
              </div>
              <div className="w-[30%] flex justify-end">
                <Rating name="read-only" value={4} readOnly size="small" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="imageWrapper">
                <div className="flex items-center justify-center w-[60px] h-[60px] rounded-full overflow-hidden">
                  <img
                    src={"/profile1.jpg"}
                    alt="profile image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="info flex flex-col gap-1 pr-10 w-[70%]">
                <h3 className="text-[15px] text-gray-700 font-medium">
                  MD MERAJ
                </h3>
                <span className="text-[14px] text-gray-700 font-normal">
                  2026-6-04
                </span>
                <p className="text-[15px] font-light text-gray-600 leading-7 pr-40 w-[80%]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make va type
                  specimen book. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.
                </p>
              </div>
              <div className="w-[30%] flex justify-end">
                <Rating name="read-only" value={4} readOnly size="small" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="imageWrapper">
                <div className="flex items-center justify-center w-[60px] h-[60px] rounded-full overflow-hidden">
                  <img
                    src={"/profile.png"}
                    alt="profile image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="info flex flex-col gap-1 pr-10 w-[70%]">
                <h3 className="text-[15px] text-gray-700 font-medium">
                  MD MERAJ
                </h3>
                <span className="text-[14px] text-gray-700 font-normal">
                  2026-6-04
                </span>
                <p className="text-[15px] font-light text-gray-600 leading-7 pr-40 w-[80%]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make va type
                  specimen book. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.
                </p>
              </div>
              <div className="w-[30%] flex justify-end">
                <Rating name="read-only" value={4} readOnly size="small" />
              </div>
            </div>
          </div>
          <div className="reviewForm w-[70%] mt-8">
            <h2 className="text-[18px] text-gray-700 font-medium mb-3 ">
              Add A Review
            </h2>
            <form className="flex flex-col gap-5">
              <TextField
                id="reviewInput"
                label="write a review"
                variant="outlined"
                multiline
                rows={5}
                className="w-full"
              />
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <div className="btnWrapper">
                <Button className="btn-g px-5! py-2!">Submit Review</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsComponent;
