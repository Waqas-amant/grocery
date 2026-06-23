"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { BsWallet2 } from "react-icons/bs";
import { FaFacebookF, FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoChatboxOutline } from "react-icons/io5";
import { LiaGiftSolid, LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import Drawer from "@mui/material/Drawer";
import { MyContext } from "./context/ThemeProvider";
import TextField from "@mui/material/TextField";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const Footer = () => {
  const [open, setOpen] = useState(false);
  const context = useContext(MyContext);
  const [phone, setPhone] = useState("");
  return (
    <>
      <footer>
        <div className="bg-[#FAFAFA] py-8 pb-0">
          <div className="container mx-auto">
            {/* ✅ ONE FLEX PARENT */}
            <div className="flex items-center justify-center gap-6 py-3 lg:py-8 pb-0 lg:pb-8 px-0 lg:px-5 flex-wrap">
              {/* item 1 */}
              <div className=" col flex flex-col items-center group w-[15%]">
                <LiaShippingFastSolid className="text-[40px] transition-all duration-300 group-hover:text-emerald-600 group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-semibold mt-3">
                  Free Shipping
                </h3>
                <p className="text-[12px] font-medium">
                  For all Orders Over $100
                </p>
              </div>

              {/* item 2 */}
              <div className=" col flex flex-col items-center group w-[15%]">
                <PiKeyReturnLight className="text-[40px] transition-all duration-300 group-hover:text-emerald-600 group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-semibold mt-3">
                  30 Days of returns
                </h3>
                <p className="text-[12px] font-medium">
                  For an Exchange Product
                </p>
              </div>

              {/* item 3 */}
              <div className="col flex flex-col items-center group w-[15%]">
                <BsWallet2 className="text-[40px] transition-all duration-300 group-hover:text-emerald-600 group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-semibold mt-3">
                  Secured Payments
                </h3>
                <p className="text-[12px] font-medium">
                  Payments Card is Accepted
                </p>
              </div>

              {/* item 4 */}
              <div className="col flex flex-col items-center group w-[15%]">
                <LiaGiftSolid className="text-[40px] transition-all duration-300 group-hover:text-emerald-600 group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-semibold mt-3">
                  Special Gifts
                </h3>
                <p className="text-[12px] font-medium">
                  Our First Product Order
                </p>
              </div>

              {/* item 5 */}
              <div className="col flex flex-col items-center group w-[15%]">
                <BiSupport className="text-[40px] transition-all duration-300 group-hover:text-emerald-600 group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-semibold mt-3">Support 24/7</h3>
                <p className="text-[12px] font-medium">Contact us Anytime</p>
              </div>
            </div>
          </div>
          <hr />
          <div className=" container mx-auto">
            <div className="flex justify-start gap-8  py-8">
              <div className="col1 flex flex-1 flex-col gap-4  pr-6  border-gray-200 border-r-[1px">
                <h3 className="text-[20px] font-semibold text-gray-700">
                  Contact Us
                </h3>
                <p className="text-[14px] font-normal">
                  BroBazar -Mega Super Stoer
                  <br />
                  507 -Union Trade center France
                </p>

                <Link
                  href="mailto:someone@example.com"
                  className="font-semibold text-gray-700 text-[15px] hover:text-emerald-600"
                >
                  someoneexample.com
                </Link>
                <span className="text-[20px] font-bold text-emerald-600">
                  (+92) 3434567890
                </span>
                <div className="flex items-center gap-3">
                  <IoChatboxOutline className="text-[40px] text-emerald-600" />
                  <span className="text-[16px] font-[500] text-gray-700">
                    Online Chat
                    <br />
                    Get Expert Help
                  </span>
                </div>
              </div>
              <div className="col2 flex-1 gap-5">
                <div className="box">
                  <h3 className="text-[20px] font-semibold text-gray-700">
                    Products
                  </h3>
                  <ul className="list mt-5">
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link
                        href="/"
                        className="link text-[15px] font-[500] text-gray-600"
                      >
                        Prices Drop
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link
                        href="/"
                        className="link text-[15px] font-[500] text-gray-600"
                      >
                        New Products
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link
                        href="/"
                        className="link text-[15px] font-[500] text-gray-600"
                      >
                        Best Sales
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link
                        href="/"
                        className="link text-[15px] font-[500] text-gray-600"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link
                        href="/"
                        className="link text-[15px] font-[500] text-gray-600"
                      >
                        SiteMap
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link
                        href="/"
                        className="link text-[15px] font-[500] text-gray-600"
                      >
                        Stores
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col3 flex-1 ">
                <div className="box">
                  <h3 className="text-[20px] font-semibold text-gray-700">
                    Our Company
                  </h3>
                  <ul className="list mt-5">
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link
                        href="/"
                        className="link text-[15px] font-[500] text-gray-500"
                      >
                        Delivery
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link
                        href="/"
                        className="link text-[15px] font-[500] text-gray-500"
                      >
                        Legal Notice
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link
                        href="/"
                        className="link text-[15px] font-[500] text-gray-500"
                      >
                        Terms & Conditions of use
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link
                        href="/"
                        className="link text-[15px] font-[500] text-gray-500"
                      >
                        About Us
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link
                        href="/"
                        className="link text-[15px] font-[500] text-gray-500"
                      >
                        Secured Payments
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link
                        href="/"
                        className="link text-[15px] font-[500] text-gray-500"
                      >
                        login
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col4 flex-1 pl-20 ">
                <h3 className="text-[20px] font-semibold text-gray-700 ">
                  {" "}
                  Subscribe News
                </h3>
                <p className="text-[14px] mt-3">
                  Subscribe to latest newsletter to get news about social
                  discount.
                </p>
                <form className="flex flex-col gap-5 w-[500] mt-5">
                  <input
                    type="text"
                    placeholder="Write your email address"
                    className="w-full h-10 border border-[rgba(0,0,0,0.1)] outline-none rounded-lg px-4"
                  />
                  <div className="btn">
                    <Button className="btn-g">SubScribe</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="bottomStrip py-3">
          <div className="container flex items-center justify-between">
            <div className="socials gap-2 flex items-center">
              <Link
                href={"/"}
                className="flex items-center justify-center bg-white rounded-full border border-[rgba(0,0,0,0.1)] w-10 h-10 hover:bg-emerald-600 hover:text-white group transition"
              >
                <FaFacebookF
                  size={20}
                  className="text-gray-600 group-hover:text-white "
                />
              </Link>
              <Link
                href={"/"}
                className="flex items-center justify-center bg-white rounded-full border border-[rgba(0,0,0,0.1)] w-10 h-10 hover:bg-emerald-600 hover:text-white group transition"
              >
                <AiOutlineYoutube
                  size={20}
                  className="text-gray-600 group-hover:text-white "
                />
              </Link>
              <Link
                href={"/"}
                className="flex items-center justify-center bg-white rounded-full border border-[rgba(0,0,0,0.1)] w-10 h-10 hover:bg-emerald-600 hover:text-white group transition"
              >
                <FaPinterestP
                  size={20}
                  className="text-gray-600 group-hover:text-white "
                />
              </Link>
              <Link
                href={"/"}
                className="flex items-center justify-center bg-white rounded-full border border-[rgba(0,0,0,0.1)] w-10 h-10 hover:bg-emerald-600 hover:text-white group transition"
              >
                <FaInstagram
                  size={20}
                  className="text-gray-600 group-hover:text-white "
                />
              </Link>
            </div>
            <p className="text-center">&copy;Ecommerce Template</p>
            <div className="flex items-center gap-2">
              <img
                src="/carte_bleue.jpg"
                alt="image"
                className="h-4 object-contain"
              />
              <img src="/visa.jpg" alt="image" className="h-4 object-contain" />
              <img
                src="/master.jpg"
                alt="image"
                className="h-4 object-contain"
              />
              <img
                src="/amercia-express.jpg"
                alt="image"
                className="h-4 object-contain"
              />
              <img
                src="/paypal.png"
                alt="image"
                className="h-4 object-contain"
              />
            </div>
          </div>
        </div>
      </footer>
      <Drawer
        open={context?.isOpenAddressBox}
        onClose={context?.isOpenAddressPanel}
        className="addressPanel"
        anchor="right"
      >
        <form className="w-[500px] p-5">
          <h3 className="text-[18px] font-medium text-gray-700">
            Add Delivery Address
          </h3>
          <div className="flex flex-col gap-4 mt-4">
            <div className="form-group w-full">
              <TextField
                label="Address Line 1"
                variant="outlined"
                className="w-full"
                size="small"
              />
            </div>
            <div className="form-group w-full">
              <TextField
                label="City"
                variant="outlined"
                className="w-full"
                size="small"
              />
            </div>
            <div className="form-group w-full">
              <TextField
                label="State"
                variant="outlined"
                className="w-full"
                size="small"
              />
            </div>
            <div className="form-group w-full">
              <TextField
                label="Pin Code"
                type="number"
                variant="outlined"
                className="w-full"
                size="small"
              />
            </div>
            <div className="form-group w-full">
              <TextField
                label="Country"
                type="text"
                variant="outlined"
                className="w-full"
                size="small"
              />
            </div>
            <div className="form-group w-full">
              <PhoneInput
                defaultCountry="pak"
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </div>
            <div className="form-group w-full">
              <TextField
                label="Landmark"
                type="text"
                variant="outlined"
                className="w-full"
                size="small"
              />
            </div>
            <div className="form-group w-full">
              <FormLabel id="demo-row-radio-buttons-group-label">
                Address Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Home"
                  control={<Radio />}
                  label="Home"
                />
                <FormControlLabel
                  value="Office"
                  control={<Radio />}
                  label="Office"
                />
              </RadioGroup>
            </div>
            <div className="form-group w-full">
              <Button className="btn-g w-full">Save</Button>
            </div>
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default Footer;
