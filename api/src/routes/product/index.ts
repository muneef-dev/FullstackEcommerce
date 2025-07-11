import { Router } from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../product/controller.js";
// import { z } from "zod";
import { validateData } from "../../middleware/validation.js";
import { verifyToken, verifySeller } from "../../middleware/auth.js";
// import { createInsertSchema } from "drizzle-zod";
import { createProductSchema, updateProductSchema, productTable } from "../../db/productSchema.js";

// in router will add validation and middlewares
// router just connect things 
// product endpoints

// const createProductSchema = z.object({
//   name: z.string(),
//   price: z.number(), // z.number({message: 'price should be number'}) it will show in the error message
// }); // lets use drizzle-zod to automate the process

// const createProductSchema = createInsertSchema(productTable); // moved to productSchema

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
// @ts-ignore
router.post("/", verifyToken, verifySeller, validateData(createProductSchema) , createProduct);
router.put("/:id", verifyToken, verifySeller,validateData(updateProductSchema), updateProduct);
router.delete("/:id", verifyToken, verifySeller, deleteProduct);

export default router;