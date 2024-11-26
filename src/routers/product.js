import express from "express";
import { getAll, getId, queryCategory } from "../controllers/product.js";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/query", queryCategory);
router.get("/product", getId);

export default router;
