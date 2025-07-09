const API_BASE_URL = "https://api.vapi.ai/call/";
const API_BASE_URL2 = "https://aflieh-django.onrender.com/api/";
// const token = "5a75e46b-15c6-4a55-b4ca-15be8210357d";
const getAuthHeaders = () => {
  const token = "5a75e46b-15c6-4a55-b4ca-15be8210357d";
  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
// Get all Calls
const token = localStorage.getItem("access_token");
export const getAllCalls = async () => {
  try {
    const response = await fetch(`${API_BASE_URL2}cms/call-log/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch Call Log");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Call Log:", error);
    throw error;
  }
};
// Get Call by ID
export const getCallById = async (id) => {
  const token = "5a75e46b-15c6-4a55-b4ca-15be8210357d";

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch call");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching call:", error);
    throw error;
  }
};

// Get LeaderBoard

export const getLeaderBoard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL2}cms/leaderboard/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch LeaderBoard");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching LeaderBoard:", error);
    throw error;
  }
};
