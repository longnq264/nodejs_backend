import express from "express";
import { getUserProfile } from "../controllers/user.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

router.get("/profile", authenticateToken, getUserProfile);

export default router;
