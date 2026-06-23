"use client";
import { Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../utils/api";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formField, setFormField] = useState({
    name: "",
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

    if (!formField.name || !formField.email || !formField.password) {
      setError(true);
      setMessage("Please fill all the fields");
      setIsLoading(false);
      return;
    }

    try {
      const res = await postData("/api/user/register", formField);
      if (res?.error !== true) {
        setError(false);
        setMessage(
          res?.message || "Registered successfully! Please verify your email.",
        );
        setFormField({ name: "", email: "", password: "" });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(true);
        setMessage(res?.message || "Registration failed");
      }
    } catch (err) {
      setError(true);
      setMessage("An unexpected error occurred");
    }
    setIsLoading(false);
  };

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
              <Button
                sx={{
                  px: 2.5,
                  py: 1,
                  borderRadius: "9999px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  color: "#111827",
                  fontWeight: 500,
                  textTransform: "none",
                }}
              >
                SIGN IN
              </Button>
            </Link>

            <Link href="/register">
              <Button
                sx={{
                  px: 2.5,
                  py: 1,
                  borderRadius: "9999px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  backgroundColor: "#f3f4f6",
                  color: "#111827",
                  fontWeight: 500,
                  textTransform: "none",
                }}
              >
                SIGN UP
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-[20%] z-50 w-[60%] h-fit py-[100px]">
        <h1 className="text-[40px] text-center font-extrabold">
          Join us today! Get specialbenefits and stay up-to-date
        </h1>

        <div className="flex items-center justify-center py-3">
          <Button
            sx={{
              px: 5,
              py: 1,
              borderRadius: "9999px",
              border: "1px solid rgba(0,0,0,0.1)",
              color: "#111827",
              fontWeight: 500,
              textTransform: "none",
              fontWeight: "bold",
              gap: 1,
            }}
          >
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
            <div
              className={`p-3 mb-4 text-sm rounded ${error ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
            >
              {message}
            </div>
          )}
          <div className="form-group mb-3 flex flex-col gap-1">
            <span className="text-[15px] text-gray-800">Full Name</span>
            <input
              type="text"
              name="name"
              value={formField.name}
              onChange={onChangeInput}
              disabled={isLoading}
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] outline-none rounded-sm focus:border-[rgba(0,0,0,0.4)] px-3 text-[14px]"
            />
          </div>

          <div className="form-group mb-3 flex flex-col gap-1">
            <span className="text-[15px] text-gray-800">Email</span>
            <input
              type="text"
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

          <div className="flex items-center justify-between my-3">
            <span className="text-[15px] text-gray-800">
              Already have an account?
            </span>

            <Link
              href="/login"
              className="text-emerald-600 font-bold text-[15px] hover:text-gray-800"
            >
              Sign In
            </Link>
          </div>

          <Button
            type="submit"
            className="btn-g w-full px-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Register;
