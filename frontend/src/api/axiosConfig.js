import axios from "axios";
import { store } from "store/store";

const baseURL = "http://192.168.0.27:3001"; // Change this to match your server's address

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    let token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // console.log(`token: ${token}`);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function getToken() {
  let token = store.getState().auth.userData.token;
  if (!token) {
    token = localStorage.getItem("userToken");
  }
  return token;
}

export default api;
