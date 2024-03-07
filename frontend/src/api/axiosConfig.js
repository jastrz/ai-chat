import axios from "axios";

const baseURL = "http://192.168.0.27:3001"; // Change this to match your server's address

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;