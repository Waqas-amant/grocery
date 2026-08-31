"use client";
import { Button } from "@mui/material";
import React from "react";
import { LiaAngleDownSolid } from "react-icons/lia";
import { TfiAngleUp } from "react-icons/tfi";

const QtyBox = ({ quantity = 1, setQuantity }) => {
  const minusQty = () => {
    if (quantity <= 1) {
      setQuantity?.(1);
    } else {
      setQuantity?.(quantity - 1);
    }
  };

  return (
    <div className="QtyBox border border-[rgba(0,0,0,0.1)] rounded-md flex items-center gap-1 w-[80px] h-[45px] relative">
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity?.(Number(e.target.value) || 1)}
        className="border-0 outline-none w-full h-full px-2 text-[14px] text-gray-800"
      />
      <div className="flex flex-col absolute top-0 right-0 h-full">
        <Button
          className="w-7.5! min-w-7.5! h-5.5! text-gray-800!"
          onClick={() => setQuantity?.(quantity + 1)}
        >
          <TfiAngleUp size={25} />
        </Button>
        <Button
          className="w-7.5! min-w-7.5! h-5.5! text-gray-800!"
          onClick={minusQty}
        >
          <LiaAngleDownSolid size={25} />
        </Button>
      </div>
    </div>
  );
};

export default QtyBox;
