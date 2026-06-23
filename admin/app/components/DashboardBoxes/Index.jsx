import React from "react";
import Box from "./Box";
import { TbUsers } from "react-icons/tb";
import { GoGift } from "react-icons/go";
import { LiaProductHunt } from "react-icons/lia";
import { MdOutlineCategory } from "react-icons/md";

const DashboardBoxes = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      <Box
        title="Total Users"
        count="5675"
        icon={<TbUsers size={40} className="text-white ml-auto" />}
        bg="#10b981"
        link="/users"
      />
      <Box
        title="Total Orders"
        count="767"
        icon={<GoGift size={40} className="text-white ml-auto" />}
        bg="#3872fa"
        link="/orders"
      />
      <Box
        title="Total Products"
        count="4578"
        icon={<LiaProductHunt size={40} className="text-white ml-auto" />}
        bg="#4f49e4"
        link="/products"
      />
      <Box
        title="Total Category"
        count="13"
        icon={<MdOutlineCategory size={40} className="text-white ml-auto" />}
        bg="#f22c61"
        link="/category"
      />
    </div>
  );
};

export default DashboardBoxes;
