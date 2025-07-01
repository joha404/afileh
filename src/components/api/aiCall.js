import axios from "axios";
const API_BASE_URL = "https://aflieh-django.onrender.com/api";
const token = localStorage.getItem("access_token");

export const CreateAiCall = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cms/ai-caller/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error Creating AI call:", error);
    throw error;
  }
};
