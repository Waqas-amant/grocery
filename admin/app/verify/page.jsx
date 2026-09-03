"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { postData } from "../utils/api";
import { MyContext } from "../components/context/ThemeProvider";
import OtpBox from "../components/OtpBox";

const Verify = () => {
  const [timeLift, setTimeLift] = useState(120);
  const [expired, setExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const context = useContext(MyContext);
  const router = useRouter();

  useEffect(() => {
    const email = Cookies.get("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

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

  const handleOTPChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const actionType = Cookies.get("actionType") || "verifyEmail";
    const email = userEmail || Cookies.get("userEmail");

    if (!email) {
      setError(true);
      setMessage("Email not found.");
      return;
    }

    if (!otp || otp.length < 6) {
      setError(true);
      setMessage("Please enter the full 6-digit OTP.");
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
          setError(false);
          setMessage(res?.message || "Email verified successfully!");
          Cookies.remove("userEmail");
          Cookies.remove("actionType");
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        } else {
          setError(true);
          setMessage(res?.message || "OTP verification failed");
        }
      } else if (actionType === "forgot-password") {
        const res = await postData("/api/user/verify-forgot-password-otp", {
          email,
          otp,
        });

        if (res?.success) {
          setError(false);
          setMessage(res?.message || "OTP verified successfully!");
          setTimeout(() => {
            router.push("/forgot-password/change-password");
          }, 1500);
        } else {
          setError(true);
          setMessage(res?.message || "OTP verification failed");
        }
      } else {
        setError(true);
        setMessage("Invalid action type");
      }
    } catch (err) {
      setError(true);
      setMessage("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    setMessage("");
    const email = userEmail || Cookies.get("userEmail");
    if (!email) {
      setError(true);
      setMessage("Email not found for OTP resend.");
      return;
    }

    const res = await postData("/api/user/resend-otp", { email });
    if (res?.success || res?.error === false) {
      setError(false);
      setMessage(res?.message || "OTP sent successfully!");
      setTimeLift(120);
      setExpired(false);
      setOtp("");
    } else {
      setError(true);
      setMessage(res?.message || "Failed to send OTP");
    }
  };

  return (
    <section className="w-full min-h-screen relative bg-white overflow-hidden">
      {/* Background Pattern */}
      <img
        src="/pattern2.jpg"
        alt="pattern"
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />

      {/* Header Content */}
      <div className="relative z-10 w-full py-3">
        <div className="w-[90%] mx-auto flex items-center justify-between">
          <img src="/logo (1).png" alt="logo" />
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button className="bg-gray-100! px-5! py-2! rounded-full! border! border-[rgba(0,0,0,0.1)]! text-gray-900! font-[500]!">
                SIGN IN
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="absolute top-0 left-[20%] z-50 w-[60%] h-fit py-[100px]">
        <h1 className="text-[40px] text-center font-extrabold mb-2">
          Verify Email OTP
        </h1>
        <p className="text-center text-gray-600 text-[16px] mb-6">
          OTP sent to <span className="font-bold text-emerald-600">{userEmail || "your email"}</span>
        </p>

        <form className="w-[60%] m-auto flex flex-col items-center" onSubmit={handleSubmit}>
          {message && (
            <div className={`w-full p-3 mb-4 text-sm rounded ${error ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {message}
            </div>
          )}

          <div className="my-4">
            <OtpBox length={6} onChange={handleOTPChange} />
          </div>

          <div className="w-full flex justify-between items-center my-3 text-[14px]">
            <Link href="/login" className="text-emerald-600 font-semibold hover:text-gray-800">
              ← Back to Login
            </Link>

            {expired ? (
              <span
                className="text-emerald-600 font-bold cursor-pointer hover:underline"
                onClick={resendOTP}
              >
                Resend OTP
              </span>
            ) : (
              <span className="font-bold text-gray-700">
                {String(Math.floor(timeLift / 60)).padStart(2, "0")}:
                {String(timeLift % 60).padStart(2, "0")}
              </span>
            )}
          </div>

          <Button type="submit" className="btn-g !w-full px-3 !mt-3" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "VERIFY OTP"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Verify;
