import express from "express";
import { logout, signin, signup } from "../controllers/auth";
import { checkPreferences } from "joi";
import { checkPermission } from "../middlewares/checkPermision";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);

export default router;
