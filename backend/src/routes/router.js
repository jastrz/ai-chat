import express from "express";
import { router as llamaRouter } from "./llamaRoutes.js";
import { router as sdRouter } from "./sdRoutes.js";
import { router as userRouter } from "./userRoutes.js";
import { router as historyRouter } from "./historyRoutes.js";

const router = express.Router();

router.use("/llama", llamaRouter);
router.use("/sd", sdRouter);
router.use("/auth", userRouter);
router.use("/history", historyRouter);

export { router };
