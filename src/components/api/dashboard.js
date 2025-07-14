import axios from "axios";

const API_BASE_URL = "https://aflieh-django.onrender.com/api";
const token = localStorage.getItem("access_token");

export const getDashboardData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cms/dashboard/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Assistant:", error);
    throw error;
  }
};
