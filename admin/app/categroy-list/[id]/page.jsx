"use client";
import { MyContext } from "@/app/components/context/ThemeProvider";
import UploadBox from "@/app/components/UploadImage";
import { deleteImage, editData, fetchDatafromApi } from "@/app/utils/api";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useParams } from "next/navigation";
const EditSlide = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });
  const [preview, setPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    fetchDatafromApi(`/api/categroy/${id}`).then((res) => {
      setPreview(res?.categroy?.images || []);

      setFormFields({
        name: res?.categroy?.name || "",
        images: res?.categroy?.images || [],
      });
    });
  }, []);

  const setPreviewFun = (previewArr = []) => {
    console.log("Received:", previewArr);

    const imgArr = [...preview];

    for (let i = 0; i < previewArr.length; i++) {
      imgArr.push(previewArr[i]);
    }

    setPreview(imgArr);

    setTimeout(() => {
      setFormFields((prev) => ({
        ...prev,
        images: imgArr,
      }));
    }, 10);
  };
  const removeImg = (img, index) => {
    var imageArr = [];
    imageArr = preview;
    deleteImage(`/api/categroy/deleteImage?img=${img}`).then((res) => {
      imageArr.splice(index, 1);
      setPreview([]);

      setTimeout(() => {
        setFormFields((prev) => ({
          ...prev,
          images: imageArr,
        }));
      }, 10);
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log("SUBMIT CLICKED");
  //   console.log("formFields =", formFields);

  //   setIsLoading(true);

  //   postData("/api/categroy/add", formFields).then((res) => {
  //     console.log("ADD RESPONSE =", res);
  //     if (res?.error === false) {
  //       setTimeout(() => {
  //         setIsLoading(false);
  //         context?.alertBox("success", res?.message);
  //         router.push("/categroy-list");
  //       }, 2000);
  //     } else {
  //       context?.alertBox("error", res?.message);
  //       setIsLoading(false);
  //     }
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formFields.name,
      images: formFields.images,
    };

    console.log("PAYLOAD:", payload);

    editData(`/api/categroy/${id}`, payload)
      .then((res) => {
        console.log("ADD RESPONSE =", res);

        if (res?.error === false) {
          setTimeout(() => {
            setIsLoading(false);
            context?.alertBox("success", res?.message);
            router.push("/categroy-list");
          }, 2000);
        } else {
          context?.alertBox("error", res?.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        context?.alertBox("error", "Something went wrong");
        setIsLoading(false);
      });
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <section className="w-full py-3 px-5">
      <h2 className="text-[18px] text-gray-700 font-[600]">Edit Categroy</h2>

      <form
        className="mt-5 bg-white p-5 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-4 flex flex-col gap-1">
          <span className="text-[15px] text-gray-800">Categroy Name</span>
          <input
            type="text"
            className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] outline-none rounded-sm focus:border-[rgba(0,0,0,0.4)] px-3 text-[14px]"
            name="name"
            value={formFields.name}
            onChange={onChangeInput}
          ></input>
        </div>
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

                  {/* <UploadBox
                    multiple={false}
                    name="images"
                    url="/api/categroy/uploadImages"
                    setPreviewFun={setPreviewFun}
                  /> */}
                </div>
              );
            })}
          {/* <div className="w-[150px] h-[120px] rounded-md border border-[rgba(0,0,0,0.3)] flex items-center justify-center flex-col gap-2 relative overflow-hidden">
            <img
              src="/product.png"
              alt="product image"
              className="w-full h-full object-cover"
            />

            <span className="flex items-center justify-center bg-red-700 rounded-full w-6 h-6 absolute -top-[8px] -right-[8px] cursor-pointer">
              <IoMdClose size={20} className="text-white" />
            </span>
          </div> */}

          <UploadBox
            multiple={false}
            name="images"
            url="/api/categroy/uploadImages"
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

export default EditSlide;
