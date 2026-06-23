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
    const params = {
      withCredentials: true,

      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${appUrl}${url}`, params);

    return data;
  } catch (error) {
    console.log(error);
    return error.response?.data || error;
  }
};
