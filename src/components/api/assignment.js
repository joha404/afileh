import axios from "axios";
const API_BASE_URL = "https://aflieh-django.onrender.com/api";
const token = localStorage.getItem("access_token");

export const getAllAssignment = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cms/assignment/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch Assistant");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Assistant:", error);
    throw error;
  }
};
