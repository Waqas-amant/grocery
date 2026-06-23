"use client";

import { useState, createContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// ✅ Context create
import { MyContext } from "./ThemeProvider";

const ThemeProvider = ({ children }) => {
  const [isOpenAddressBox, setIsOpenAddressBox] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    email: "",
    name: "",
  });
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      Cookies.remove("userEmail");
      Cookies.remove("actionType");
      setIsLogin(true);
      setUser({
        name: Cookies.get("userName") || "",
        email: Cookies.get("userEmail") || "",
      });
      if (token) {
        router.push("/");
      }
    }
  }, [isLogin, user]);

  const isOpenAddressPanel = () => {
    setIsOpenAddressBox((prev) => !prev);
  };

  // ✅ Alert function
  const alertBox = (type, msg) => {
    if (type === "success") {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  };

  // ✅ All values in one object
  const values = {
    isOpenAddressBox,
    setIsOpenAddressBox,
    isOpenAddressPanel,
    alertBox,
    setIsLogin,
    isLogin,
    setUser,
    user,
  };

  return (
    <MyContext.Provider value={values}>
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </MyContext.Provider>
  );
};

export default ThemeProvider;
