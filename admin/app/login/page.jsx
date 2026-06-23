"use client";
import { Button, Checkbox, CircularProgress } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../utils/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormField(() => ({
      ...formField,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!formField.email || !formField.password) {
      setError(true);
      setMessage("Please fill all the fields");
      setIsLoading(false);
      return;
    }

    try {
      const res = await postData("/api/user/login", formField);
      if (res?.success) {
        setError(false);
        setMessage(res?.message || "Login successful!");
        Cookies.set("accessToken", res?.data?.accessToken, { expires: 1 });
        Cookies.set("refreshToken", res?.data?.refreshToken, { expires: 7 });
        
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setError(true);
        setMessage(res?.message || "Login failed");
      }
    } catch (err) {
      setError(true);
      setMessage("An unexpected error occurred");
    }
    setIsLoading(false);
  };

  const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };
  return (
    <section className="w-full min-h-screen relative bg-white overflow-hidden">
      {/* Background Pattern */}
      <img
        src="/pattern2.jpg"
        alt="pattern"
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />

      {/* Content */}
      <div className="relative z-10 w-full py-3">
        <div className="w-[90%] mx-auto flex items-center justify-between">
          <img src="/logo (1).png" alt="logo" />

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button className="bg-gray-100! px-5! py-2! rounded-full! border! border-[rgba(0,0,0,0.1)]! text-gray-900! font-[500]!">
                SIGN IN
              </Button>
            </Link>

            <Link href="/register">
              <Button className="bg-gray-100! px-5! py-2! rounded-full! border! border-[rgba(0,0,0,0.1)]! text-gray-900! font-[500]!">
                SIGN UP
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-[20%] z-100 w-[60%] h-fit py-[100px]">
        <h1 className="text-[42px] text-center font-extrabold">
          Welcom Back! Sign in with your Credentials
        </h1>
        <div className="flex items-center justify-center py-3">
          <Button className="bg-gray-100! px-5! py-2! rounded-full! border! border-[rgba(0,0,0,0.1)]! text-gray-900! font-[500]! capitalize! font-bold! gap-2!">
            Sign in with google <FcGoogle size={20} />
          </Button>
        </div>
        <div className="w-full flex items-center justify-center gap-3 py-3">
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
          <span className="text-[10px] lg:text-[14px] font-[500]">
            Or, Sign in with your email
          </span>
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
        </div>

        <form className="w-[50%] m-auto" onSubmit={handleSubmit}>
          {message && (
            <div className={`p-3 mb-4 text-sm rounded ${error ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {message}
            </div>
          )}
          <div className="form-group mb-3 flex flex-col gap-1">
            <span className="text-[15px] text-gray-800">Email</span>
            <input
              type="email"
              name="email"
              value={formField.email}
              onChange={onChangeInput}
              disabled={isLoading}
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] outline-none rounded-sm focus:border-[rgba(0,0,0,0.4)] px-3 text-[14px]"
            />
          </div>
          <div className="form-group mb-2 flex flex-col gap-1">
            <span className="text-[15px] text-gray-800">Password</span>
            <input
              type="password"
              name="password"
              value={formField.password}
              onChange={onChangeInput}
              disabled={isLoading}
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] outline-none rounded-sm focus:border-[rgba(0,0,0,0.4)] px-3 text-[14px]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0 -ml-[10px]">
              <Checkbox {...label} defaultChecked size="small" />
              <span className="text-[15px] text-gray-800">Remember me</span>
            </div>
            <Link
              href={"/forgot-password"}
              className="text-emerald-600 font-bold text-[15px] hover:text-gray-800"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex items-center justify-between my-3">
            <span className="text-[15px] text-gray-800">
              Don`t have an account?
            </span>

            <Link
              href={"/register"}
              className="text-emerald-600 font-bold text-[15px] hover:text-gray-800"
            >
              Sign Up
            </Link>
          </div>
          <Button type="submit" className="btn-g !w-full px-3!" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "SIGN IN"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
