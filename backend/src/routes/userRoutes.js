import express from "express";
import Joi from "joi";
import verifyToken from "../middleware/auth.js";

import {
  handleLogin,
  handleSignIn,
  handleGetUser,
} from "../controllers/userController.js";

const router = express.Router();

// Sign in routes
const loginSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

const signInSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  repeatPassword: Joi.string().valid(Joi.ref("password")).required(),
});

const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      console.log(result.error.details[0].message);
      return res.status(400).json({
        error: result.error.details[0].message,
      });
    }
    next();
  };
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       '200':
 *         description: Successful login
 *       '400':
 *         description: Bad request
 */
router.post("/login", validateRequest(loginSchema), handleLogin);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *               password:
 *                 type: string
 *                 minLength: 6
 *               repeatPassword:
 *                 type: string
 *                 enum: [password]
 *     responses:
 *       '200':
 *         description: Successful sign in
 *       '400':
 *         description: Bad request
 */
router.post("/signin", validateRequest(signInSchema), handleSignIn);

/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Get user route
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful retrieval of user data
 *       '401':
 *         description: Unauthorized
 */

router.get("/user", verifyToken, handleGetUser);

export { router };
