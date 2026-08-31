"use client";
import OtpBox from "@/components/OtpBox";
import { Button, CircularProgress, Link } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { GoArrowLeft } from "react-icons/go";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { postData } from "@/utils/api";
import { MyContext } from "@/components/context/ThemeContext";

const Verify = () => {
  const [timeLift, setTimeLift] = useState(120);
  const [expired, setExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const handleOTPChange = (value) => {
    setOtp(value);
  };

  useEffect(() => {
    if (timeLift === 0) {
      setExpired(true);
      return;
    }
    const timer = setTimeout(() => {
      setTimeLift(timeLift - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLift]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const actionType = Cookies.get("actionType");
    const email = Cookies.get("userEmail");

    if (!email) {
      context?.alertBox("error", "Email not found.");
      return;
    }

    if (!otp || otp.length < 6) {
      context?.alertBox("error", "Please enter the full OTP.");
      return;
    }

    setIsLoading(true);

    try {
      if (actionType === "verifyEmail") {
        const res = await postData("/api/user/verifyEmail", {
          email,
          otp,
        });

        if (res?.success) {
          context?.alertBox(
            "success",
            res?.message || "Email verified successfully",
          );
          Cookies.remove("userEmail");
          Cookies.remove("actionType");
          router.push("/login");
        } else {
          context?.alertBox("error", res?.message || "OTP verification failed");
        }
      } else if (actionType === "forgot-password") {
        const res = await postData("/api/user/verify-forgot-password-otp", {
          email,
          otp,
        });

        if (res?.success) {
          context?.alertBox(
            "success",
            res?.message || "OTP verified successfully",
          );
          router.push("/forget-password/change-password");
        } else {
          context?.alertBox("error", res?.message || "OTP verification failed");
        }
      } else {
        context?.alertBox("error", "Invalid action type");
      }
    } catch (error) {
      console.log(error);
      context?.alertBox("error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = () => {
    postData("/api/user/resend-otp", {
      email: Cookies.get("userEmail"),
    }).then((res) => {
      if (res?.error === false) {
        context.alertBox("success", res?.message);
        setTimeLift(120);
        setExpired(false);
        setOtp("");
      } else {
        context.alertBox("error", res?.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-[500px] m-auto">
      {/* 🔴 Circles (background me, bahar visible) */}
      <div className="circle1 bg-emerald-500 opacity-15 w-[400px] h-[400px] rounded-full absolute -bottom-[100px] -left-[15%] z-0"></div>
      <div className="circle2 bg-emerald-500 opacity-15 w-[400px] h-[400px] rounded-full absolute -top-[100px] -right-[15%] z-0"></div>

      {/* 🟢 Form */}

      <section className="bg-white p-10 rounded-lg border border-gray-400 relative z-10">
        <div className="container">
          <h1 className="text-center text-[20px] font-medium text-gray-800 ">
            Verify OTP
          </h1>
          <div className="text-[16px] flex justify-center mt-2">
            OTP send to{" "}
            <span className="text-emerald-600 font-bold ml-1">
              {Cookies.get("userEmail")}
            </span>
          </div>

          <div className="flex items-center justify-center my-6">
            <OtpBox length={6} onChange={handleOTPChange} />
          </div>
          <div className="flex">
            {expired ? (
              <span
                className="text-emerald-600 font-bold text-[15px] ml-auto cursor-pointer"
                onClick={resendOTP}
              >
                Resend OTP
              </span>
            ) : (
              <>
                <b className="ml-auto">
                  {String(Math.floor(timeLift / 60)).padStart(2, "0")}:
                  {String(timeLift % 60).padStart(2, "0")}
                </b>
              </>
            )}
          </div>
          <Button
            type="submit"
            className="w-full btn-g py-4! text-[16px]!"
            disabled={isLoading}
          >
            {isLoading === true ? <CircularProgress size={22} /> : "Verify"}
          </Button>

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
    </form>
  );
};

export default Verify;
