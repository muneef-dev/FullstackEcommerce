import { Request, Response } from "express";
import { db } from "../../db/index";
import { orderItemTable, orderTable } from "../../db/orderSchema";

export async function getOrders(req: Request, res: Response) {
  res.status(200).json("getOrders");
}

export async function getOrderById(req: Request, res: Response) {
  res.status(200).json("getOrderById");
}

export async function createOrder(req: Request, res: Response) {
  try {
    const {order, items} = req.cleanBody;
    const userId = req.userId;
    if (!userId) {
    res.status(400).json({ message: "Invalid order data" });
    }
    // @ts-ignore
    const [newOrder] = await db.insert(orderTable).values({userId: userId}).returning();
    // todo: validate products ids, and take their actual price from db
    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id
    }));
    const newOrderItem = await db.insert(orderItemTable).values(orderItems).returning();
    res.status(201).json({ ...newOrder, items: newOrderItem });
  } catch (e) {
    res.status(400).json({ message: "Invalid order data" });
  }
}
