import express from "express";
import { getAll } from "../controllers/category.js";

const router = express.Router();

router.get("/categories", getAll);

export default router;
