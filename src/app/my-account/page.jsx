"use client";
import AccountSidebar from "@/components/AccountSidebar";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Collapse } from "react-collapse";
const MyAccount = () => {
  const [phone, setPhone] = useState("");
  const [isOpenChangePasswordBox, setIsOpenChangePasswordBox] = useState(false);

  return (
    <section className="bg-gray-100 py8 mt-5">
      <div className="container flex gap-5">
        <div className="w-[20%]">
          <AccountSidebar />
        </div>
        <div className="wrapper w-[50%] mt-5">
          <div className="bg-white shadow-md rounded-md mb-5">
            <div className="p-4 flex items-center justify-between border-b-[1px] border-[rgba(0,0,0,0.1)]">
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
            <form className="p-5">
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="form-group">
                  <TextField
                    id="fullName"
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
                <div className="form-group w-full">
                  <PhoneInput
                    defaultCountry="pak"
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                  />
                </div>
              </div>
              <Button className="btn-g !px-5">Update Profile</Button>
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
              <form className="p-5">
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <div className="form-group">
                    <TextField
                      id="oldPassword"
                      label="Old Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      id="newPassword"
                      label="New Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                    />
                  </div>
                  <div className="form-group w-full">
                    <TextField
                      id="confirmPassword"
                      label="Confirm Password"
                      variant="outlined"
                      size="small"
                      className="w-full"
                    />
                  </div>
                </div>
                <Button className="btn-g !px-5">Change Password</Button>
              </form>
            </div>
          </Collapse>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
