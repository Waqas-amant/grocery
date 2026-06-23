import UploadBox from "@/app/components/UploadImage";
import React from "react";
import { IoMdClose } from "react-icons/io";

const AddSlide = () => {
  return (
    <section className="w-full py-3 px-5">
      <h2 className="text-[18px] text-gray-700 font-[600]">Add Banner</h2>

      <form className="mt-5 bg-white p-5 rounded-md shadow-md">
        <div className="flex items-center gap-4 mt-2">
          <div className="w-[150px] h-[120px] rounded-md border border-[rgba(0,0,0,0.3)] flex items-center justify-center flex-col gap-2 relative overflow-hidden">
            <img
              src="/banner01.jpg"
              alt="product image"
              className="w-full h-full object-cover"
            />

            <span className="flex items-center justify-center bg-red-700 rounded-full w-6 h-6 absolute -top-[8px] -right-[8px] cursor-pointer">
              <IoMdClose size={20} className="text-white" />
            </span>
          </div>

          <UploadBox />
        </div>
      </form>
    </section>
  );
};

export default AddSlide;
