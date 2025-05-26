import axios from "axios";
const API_BASE_URL = "https://aflieh-django.onrender.com/api";
const token = localStorage.getItem("access_token");

export const SignUpUser = async (data) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await axios.post(`${API_BASE_URL}/signup/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.error(
      "Error signing up user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const SignInUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signin/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { access_token, refresh_token } = response.data.data || {};

    if (access_token) {
      localStorage.setItem("access_token", access_token);
    }

    if (refresh_token) {
      localStorage.setItem("refresh_token", refresh_token);
    }

    return response;
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
};

export const GetSingleUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("===================", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching single user:", error);
    throw error;
  }
};
export const GetOneUser = async (currentEmail) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user/single/?email=${encodeURIComponent(currentEmail)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("===================", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching single user:", error);
    throw error;
  }
};
