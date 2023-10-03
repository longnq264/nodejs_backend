import express from "express";
import { create, getAll, getID, remove, update } from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermision";

const router = express.Router();
router.get("/products", getAll);
router.get("/product/:id", getID);
router.post("/product", create);
router.put("/product/:id", update);
router.delete("/product/:id", remove);
export default router;
