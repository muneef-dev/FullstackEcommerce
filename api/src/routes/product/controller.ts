import { Request, Response } from "express"; // node also has Request and Response but dont use that.
import { db } from "../../db/index";
import { productTable } from "../../db/productSchema";
import { eq } from "drizzle-orm";

// controller responsibility is to specify what happens or how do we handle a request (error handling etc)

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productTable);
    res.json(products);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [product] = await db
      .select()
      .from(productTable)
      .where(eq(productTable.id, Number(id)));

    if (!product) {
      res.send(404).send({ message: "Product not found" });
    }
    res.json(product);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(productTable)
      .values(req.body)
      .returning();
    res.status(201).json(product);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.body;
    const [product] = await db
      .update(productTable)
      .set(updatedFields)
      .returning();

    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: "Product was not found" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const product = await db
      .delete(productTable)
      .where(eq(productTable.id, id));
    if (product) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "Product was not found" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
