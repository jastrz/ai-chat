import api from "api/axiosConfig";

/**
 * Sign in with a username and password.
 * @param {string} username - The username to sign in with.
 * @param {string} password - The password to sign in with.
 * @param {string} repeatPassword - The repeated password for confirmation.
 * @returns {Promise} - Resolves with the response data if successful.
 * @throws {Error} - Throws an error if sign in fails.
 */
async function postSignIn(username, password, repeatPassword) {
  try {
    const response = await api.post("/auth/signin", {
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

/**
 * Login with a username and password.
 * @param {string} username - The username to login with.
 * @param {string} password - The password to login with.
 * @returns {Promise} - Resolves with the response data if successful.
 * @throws {Error} - Throws an error if login fails.
 */
async function postLogin(username, password) {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error;
  }
}

/**
 * Get user data after login.
 * @returns {Promise} - Resolves with the user data if successful.
 * @throws {Error} - Throws an error if fetching user data fails.
 */
async function getUserData() {
  try {
    const response = await api.get("/auth/user");
    return response.data.user;
  } catch (error) {
    console.error("Error getting userData: ", error);
    throw error;
  }
}
export { postSignIn, postLogin, getUserData };
