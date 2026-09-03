"use client";
import UploadBox from "@/app/components/UploadImage";
import React, { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { MyContext } from "@/app/components/context/ThemeProvider";
import { deleteImage, postData } from "@/app/utils/api";
import { Button, CircularProgress } from "@mui/material";

const AddBanner = () => {
  const [formFields, setFormFields] = useState({
    title: "",
    link: "",
    imageUrl: "",
    isActive: true,
  });
  const [preview, setPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setPreviewFun = (previewArr = []) => {
    if (previewArr.length > 0) {
      const uploadedImg = previewArr[0];
      setPreview([uploadedImg]);
      setFormFields((prev) => ({
        ...prev,
        imageUrl: uploadedImg,
      }));
    }
  };

  const removeImg = (imgUrl) => {
    deleteImage(`/api/homeSlider/deleteImage?img=${imgUrl}`).then(() => {
      setPreview([]);
      setFormFields((prev) => ({
        ...prev,
        imageUrl: "",
      }));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formFields.title.trim()) {
      context?.alertBox("error", "Banner title is required");
      return;
    }

    if (!formFields.imageUrl) {
      context?.alertBox("error", "Please upload a banner image");
      return;
    }

    setIsLoading(true);

    try {
      const res = await postData("/api/banner/create", formFields);
      setIsLoading(false);
      if (res?.success || res?.error === false) {
        context?.alertBox("success", res?.message || "Banner created successfully!");
        router.push("/banners");
      } else {
        context?.alertBox("error", res?.message || "Failed to create banner");
      }
    } catch (error) {
      setIsLoading(false);
      context?.alertBox("error", "Something went wrong");
    }
  };

  return (
    <section className="w-full py-3 px-5">
      <h2 className="text-[18px] text-gray-700 font-[600]">Add Banner</h2>

      <form
        className="mt-5 bg-white p-5 rounded-md shadow-md flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="form-group flex flex-col gap-1">
          <label className="text-[14px] text-gray-700 font-[500]">Title *</label>
          <input
            type="text"
            name="title"
            value={formFields.title}
            onChange={handleInputChange}
            placeholder="Enter banner title"
            className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] outline-none rounded-sm px-3 text-[14px] focus:border-emerald-600"
          />
        </div>

        <div className="form-group flex flex-col gap-1">
          <label className="text-[14px] text-gray-700 font-[500]">Link (Optional)</label>
          <input
            type="text"
            name="link"
            value={formFields.link}
            onChange={handleInputChange}
            placeholder="Enter target URL or path (e.g. /products)"
            className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] outline-none rounded-sm px-3 text-[14px] focus:border-emerald-600"
          />
        </div>

        <div>
          <h2 className="text-[14px] text-gray-700 font-[500] mb-2">Banner Image *</h2>
          <div className="flex items-center gap-4">
            {preview.length > 0 && (
              <div className="w-[200px] h-[120px] rounded-md border border-[rgba(0,0,0,0.3)] flex items-center justify-center relative overflow-hidden">
                <img
                  src={preview[0]}
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                />
                <span
                  className="flex items-center justify-center bg-red-700 rounded-full w-6 h-6 absolute top-1 right-1 cursor-pointer z-10"
                  onClick={() => removeImg(preview[0])}
                >
                  <IoMdClose size={18} className="text-white" />
                </span>
              </div>
            )}

            {preview.length === 0 && (
              <UploadBox
                multiple={false}
                name="images"
                url="/api/homeSlider/uploadImages"
                setPreviewFun={setPreviewFun}
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formFields.isActive}
            onChange={handleInputChange}
            className="w-4 h-4 text-emerald-600 accent-emerald-600"
          />
          <label htmlFor="isActive" className="text-[14px] text-gray-700 font-[500] cursor-pointer">
            Is Active
          </label>
        </div>

        <div className="flex mt-3">
          <Button
            type="submit"
            disabled={isLoading}
            className="btn-g w-[160px]!"
            size="small"
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "PUBLISH & VIEW"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddBanner;
