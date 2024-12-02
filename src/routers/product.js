import express from "express";
import {
  getAll,
  getDisscounted,
  getId,
  getProductByCategory,
  queryCategory,
} from "../controllers/product.js";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/query", queryCategory);
router.get("/products/disscount", getDisscounted);
router.get("/product", getId);
router.get("/products/catlist", getProductByCategory);

export default router;
