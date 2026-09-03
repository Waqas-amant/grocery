"use client";
import React, { useState } from "react";

const OtpBox = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    onChange && onChange(newOtp.join(""));

    // 👉 Move to next input
    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleOnKeyDown = (e, index) => {
    // 👉 Move back on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {otp.map((_, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleOnKeyDown(e, index)}
          className="w-[45px] h-[45px] border border-gray-300 rounded-md text-center text-[18px] outline-none focus:border-emerald-500"
        />
      ))}
    </div>
  );
};

export default OtpBox;
