"use client";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { LiaAngleDownSolid } from "react-icons/lia";
import { TfiAngleUp } from "react-icons/tfi";

const QtyBox = () => {
  const [qtyVal, setQtyVal] = useState(1);

  const minusQty = () => {
    if (qtyVal === 1) {
      setQtyVal(1);
    } else {
      setQtyVal(qtyVal - 1);
    }
  };

  return (
    <div className="QtyBox border border-[rgba(0,0,0,0.1)] rounded-md flex items-center gap-1 w-[80px] h-[45px]  relative">
      <input
        type="number"
        value={qtyVal}
        className="border-0 outline-none w-full h-full px-2 text-[14px] text-gray-800"
      />
      <div className="flex flex-col absolute top-0 right-0 h-full">
        <Button
          className="w-7.5! min-w-7.5! h-5.5! text-gray-800!"
          onClick={() => setQtyVal(qtyVal + 1)}
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
