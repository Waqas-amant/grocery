"use client";

import { useState, createContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// ✅ Context create
export const MyContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isOpenAddressBox, setIsOpenAddressBox] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    email: "",
    name: "",
  });
  const [cartItems, setCartItems] = useState([]);
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

  // Load cart from localStorage after mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart from localStorage", e);
      }
    }
  }, []);

  const addToCart = (product, quantity = 1) => {
    const cart = [...cartItems];
    const existingIndex = cart.findIndex((item) => item._id === product._id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity = quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    setCartItems(cart);
    localStorage.setItem("cartItems", JSON.stringify(cart));
    alertBox("success", "Added to Cart!");
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    alertBox("success", "Removed from Cart!");
  };

  const updateCartQty = (id, quantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

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
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
  };

  return (
    <MyContext.Provider value={values}>
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </MyContext.Provider>
  );
};

export default ThemeProvider;
