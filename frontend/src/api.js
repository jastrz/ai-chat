import axios from "axios";

const baseURL = "http://192.168.0.27:3001"; // Change this to match your server's address

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const askQuestion = async (prompt) => {
  try {
    const response = await api.post("/ask", { prompt });
    return response.data.answer;
  } catch (error) {
    console.error("Error asking question:", error);
    throw error;
  }
};

const askForImage = async (requestData) => {
  try {
    const response = await api.post("/getImage", requestData);
    return response.data;
  } catch (error) {
    console.error("Error asking for image:", error);
    throw error;
  }
};

export { askQuestion, askForImage };
