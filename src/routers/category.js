import express from "express";
import { getAll, getNested } from "../controllers/category.js";

const router = express.Router();

router.get("/categories", getAll);
router.get("/categories/nested", getNested);

export default router;
