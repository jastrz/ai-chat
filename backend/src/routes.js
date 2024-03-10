import express from "express";
import Joi from "joi";

import {
  handleChatPrompt,
  handleGetLlamaModels,
  handleUpdateLlamaSettings,
  handleGetLlamaSettings,
} from "./controllers/llamaController.js";

import {
  handleImagePrompt,
  handleGetImageGenProgress,
  handleGetSDModels,
  handlePostOptions,
  handleGetOptions,
} from "./controllers/sdController.js";

import { handleLogin, handleSignIn } from "./controllers/userController.js";

import {
  handleGetHistory,
  handleGetHistoryList,
} from "./controllers/historyController.js";

const router = express.Router();

// Llama routes
router.get("/llamaModelList", handleGetLlamaModels);
router.get("/llamaSettings", handleGetLlamaSettings);
router.post("/updateLlamaSettings", handleUpdateLlamaSettings);
router.post("/ask", handleChatPrompt);

// SD routes
router.get("/sdModelList", handleGetSDModels);
router.get("/imageGenProgress", handleGetImageGenProgress);
router.post("/getImage", handleImagePrompt);
router.post("/sdOptions", handlePostOptions);
router.get("/sdOptions", handleGetOptions);

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
      return res.status(400).json({
        error: result.error.details[0].message,
      });
    }
    next();
  };
};

router.post("/login", validateRequest(loginSchema), handleLogin);
router.post("/signin", validateRequest(signInSchema), handleSignIn);

// History routes

router.post("/historyList", handleGetHistoryList);
router.post("/history", handleGetHistory);

export { router };
