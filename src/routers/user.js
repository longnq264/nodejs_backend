import express from "express";
import { getUserProfile, uploadAvatar } from "../controllers/user.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/profile", authenticateToken, getUserProfile);
router.post("/profile/upload", upload.single("avatar"), uploadAvatar);

export default router;
