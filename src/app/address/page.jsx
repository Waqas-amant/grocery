"use client";
import AccountSidebar from "@/components/AccountSidebar";
import { MyContext } from "@/components/context/ThemeContext";
import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";
import AddressBox from "./AddressBox";

const Address = () => {
  const context = useContext(MyContext);
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      label: "Home",
      contact: "WAQAS ALI +92 32444444",
      address: "H No 222 Street No 999 Mulana Shokat Ali Road Lahore Pakistan",
    },
    {
      label: "Office",
      contact: "WAQAS ALI +92 333111222",
      address: "Suit 5, Gulberg III, Lahore, Pakistan",
    },
  ]);
  const [formData, setFormData] = useState({
    label: "Home",
    contact: "",
    address: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.contact || !formData.address) {
      context?.alertBox?.("error", "Please add contact and address details.");
      return;
    }

    setAddresses([
      { ...formData, label: formData.label || "Home" },
      ...addresses,
    ]);
    setFormData({ label: "Home", contact: "", address: "" });
    setShowForm(false);
    context?.alertBox?.("success", "Address added successfully.");
  };

  return (
    <section className="bg-gray-100 py-8">
      <div className="container flex gap-10 flex-wrap">
        <div className="w-full lg:w-[20%]">
          <AccountSidebar />
        </div>
        <div className="wrapper w-full lg:w-[50%] mt-5">
          <div className="bg-white shadow-md rounded-md mb-5">
            <div className="p-4 flex items-center justify-between border-b-[1px] border-[rgba(0,0,0,0.1)] gap-3 flex-wrap">
              <div className="info">
                <h4 className="text-[20px] text-gray-700">Address</h4>
                <p className="text-[16px] text-gray-500">Manage Your Address</p>
              </div>
              <Button
                className="text-emerald-600! border-emerald-600! capitalize! font-[600]! px-5!"
                onClick={() => setShowForm((prev) => !prev)}
              >
                <FiPlus size={20} />
                Add Address
              </Button>
            </div>
            {showForm && (
              <form
                className="p-5 border-b border-gray-200"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-4">
                  <TextField
                    label="Label"
                    size="small"
                    value={formData.label}
                    onChange={(e) =>
                      setFormData({ ...formData, label: e.target.value })
                    }
                  />
                  <TextField
                    label="Contact"
                    size="small"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                  />
                  <TextField
                    label="Address"
                    size="small"
                    multiline
                    rows={3}
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                  <Button type="submit" className="btn-g !px-5 w-fit">
                    Save Address
                  </Button>
                </div>
              </form>
            )}
            <div className="flex flex-col gap-3 p-5">
              {addresses.map((item, index) => (
                <AddressBox
                  key={`${item.label}-${index}`}
                  label={item.label}
                  contact={item.contact}
                  address={item.address}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Address;
