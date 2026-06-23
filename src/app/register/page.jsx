"use client";
import { Button, CircularProgress, Link, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { MyContext } from "@/components/context/ThemeProvider";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { postData } from "@/utils/api";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase";

const googleProvider = new GoogleAuthProvider();
const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formField, setFormField] = useState({
    name: "",
    email: "",
    password: "",
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

  const validateVaue = Object.values(formField).every((ele) => ele);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formField.name === "") {
      context?.alertBox("error", "Please enter your name");
      setIsLoading(false);
      return false;
    }
    if (formField.email === "") {
      context?.alertBox("error", "Please enter your email address");
      setIsLoading(false);
      return false;
    }
    if (formField.password === "") {
      context?.alertBox("error", "Please enter your password");
      setIsLoading(false);
      return false;
    }
    postData("/api/user/register", formField).then((res) => {
      if (res?.error !== true) {
        context?.alertBox("success", res?.message);

        // ✅ save email for verify page
        // localStorage.setItem("userEmail", formField.email);
        Cookies.set("userEmail", formField.email);
        Cookies.set("actionType", "verifyEmail");
        router.push("/verify");

        // reset baad me karo (optional)
        setFormField({
          name: "",
          email: "",
          password: "",
        });
      } else {
        context?.alertBox("error", res?.message);
      }

      setIsLoading(false);
    });
  };

   const signInWithGoogle = () => {
      signInWithPopup(auth, googleProvider)
        .then(async (result) => {
          const user = result.user;
           const fields={
            name:user?.providerData[0]?.displayName,
            email:user?.providerData[0]?.email,
            password:null,
            avatar:user?.providerData[0]?.photoURL,
            phone:user?.providerData[0]?.phoneNumber,
            verify_Email:true,
            signUpWithGoogle:true,
            
           }
           
          try {
            const res = await postData("/api/user/authWithGoogle", fields);
            if (res?.success) {
              context?.alertBox("success", "Logged in with Google successfully");
  
              Cookies.set("accessToken", res?.data?.accessToken);
              Cookies.set("refreshToken", res?.data?.refreshToken);
              Cookies.set("userEmail", res?.data?.existUser?.email);
              Cookies.set("userName", res?.data?.existUser?.name);
  
              context.setUser({
                email: res?.data?.existUser?.email,
                name: res?.data?.existUser?.name,
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
  return (
    <section className="bg-gray-100 py-10 rounded-lg border border-gray-400 w-[500px] m-auto relative">
      <div className="container">
        <h2 className="text-center text-[20px] font-medium text-gray-800 mb-6">
          Register with new account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="my-4 w-full">
            <TextField
              id="fullName"
              label="FullName"
              variant="outlined"
              className="w-full"
              name="name"
              value={formField.name}
              disabled={isLoading === true ? true : false}
              onChange={onChangeInput}
            />
          </div>
          <div className="my-4 w-full">
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formField.email}
              variant="outlined"
              className="w-full"
              disabled={isLoading === true ? true : false}
              onChange={onChangeInput}
            />
          </div>
          <div className="my-4 w-full relative">
            <TextField
              id="passwordField"
              name="password"
              label="password"
              type={`${isShowPassword === true ? "text" : "password"}`}
              variant="outlined"
              className="w-full"
              value={formField.password}
              disabled={isLoading === true ? true : false}
              onChange={onChangeInput}
            />
            <IconButton
              aria-label="password"
              size="large"
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute! top-1.25 right-1.25 z-50"
            >
              {isShowPassword === true ? (
                <FaEyeSlash size={20} />
              ) : (
                <FaEye size={20} />
              )}
            </IconButton>
          </div>
          <div className="my-4 w-full relative">
            <Button
              type="submit"
              className="w-full btn-g py-4! text-[16px]!"
              disabled={!validateVaue}
            >
              {isLoading === true ? <CircularProgress /> : " Register"}
            </Button>
          </div>
          <div className="text-center text-[15px] text-gray-600 mb-3">
            <span>
              Already have an account?
              <Link
                href="/login"
                className="text-emerald-600 hover:text-secondary font-semibold"
              >
                Login
              </Link>{" "}
            </span>
          </div>
          <div className="text-center text-[15px] text-gray-600 mb-3">
            or continue with social account
          </div>
          <Button
            loading={false}
            loadingPosition="end"
            startIcon={<FcGoogle />}
            variant="outlined"
            size="large"
            className="w-full bg-gray-200! text-gray-800! font-medium py-3! border! border-gray-400"
            onClick={() => signInWithGoogle()}
          >
            SIGN UP WITH GOOGLE
          </Button>
        </form>
      </div>

      <div className="circle1 bg-emerald-500 opacity-15 w-[400px] h-[400px] rounded-full absolute -bottom-[100px] -left-[15%]"></div>
      <div className="circle2 bg-emerald-500 opacity-15 w-[400px] h-[400px] rounded-full absolute -top-[100px] -right-[15%]"></div>
    </section>
  );
};

export default Register;
