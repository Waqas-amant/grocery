"use client";
import UploadBox from "@/app/components/UploadImage";
import React, { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { MyContext } from "@/app/components/context/ThemeProvider";
import { deleteImage, postData } from "@/app/utils/api";
import { Button, CircularProgress } from "@mui/material";

const AddSlide = () => {
  const [formFields, setFormFields] = useState({
    images: [],
  });
  const [preview, setPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);
  const router = useRouter();

  const setPreviewFun = (previewArr = []) => {
    const imgArr = [...preview, ...previewArr];
    setPreview(imgArr);
    setFormFields((prev) => ({
      ...prev,
      images: imgArr,
    }));
  };

  const removeImg = (img, index) => {
    deleteImage(`/api/homeSlider/deleteImage?img=${img}`).then(() => {
      const imageArr = [...preview];
      imageArr.splice(index, 1);
      setPreview(imageArr);
      setFormFields((prev) => ({
        ...prev,
        images: imageArr,
      }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formFields.images?.length && !preview?.length) {
      context?.alertBox("error", "Please upload at least one image for the slide");
      return;
    }

    setIsLoading(true);

    const payload = {
      images: formFields.images.length > 0 ? formFields.images : preview,
    };

    postData("/api/homeSlider/add", payload)
      .then((res) => {
        setIsLoading(false);
        if (res?.success || res?.error === false) {
          context?.alertBox("success", res?.message || "Slide created successfully!");
          router.push("/home-slides");
        } else {
          context?.alertBox("error", res?.message || "Failed to create slide");
        }
      })
      .catch(() => {
        setIsLoading(false);
        context?.alertBox("error", "Something went wrong");
      });
  };

  return (
    <section className="w-full py-3 px-5">
      <h2 className="text-[18px] text-gray-700 font-[600]">Add Slide</h2>

      <form
        className="mt-5 bg-white p-5 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-[16px] text-gray-700 font-[600]">Media & Images</h2>
        <div className="flex items-center gap-4 mt-2">
          {preview?.length !== 0 &&
            preview.map((img, index) => {
              return (
                <div
                  key={index}
                  className="w-[150px] h-[120px] rounded-md border border-[rgba(0,0,0,0.3)] flex items-center justify-center flex-col gap-2 relative overflow-hidden"
                >
                  <img
                    src={img}
                    alt="slide image"
                    className="w-full h-full object-cover"
                  />

                  <span
                    className="flex items-center justify-center bg-red-700 rounded-full w-6 h-6 absolute -top-[8px] -right-[8px] cursor-pointer"
                    onClick={() => removeImg(img, index)}
                  >
                    <IoMdClose size={20} className="text-white" />
                  </span>
                </div>
              );
            })}

          <UploadBox
            multiple={false}
            name="images"
            url="/api/homeSlider/uploadImages"
            setPreviewFun={setPreviewFun}
          />
        </div>
        <div className="flex mt-3">
          <Button
            type="submit"
            disabled={isLoading || preview?.length === 0}
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

export default AddSlide;
