// "use client";
// import React, { useContext, useState } from "react";
// import { FaRegImage } from "react-icons/fa";
// import { MyContext } from "../context/ThemeProvider";
// import { uploadImages } from "@/app/utils/api";
// import CircularProgress from "@mui/material/CircularProgress";

// const UploadBox = (props) => {
//   console.log("props =", props);
//   console.log("props.url =", props?.url);
//   const [preview, setPreview] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const context = useContext(MyContext);

//   let selectImage = [];
//   const formData = new FormData();

//   const onChangeFile = async (el, apiEndPoint) => {
//     const files = el.target.files;
//     console.log(el);
//     setUploading(true);
//     try {
//       setPreview([]);
//       for (let i = 0; i < files.length; i++) {
//         if (
//           files[i] &&
//           (files[i].type === "image/jpeg" ||
//             files[i].type === "image/png" ||
//             files[i].type === "image/webp" ||
//             files[i].type === "image/svg+xml")
//         ) {
//           const file = files[i];

//           selectImage.push(file);
//           formData.append(props?.name, file);
//         } else {
//           context?.alertBox(
//             "error",
//             "Please select valid image type JPG, PNG, WEBP, SVG",
//           );

//           setUploading(false);
//           return false;
//         }
//       }
//       uploadImages(apiEndPoint, formData).then((res) => {
//         setUploading(false);

//         if (res?.error || res?.success === false) {
//           context?.alertBox("error", res?.message || "Failed to upload image");
//         } else {
//           context?.alertBox("success", "Image uploaded successfully!");

//           props.setPreviewFun(res?.images);

//           console.log(res);
//           console.log(res.images);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="w-[150px] h-[120px] rounded-md text-gray-100 p-5 border border-dashed border-[rgba(0,0,0,0.3)] flex items-center justify-center flex-col gap-2 relative uploadBox">
//       {uploading === true ? (
//         <>
//           <div className="flex flex-col items-center justify-between">
//             <CircularProgress />
//             <span>loading....</span>
//           </div>
//         </>
//       ) : (
//         <>
//           <FaRegImage size={40} className="text-gray-400" />
//           <span className="text-gray-600 text-[13px]">Upload Image</span>
//           <input
//             type="file"
//             accept="image/*"
//             className="absolute top-0 left-0 w-full h-full z-50 opacity-0"
//             onChange={(e) => onChangeFile(e, props?.url)}
//             name={props?.name}
//             multiple={props?.multiple !== undefined ? props?.multiple : false}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default UploadBox;

"use client";
import React, { useContext, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { MyContext } from "../context/ThemeProvider";
import { uploadImages } from "@/app/utils/api";

const UploadBox = ({ name, url, setPreviewFun }) => {
  const [uploading, setUploading] = useState(false);
  const context = useContext(MyContext);

  const onChangeFile = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();

    const validFiles = files.filter((file) =>
      ["image/jpeg", "image/png", "image/webp", "image/svg+xml"].includes(
        file.type,
      ),
    );

    if (validFiles.length !== files.length) {
      context.alertBox("error", "Invalid file type");
      return;
    }

    validFiles.forEach((file) => {
      formData.append(name, file);
    });

    setUploading(true);

    const res = await uploadImages(url, formData);

    setUploading(false);

    if (res?.success === false || res?.error) {
      context.alertBox("error", res.message);
    } else {
      context.alertBox("success", "Uploaded");
      setPreviewFun(res.images);
    }
  };

  return (
    <div className="w-[150px] h-[120px] border flex items-center justify-center relative">
      {uploading ? (
        <CircularProgress />
      ) : (
        <>
          <FaRegImage />
          <input
            type="file"
            multiple
            accept="image/*"
            className="absolute w-full h-full opacity-0"
            onChange={onChangeFile}
          />
        </>
      )}
    </div>
  );
};

export default UploadBox;
