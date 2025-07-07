import { Router } from "express";
import {
  getProduts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} from "./productController";
// in router will add validation and middlewares
// router just connect things 
// product endpoints
const router = Router();

router.get("/", getProduts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;