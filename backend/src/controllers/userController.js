import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * Handles login request.
 * @returns {Object} - Response object with user data and token if login is successful
 */
export const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    return login(res, user);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Handle sign in request.
 * @returns {Object} - Response object with user data and token if sign in is successful
 */
export const handleSignIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username.toLowerCase() });

    if (user) {
      return res.status(400).json({ message: "User exists" });
    }
    return signIn(res, username, password);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Handle sign in request.
 * @returns {Object} - Response object with user data and token if sign in is successful
 */
export const handleGetUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the user" });
  }
};

/**
 * Logs in an existing user by generating a JWT token.
 * @param {Object} res - The response object to send back the result.
 * @param {Object} user - The user object with username and password.
 * @returns {Object} - Response object with user data and token
 */
const login = (res, user) => {
  const token = getToken(user.username, user._id);
  return res.status(200).json({
    _id: user._id,
    username: user.username,
    token: token,
  });
};

/**
 * Creates a new user with the provided username and hashed password.
 * @param {Object} res - The response object to send back the result.
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Object} - Response object with user data and token
 */
const signIn = async (res, username, password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    password: encryptedPassword,
  });
  const token = getToken(username, user._id);
  return res.status(201).json({
    _id: user._id,
    username: username,
    token: token,
  });
};

/**
 * Generates a JWT token using the provided username and userId.
 * @param {string} username - The username used in the token.
 * @param {string} userId - The userId used in the token.
 * @returns {string} - The JWT token generated.
 */
const getToken = (username, userId) => {
  const token = jwt.sign(
    {
      userId: userId,
      username,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
};
