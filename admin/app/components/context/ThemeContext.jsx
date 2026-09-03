"use client";

import { useState, createContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const token = Cookies.get("accessToken");
    const isAuthPage = ["/login", "/register", "/verify"].includes(pathname);
    if (token) {
      setIsLogin(true);
      setUser({
        name: Cookies.get("userName") || "",
        email: Cookies.get("userEmail") || "",
      });
      if (isAuthPage) {
        router.push("/");
      }
    } else {
      setIsLogin(false);
      setUser({
        email: "",
        name: "",
      });
      if (!isAuthPage) {
        router.push("/login");
      }
    }
  }, [pathname, router]);

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
