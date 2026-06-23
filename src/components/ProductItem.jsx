import Link from "next/link";
import React from "react";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
const ProductItem = () => {
  return (
    <div className="productItem shadow-md bg-white rounded-md w-full">
      <Link href={"/product"} className="img overflow-hidden group flex p-3">
        <img
          src={"/pro1.png"}
          alt="product image"
          className="transition group-hover:scale-105"
        />
      </Link>
      <div className="info p-3 flex flex-col gap-1">
        <span className="text-[14px] text-gray-700">Bingo</span>
        <Link
          href={"/product"}
          className="text-[15px] text-gray-800 font-[500] hover:text-emerald-600"
        >
          100 Percent Apple Juice – 64 fl oz Bottle
        </Link>
        <Rating name="read-only" value={4} size="small" readOnly />
        <div className="flex items-center justify-between">
          <span className="text-red-600 text-[18px] font-[600]">$25.99</span>
          <span className="text-gray-300 text-[18px] font-[600] line-through">
            $38.10
          </span>
        </div>
        <Button className="btn-border-g">Add To Cart</Button>
      </div>
    </div>
  );
};

export default ProductItem;
