import axios from "axios";

const API_BASE_URL = "https://aflieh-django.onrender.com/api";
const token = localStorage.getItem("access_token");

export const getAllAssignment = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cms/assignment/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // axios automatically parses JSON
  } catch (error) {
    console.error("Error fetching Assistant:", error);
    throw error;
  }
};
