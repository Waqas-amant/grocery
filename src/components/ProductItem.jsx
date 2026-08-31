"use client";
import Link from "next/link";
import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { MyContext } from "./context/ThemeContext";

const ProductItem = ({ product }) => {
  const context = useContext(MyContext);

  if (!product) return null;

  const image = product?.images?.[0] || "/pro1.png";
  const price = Number(product?.price || 0);
  const oldPrice = Number(product?.oldPrice || price);

  return (
    <div className="productItem shadow-md bg-white rounded-md w-full h-full flex flex-col">
      <Link
        href={`/product/${product?._id}`}
        className="img overflow-hidden group flex p-3"
      >
        <img
          src={image}
          alt={product?.name || "product image"}
          className="transition group-hover:scale-105 w-full h-[180px] object-cover"
        />
      </Link>
      <div className="info p-3 flex flex-col gap-1 flex-1">
        <span className="text-[14px] text-gray-700">
          {product?.brand || "Generic"}
        </span>
        <Link
          href={`/product/${product?._id}`}
          className="text-[15px] text-gray-800 font-[500] hover:text-emerald-600 line-clamp-2"
        >
          {product?.name}
        </Link>
        <Rating
          name="read-only"
          value={Number(product?.rating || 0)}
          size="small"
          readOnly
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-red-600 text-[18px] font-[600]">
            ${price.toFixed(2)}
          </span>
          {oldPrice > price && (
            <span className="text-gray-300 text-[18px] font-[600] line-through">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>
        <Button
          className="btn-border-g mt-auto"
          onClick={() => context?.addToCart?.(product, 1)}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
