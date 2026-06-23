"use client";
import React, { useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import UploadBox from "@/app/components/UploadImage";
import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { deleteImage, fetchDatafromApi, postData } from "@/app/utils/api";
import { MyContext } from "@/app/components/context/ThemeProvider";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const context = useContext(MyContext);
  const router = useRouter();
  const [formfields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    catName: "",
    catId: "",
    categroy: "",
    stock: "",
    rating: "",
    isFeatured: "",
    discount: "",
  });

  const [preview, setPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categroyVal, setCategroyVal] = useState("");
  const [isFeatureVal, setIsFeatureVal] = useState("");
  const [value, setValue] = useState(1);

  const handleChangeCategroy = (event) => {
    const value = event.target.value;

    setCategroyVal(value);

    setFormFields((prev) => ({
      ...prev,
      catId: value,
      categroy: value,
    }));
  };
  const handleChangeFeatureVal = (event) => {
    const value = event.target.value;

    setIsFeatureVal(value);

    setFormFields((prev) => ({
      ...prev,
      isFeatured: value,
    }));
  };
  const onChangeInputs = (e) => {
    const { name, value } = e.target;

    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formfields.name.trim()) {
      context.alertBox("error", "Please enter the product name");
      return;
    }

    if (!formfields.description.trim()) {
      context.alertBox("error", "Please enter the product description");
      return;
    }

    if (!formfields.brand.trim()) {
      context.alertBox("error", "Please enter the product brand");
      return;
    }

    if (!formfields.price || Number(formfields.price) <= 0) {
      context.alertBox("error", "Please enter a valid product price");
      return;
    }

    if (!formfields.oldPrice || Number(formfields.oldPrice) <= 0) {
      context.alertBox("error", "Please enter a valid old price");
      return;
    }

    if (!formfields.catId) {
      context.alertBox("error", "Please select the product category");
      return;
    }

    if (!formfields.stock || Number(formfields.stock) < 0) {
      context.alertBox("error", "Please enter valid stock");
      return;
    }

    if (!formfields.rating) {
      context.alertBox("error", "Please select product rating");
      return;
    }

    if (formfields.isFeatured === "") {
      context.alertBox("error", "Please select featured option");
      return;
    }

    if (formfields.images.length === 0) {
      context.alertBox("error", "Please select the product image");
      return;
    }
    console.log(formfields);

    setIsLoading(true);

    postData("/api/product/create", formfields)
      .then((res) => {
        if (res?.error === false) {
          context.alertBox("success", res?.message);

          setTimeout(() => {
            setIsLoading(false);
            router.push("/products-list");
          }, 2000);
        } else {
          setIsLoading(false);
          context.alertBox("error", res?.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        context.alertBox("error", "Something went wrong");
      });
  };

  const setPreviewFun = (previewArr = []) => {
    console.log("Received:", previewArr);

    const imgArr = [...preview];

    for (let i = 0; i < previewArr.length; i++) {
      imgArr.push(previewArr[i]);
    }

    setPreview(imgArr);

    setTimeout(() => {
      formfields.images = imgArr;
    }, 10);
  };

  const selectCatByName = (catName) => {
    setFormFields((prev) => ({
      ...prev,
      catName: catName,
    }));
  };

  const [categroyData, setCategroyData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    fetchDatafromApi("/api/categroy").then((res) => {
      console.log(res);
      setCategroyData(res?.categories);
    });
  };

  const removeImg = (img, index) => {
    var imageArr = [];
    imageArr = preview;
    deleteImage(`/api/categroy/deleteImage?img=${img}`).then((res) => {
      imageArr.splice(index, 1);
      setPreview([]);

      setTimeout(() => {
        setPreview(imageArr);
        formfields.images = imageArr;
      }, 10);
    });
  };
  return (
    <div className="px-5 py-4">
      <div className="bg-white shadow-md rounded-md p-5">
        <h2 className="text-[18px] text-gray-700 font-[600]">Add Product</h2>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="form-group mb-4 flex flex-col gap-1">
            <span className="text-[15px] text-gray-800">Product Name</span>
            <input
              type="text"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] outline-none rounded-sm focus:border-[rgba(0,0,0,0.4)] px-3 text-[14px]"
              name="name"
              value={formfields.name}
              onChange={onChangeInputs}
            ></input>
          </div>
          <div className="form-group mb-4 flex flex-col gap-1">
            <span className="text-[15px] text-gray-800">
              Product Description
            </span>
            <textarea
              type="text"
              className="w-full h-[120px] border border-[rgba(0,0,0,0.2)] outline-none rounded-sm focus:border-[rgba(0,0,0,0.4)] px-3 py-3 text-[14px]"
              name="description"
              value={formfields.description}
              onChange={onChangeInputs}
            ></textarea>
          </div>
          <div className="grid grid-cols-4 gap-5">
            <div className="col flex flex-col gap-1">
              <span className="text-[15px] text-gray-800">Categroy</span>
              <Select
                value={categroyVal}
                onChange={handleChangeCategroy}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categroyData?.length !== 0 &&
                  categroyData?.map((cat, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={cat?._id}
                        onClick={() => selectCatByName(cat?.name)}
                      >
                        {cat?.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <div className="col flex flex-col gap-1">
              <span className="text-[15px] text-gray-800">Product Price</span>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] outline-none rounded-sm focus:border-[rgba(0,0,0,0.4)] px-3 text-[14px]"
                name="price"
                value={formfields.price}
                onChange={onChangeInputs}
              ></input>
            </div>
            <div className="col flex flex-col gap-1">
              <span className="text-[15px] text-gray-800">
                Product Old Price
              </span>
              <input
                type="number"
                className="w-full h-10 border border-[rgba(0,0,0,0.2)] outline-none rounded-sm focus:border-[rgba(0,0,0,0.4)] px-3 text-[14px]"
                name="oldPrice"
                value={formfields.oldPrice}
                onChange={onChangeInputs}
              ></input>
            </div>

            <div className="col flex flex-col gap-1">
              <span className="text-[15px] text-gray-800">Is Feature?</span>
              <Select
                value={isFeatureVal}
                onChange={handleChangeFeatureVal}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
            <div className="col flex flex-col gap-1">
              <span className="text-[15px] text-gray-800">Product Stock</span>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] outline-none rounded-sm focus:border-[rgba(0,0,0,0.4)] px-3 text-[14px]"
                name="stock"
                value={formfields.stock}
                onChange={onChangeInputs}
              ></input>
            </div>
            <div className="col flex flex-col gap-1">
              <span className="text-[15px] text-gray-800">Product Brand</span>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] outline-none rounded-sm focus:border-[rgba(0,0,0,0.4)] px-3 text-[14px]"
                name="brand"
                value={formfields.brand}
                onChange={onChangeInputs}
              ></input>
            </div>
            <div className="col flex flex-col gap-1">
              <span className="text-[15px] text-gray-800">
                Product Discount
              </span>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] outline-none rounded-sm focus:border-[rgba(0,0,0,0.4)] px-3 text-[14px]"
                name="discount"
                value={formfields.discount}
                onChange={onChangeInputs}
              ></input>
            </div>
            <div className="col flex flex-col gap-1">
              <span className="text-[15px] text-gray-800">Product Rating</span>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue || 1);

                  setFormFields((prev) => ({
                    ...prev,
                    rating: newValue || 1,
                  }));
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <h2 className="text-[16px] text-gray-700 font-[600]">
              Media & Images
            </h2>
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
                multiple={true}
                name="images"
                url="/api/product/uploadImages"
                setPreviewFun={setPreviewFun}
              />
            </div>
          </div>
          <br />
          <Button type="submit" className="btn-g !px-7">
            Publish & View
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
