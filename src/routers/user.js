import express from "express";
import {
  getAllMember,
  getMemberDetail,
  getUserProfile,
  updateProfile,
  uploadAvatar,
} from "../controllers/user.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import multer from "multer";
import { isAdmin } from "../middlewares/isAdmin.js";

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

router.get("/userlist", authenticateToken, isAdmin, getAllMember);
router.get("/profile", authenticateToken, getUserProfile);
router.post("/profile/upload", upload.single("avatar"), uploadAvatar);
router.put("/profile/:id", updateProfile);

export default router;
