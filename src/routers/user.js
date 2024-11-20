import express from "express";
import { getUserProfile } from "../controllers/user.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

router.get("/profile", authenticateToken, getUserProfile);

// router.get("/user/:id", signin);
// router.post("/user", signin);
// router.put("/user/:id", signin);
// router.delete("/user/:id", signin);
// router.delete("users", signin);

export default router;
