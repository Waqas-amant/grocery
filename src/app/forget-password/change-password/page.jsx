"use client";

import { MyContext } from "@/components/context/ThemeContext";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";

import { postData } from "@/utils/api";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formField, setFormField] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const context = useContext(MyContext);

  useEffect(() => {
    const userEmail = Cookies.get("userEmail");

    if (userEmail) {
      setFormField((prev) => ({
        ...prev,
        email: userEmail,
      }));
    }

    Cookies.remove("actionType");
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formField.newPassword === "") {
      context?.alertBox("error", "Please enter new password");
      return;
    }

    if (formField.confirmPassword === "") {
      context?.alertBox("error", "Please enter confirm password");
      return;
    }

    if (formField.newPassword !== formField.confirmPassword) {
      context?.alertBox("error", "Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      const res = await postData(
        "/api/user/forget-password/change-password",
        formField,
      );

      if (res?.error === false) {
        context?.alertBox("success", res?.message);
        setTimeout(() => {
          Cookies.remove("userEmail");

          router.push("/login");
        }, 1000);
      } else {
        context?.alertBox("error", res?.message);
      }
    } catch (error) {
      context?.alertBox("error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const validateValue = formField.newPassword && formField.confirmPassword;

  return (
    <div className="relative w-[500px] m-auto">
      <section className="bg-white p-10 rounded-lg border border-gray-400 relative z-10">
        <div className="container">
          <div className="text-center">
            <img src="/forget.png" alt="image" className="m-auto" />
          </div>

          <h2 className="text-center text-[20px] font-medium text-gray-800 mb-6">
            Change Password
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="my-4 w-full">
              <TextField
                label="New Password"
                type="password"
                variant="outlined"
                className="w-full"
                name="newPassword"
                value={formField.newPassword}
                disabled={isLoading}
                onChange={onChangeInput}
              />
            </div>

            <div className="my-4 w-full">
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                className="w-full"
                name="confirmPassword"
                value={formField.confirmPassword}
                disabled={isLoading}
                onChange={onChangeInput}
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-g py-4! text-[16px]!"
              disabled={!validateValue || isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;
