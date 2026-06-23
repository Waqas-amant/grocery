import React from "react";
import { IoSearchCircleOutline } from "react-icons/io5";

const Search = (props) => {
  return (
    <div
      className={`search bg-[#F6F6F6] w-[${props.width}]  h-12.5 rounded-md px-4 relative border border-[rgba(0,0,0,0.3)] hover: border-[rgba(0,0,0,0.1)]`}
    >
      <input
        type="text"
        className="h-full w-full outline-none border-0"
        placeholder={props.placeholder}
      />
      <button className="w-10 h-10 rounded-full absolute top-[5px] right-2 z-50 flex items-center justify-center  cursor-pointer hover:bg-gray-200">
        <IoSearchCircleOutline size={25} />
      </button>
    </div>
  );
};

export default Search;
