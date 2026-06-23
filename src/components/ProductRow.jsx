import Link from "next/link";
import React from "react";
import { MdOutlineArrowRight } from "react-icons/md";
import ProductSlider from "./ProductSlider";

const ProductRow = (props) => {
  return (
    <div>
      <section className="bg-white py-3">
        <div className="container">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[20px] text-gray-800 font-medium">
              {props?.title}
            </h2>
            <Link
              href={"/"}
              className="flex items-center gap-1 text-[16px] text-gray-700 font-medium hover:text-emerald-600"
            >
              View all <MdOutlineArrowRight size={25} />
            </Link>
          </div>
          <ProductSlider />
        </div>
      </section>
    </div>
  );
};

export default ProductRow;
