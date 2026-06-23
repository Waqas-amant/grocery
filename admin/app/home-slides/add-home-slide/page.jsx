"use client";
import UploadBox from "@/app/components/UploadImage";
import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import { useRouter } from "next/navigation";
import { MyContext } from "@/app/components/context/ThemeProvider";
import { deleteImage, fetchDatafromApi, postData } from "@/app/utils/api";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { getFlightDataPartsFromPath } from "next/dist/client/flight-data-helpers";
const AddSlide = () => {
  const [formFields, setFormFields] = useState({
    images: [],
  });
  const [preview, setPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);
  const router = useRouter();

  const setPreviewFun = (previewArr = []) => {
    console.log("Received:", previewArr);

    const imgArr = [...preview];

    for (let i = 0; i < previewArr.length; i++) {
      imgArr.push(previewArr[i]);
    }

    setPreview(imgArr);

    setTimeout(() => {
      formFields.images = imgArr;
    }, 10);
  };
  const removeImg = (img, index) => {
    var imageArr = [];
    imageArr = preview;
    deleteImage(`/api/homeSlider/deleteImage?img=${img}`).then((res) => {
      imageArr.splice(index, 1);
      setPreview([]);

      setTimeout(() => {
        setPreview(imageArr);
        formFields.images = imageArr;
      }, 10);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("SUBMIT CLICKED");
    console.log("formFields =", formFields);

    setIsLoading(true);

    postData("/api/homeSlider/add", formFields).then((res) => {
      console.log("ADD RESPONSE =", res);

      setTimeout(() => {
        setIsLoading(false);
        router.push("/home-slides");
      }, 2000);
    });
  };
  //   e.preventDefault();
  //   setIsLoading(true);
  //   postData("/api/homeSlider/add", formFields).then((res) => {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //       router.push("/home-slides");
  //     }, 2000);
  //   });
  // };
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
                    alt="product image"
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
            disabled={preview?.length > 0 ? false : true}
            className="btn-g w-[150px]!"
            size="small"
          >
            {isLoading === true ? <CircularProgress /> : "PUBLISH & VIEW"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddSlide;
