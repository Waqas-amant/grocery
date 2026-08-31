"use client";
import AccountSidebar from "@/components/AccountSidebar";
import { MyContext } from "@/components/context/ThemeContext";
import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Collapse } from "react-collapse";

const MyAccount = () => {
  const context = useContext(MyContext);
  const [phone, setPhone] = useState("");
  const [isOpenChangePasswordBox, setIsOpenChangePasswordBox] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setProfileForm({
      name: context?.user?.name || "",
      email: context?.user?.email || "",
      phone: phone,
    });
  }, [context?.user]);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    context?.alertBox?.("success", "Profile updated locally.");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      context?.alertBox?.("error", "Passwords do not match.");
      return;
    }
    context?.alertBox?.("success", "Password updated locally.");
    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <section className="bg-gray-100 py-8 mt-5">
      <div className="container flex gap-5 flex-wrap">
        <div className="w-full lg:w-[20%]">
          <AccountSidebar />
        </div>
        <div className="wrapper w-full lg:w-[50%] mt-5">
          <div className="bg-white shadow-md rounded-md mb-5">
            <div className="p-4 flex items-center justify-between border-b-[1px] border-[rgba(0,0,0,0.1)] gap-3 flex-wrap">
              <div className="info">
                <h4 className="text-[20px] text-gray-700">My Profile</h4>
                <p className="text-[16px] text-gray-500">
                  All your account information in one place
                </p>
              </div>
              <Button
                className="text-emerald-600! border-emerald-600! capitalize! font-[600]! px-5!"
                onClick={() =>
                  setIsOpenChangePasswordBox(!isOpenChangePasswordBox)
                }
              >
                Change Password
              </Button>
            </div>
            <form className="p-5" onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="form-group">
                  <TextField
                    id="fullName"
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    value={profileForm.name}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group w-full md:col-span-2">
                  <PhoneInput
                    defaultCountry="pk"
                    value={phone}
                    onChange={(value) => {
                      setPhone(value);
                      setProfileForm({ ...profileForm, phone: value });
                    }}
                  />
                </div>
              </div>
              <Button type="submit" className="btn-g !px-5">
                Update Profile
              </Button>
            </form>
          </div>
          <Collapse isOpened={isOpenChangePasswordBox}>
            <div className="bg-white shadow-md rounded-md">
              <div className="p-4 flex items-center justify-between border-b-[1px] border-[rgba(0,0,0,0.1)]">
                <div className="info">
                  <h4 className="text-[20px] text-gray-700">Change Password</h4>
                  <p className="text-[14px] text-gray-500">
                    Update your password
                  </p>
                </div>
              </div>
              <form className="p-5" onSubmit={handlePasswordSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="form-group">
                    <TextField
                      id="oldPassword"
                      label="Old Password"
                      variant="outlined"
                      size="small"
                      type="password"
                      className="w-full"
                      value={passwordForm.oldPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          oldPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      id="newPassword"
                      label="New Password"
                      variant="outlined"
                      size="small"
                      type="password"
                      className="w-full"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          newPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group w-full md:col-span-2">
                    <TextField
                      id="confirmPassword"
                      label="Confirm Password"
                      variant="outlined"
                      size="small"
                      type="password"
                      className="w-full"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <Button type="submit" className="btn-g !px-5">
                  Change Password
                </Button>
              </form>
            </div>
          </Collapse>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
