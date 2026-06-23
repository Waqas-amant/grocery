import { Button } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <header className="w-full h-[60px] bg-white shadow-md flex items-center justify-end px-5 sticky top-0 z-50">
      <Button className="w-[50px]! h-[50px]! min-w-[50px]! rounded-full! p-0!">
        <img src={"/profile.png"} alt="profile img" />
      </Button>
    </header>
  );
};

export default Header;
