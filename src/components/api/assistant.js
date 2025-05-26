const API_BASE_URL = "https://api.vapi.ai/assistant";
const token = "5a75e46b-15c6-4a55-b4ca-15be8210357d";

// Get all Assistant
export const getAllAssistant = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
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

// Get Assistant by ID
export const getAssistantById = async (id) => {
  const token = "5a75e46b-15c6-4a55-b4ca-15be8210357d";

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
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
