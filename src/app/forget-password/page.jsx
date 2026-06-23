"use client";
import { MyContext } from "@/components/context/ThemeContext";
import { Button, CircularProgress, Link, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { postData } from "@/utils/api";

const ForgotPasword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formField, setFormField] = useState({
    email: "",
  });
  const router = useRouter();

  const context = useContext(MyContext);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormField(() => {
      return {
        ...formField,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formField.email === "") {
      context?.alertBox("error", "Please enter your email address");
      setIsLoading(false);
      return;
    }

    try {
      const res = await postData("/api/user/forgot-password", {
        email: formField.email,
      });

      if (res?.success) {
        context?.alertBox("success", res?.message);

        Cookies.set("actionType", "forgot-password");
        Cookies.set("userEmail", formField.email);

        router.push("/verify");
      } else {
        context?.alertBox("error", res?.message);
      }
    } catch (error) {
      console.log(error);
      context?.alertBox("error", "Something went wrong");
    }

    setIsLoading(false);
  };
  const validateVaue = Object.values(formField).every((ele) => ele);
  return (
    <div className="relative w-[500px] m-auto">
      {/* 🔴 Circles (background me, bahar visible) */}
      <div className="circle1 bg-emerald-500 opacity-15 w-[400px] h-[400px] rounded-full absolute -bottom-[100px] -left-[15%] z-0"></div>
      <div className="circle2 bg-emerald-500 opacity-15 w-[400px] h-[400px] rounded-full absolute -top-[100px] -right-[15%] z-0"></div>

      {/* 🟢 Form */}
      <section className="bg-white p-10 rounded-lg border border-gray-400 relative z-10">
        <div className="container">
          <div className="text-center">
            <img src={"/forget.png"} alt="image" className="m-auto" />
          </div>

          <h2 className="text-center text-[20px] font-medium text-gray-800 mb-6">
            Forgot Password ?
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="my-4 w-full">
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                className="w-full"
                name="email"
                value={formField.email}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-g py-4! text-[16px]!"
              disabled={!validateVaue}
            >
              {isLoading === true ? <CircularProgress /> : "Submit"}
            </Button>
          </form>
          <div className="text-center mt-4">
            <Link
              href="/login"
              className="text-emerald-600 font-semibold flex items-center justify-center gap-1"
            >
              <GoArrowLeft size={20} /> Back To Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPasword;
