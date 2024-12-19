import express from "express";
import {
  createCategory,
  deleteCategory,
  getAll,
  getNested,
  updateCategory,
} from "../controllers/category.js";
// import { authenticateToken } from "../middlewares/authenticateToken.js";
// import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/categories", getAll);
router.get("/categories/nested", getNested);
router.post("/category", createCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

export default router;
