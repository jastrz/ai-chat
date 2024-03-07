import api from "api/axiosConfig";

async function postSignIn(username, password, repeatPassword) {
  try {
    const response = await api.post("/signin", {
      username,
      password,
      repeatPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
}

async function postLogin(username, password) {
  try {
    const response = await api.post("/login", { username, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error;
  }
}

export { postSignIn, postLogin };
