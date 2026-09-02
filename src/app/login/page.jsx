"use client";
import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { MyContext } from "@/components/context/ThemeContext";
import { postData } from "@/utils/api";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase";

const googleProvider = new GoogleAuthProvider();
const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      router.push("/");
    }
    // Cookies.remove("userEmail");
    Cookies.remove("actionType");
  }, []);
  const context = useContext(MyContext);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formField.email) {
      context?.alertBox("error", "Please enter your email");
      return;
    }

    if (!formField.password) {
      context?.alertBox("error", "Please enter your password");
      return;
    }

    try {
      setIsLoading(true);

      const res = await postData("/api/user/login", formField);

      console.log("LOGIN RESPONSE:", res);

      if (res?.success) {
        context?.alertBox("success", res?.message);

        Cookies.set("accessToken", res?.data?.accessToken);
        Cookies.set("refreshToken", res?.data?.refreshToken);

        Cookies.set("userEmail", res?.data?.user?.email);
        Cookies.set("userName", res?.data?.user?.name);

        context.setUser({
          email: res?.data?.user?.email,
          name: res?.data?.user?.name,
        });

        context.setIsLogin(true);

        setFormField({
          email: "",
          password: "",
        });

        router.push("/");
      } else {
        context?.alertBox("error", res?.message);
      }
    } catch (error) {
      console.log(error);

      context?.alertBox("error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = () => {
    if (!auth) {
      context?.alertBox("error", "Google sign-in is not configured");
      return;
    }

    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        const fields = {
          name: user?.providerData[0]?.displayName,
          email: user?.providerData[0]?.email,
          password: null,
          avatar: user?.providerData[0]?.photoURL,
          phone: user?.providerData[0]?.phoneNumber,
          verify_Email: true,
          signUpWithGoogle: true,
        };

        try {
          const res = await postData("/api/user/authWithGoogle", fields);
          if (res?.success) {
            context?.alertBox("success", "Logged in with Google successfully");

            Cookies.set("accessToken", res?.data?.accessToken);
            Cookies.set("refreshToken", res?.data?.refreshToken);
            Cookies.set("userEmail", res?.data?.user?.email);
            Cookies.set("userName", res?.data?.user?.name);

            context.setUser({
              email: res?.data?.user?.email,
              name: res?.data?.user?.name,
            });
            context.setIsLogin(true);
            router.push("/");
          } else {
            context?.alertBox("error", res?.message || "Backend sync failed");
          }
        } catch (err) {
          console.error("Backend sync error:", err);
          context?.alertBox("error", "Failed to sync with server");
        }
      })
      .catch((error) => {
        console.error("GOOGLE ERROR:", error);
        context?.alertBox("error", error.message);
      });
  };

  const validateVaue = Object.values(formField).every((ele) => ele);
  // const signInWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);

  //     const credential = GoogleAuthProvider.credentialFromResult(result);

  //     const token = credential?.accessToken;

  //     const user = result.user;

  //     console.log(user);
  //     console.log(token);
  //   } catch (error) {
  //     console.log(error);
  //   }
  return (
    <section className="bg-white p-10 rounded-lg border border-gray-400 w-[500px] m-auto relative overflow-hidden">
      {/* ✅ Content (z-50 so clickable) */}
      <div className="container relative z-50">
        <h2 className="text-center text-[20px] font-medium text-gray-800 mb-6">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="my-4 w-full">
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              className="w-full"
              name="email"
              value={formField.email}
              disabled={isLoading}
              onChange={onChangeInput}
            />
          </div>

          <div className="my-4 w-full relative">
            <TextField
              id="passwordField"
              label="Password"
              type={isShowPassword ? "text" : "password"}
              variant="outlined"
              className="w-full"
              name="password"
              value={formField.password}
              disabled={isLoading}
              onChange={onChangeInput}
            />
            <IconButton
              size="large"
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="!absolute top-1 right-1 z-50"
            >
              {isShowPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </IconButton>
          </div>

          {/* ✅ FIXED LINK */}
          <div className="py-1">
            <Link
              href="/forget-password"
              className="text-[16px] font-medium text-gray-700 hover:text-emerald-600"
            >
              Forgot Password
            </Link>
          </div>

          <div className="my-4 w-full">
            <Button
              type="submit"
              className="w-full btn-g py-4! text-[16px]!"
              disabled={!validateVaue}
            >
              {isLoading === true ? <CircularProgress /> : "Login"}
            </Button>
          </div>
        </form>
        <div className="text-center text-[15px] text-gray-600 mb-3">
          Not registered?{" "}
          <Link
            href="/register"
            className="text-emerald-600 hover:text-secondary font-semibold"
          >
            Sign Up
          </Link>
        </div>

        <div className="text-center text-[15px] text-gray-600 mb-3">
          or continue with social account
        </div>

        <Button
          startIcon={<FcGoogle />}
          variant="outlined"
          size="large"
          className="w-full bg-gray-200! text-gray-800! font-medium py-3! border border-gray-400"
          onClick={signInWithGoogle}
        >
          SIGN IN WITH GOOGLE
        </Button>
      </div>

      {/* ✅ Background circles (behind content) */}
      <div className="circle1 bg-emerald-500 opacity-15 w-[400px] h-[400px] rounded-full absolute -bottom-[100px] -left-[15%] z-0"></div>
      <div className="circle2 bg-emerald-500 opacity-15 w-[400px] h-[400px] rounded-full absolute -top-[100px] -right-[15%] z-0"></div>
    </section>
  );
};

export default Login;
