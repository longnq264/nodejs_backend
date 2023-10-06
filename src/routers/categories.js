import express from "express";
import { create, getAll, getID, remove, update } from "../controllers/category";

const router = express.Router();

router.get("/categories", getAll);
router.get("/category/:id", getID);
// router.get("/category-product", getProductfromCat)
router.post("/category", create);
router.put("/category/:id", update);
router.delete("/category/:id", remove);
export default router;
