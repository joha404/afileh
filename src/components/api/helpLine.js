import axios from "axios";
const API_BASE_URL = "https://aflieh-django.onrender.com/api";

export const SendMessage = async (data) => {
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("No access token found");
      throw new Error("No access token found");
    }

    const response = await axios.post(`${API_BASE_URL}/cms/help-line/`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error sending message:", error);

    throw error;
  }
};
