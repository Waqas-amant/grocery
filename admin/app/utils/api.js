import axios from "axios";
import Cookies from "js-cookie";

const appUrl = process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:8000";
// console.log("ENV:", process.env.NEXT_PUBLIC_APP_API_URL);
export const postData = async (url, formData) => {
  try {
    const response = await fetch(appUrl + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ important for cookies
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    console.log("API Error:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const fetchDatafromApi = async (url) => {
  try {
    const token = Cookies.get("accessToken");
    const params = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      params.headers.Authorization = `Bearer ${token}`;
    }

    const { data } = await axios.get(`${appUrl}${url}`, params);

    return data;
  } catch (error) {
    console.log(error);
    return error.response?.data || error;
  }
};

export const uploadImages = async (url, updatedData) => {
  console.log("appUrl =", appUrl);
  console.log("url =", url);
  console.log("full URL =", appUrl + url);
  try {
    const token = Cookies.get("accessToken");
    const params = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    if (token) {
      params.headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.post(appUrl + url, updatedData, params);

    return response.data;
  } catch (error) {
    console.log(error);
    return (
      error.response?.data || {
        error: true,
        success: false,
        message: error.message || "Something went wrong",
      }
    );
  }
};
export const deleteImage = async (url, image) => {
  const response = await axios.delete(appUrl + url, {
    withCredentials: true,
    params: { img: image },
  });

  return response.data;
};

export const deleteData = async (url) => {
  const params = {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,

      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const response = await axios.delete(appUrl + url, params);

  return response.data;
};

export const editData = async (url, updatedData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,

      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const response = await axios.put(appUrl + url, updatedData, params);

  return response.data;
};
