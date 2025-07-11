import { Request, Response } from "express";
import { db } from "../../db/index";
import { orderItemTable, orderTable } from "../../db/orderSchema";
import { eq } from "drizzle-orm";

// if req.role is admin, return all orders
// if req.role is seller, return orders by sellerId
// else, return only orders filtered by req.userId
export async function getOrders(req: Request, res: Response) {
  try {
    const orders = await db.select().from(orderTable);
    res.status(200).json(orders);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    // TODO: required to setup the relationship (refer drizzle doc (query relation))
    // const result = await db.query.ordersTable.findFirst({
    //   where: eq(ordersTable.id, id),
    //   with: {
    //     items: true,
    //   },
    // });
    const orderWithItems = await db
      .select()
      .from(orderTable)
      .where(eq(orderTable.id, id))
      .leftJoin(orderItemTable, eq(orderTable.id, orderItemTable.orderId));
    if (orderWithItems.length == 0) {
      res.status(404).send("Order not found");
    }
    const mergedOrder = {
      ...orderWithItems[0].orders,
      items: orderWithItems.map((oi) => oi.orderItems),
    };
    res.status(200).json(mergedOrder);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function createOrder(req: Request, res: Response) {
  try {
    const { order, items } = req.cleanBody;
    const userId = req.userId;
    if (!userId) {
      res.status(400).json({ message: "Invalid order data" });
    }
    const [newOrder] = await db
      .insert(orderTable)
      // @ts-ignore
      .values({ userId: userId })
      .returning();
    // todo: validate products ids, and take their actual price from db
    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
    }));
    const newOrderItem = await db
      .insert(orderItemTable)
      .values(orderItems)
      .returning();
    res.status(201).json({ ...newOrder, items: newOrderItem });
  } catch (e) {
    res.status(400).json({ message: "Invalid order data" });
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const [order] = await db
      .update(orderTable)
      .set(req.cleanBody)
      .where(eq(orderTable.id, id))
      .returning();
    if (!order) {
      res.status(404).send("Order not found");
    } else {
      res.status(200).json(order);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deleteOrder(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const [order] = await db
      .delete(orderTable)
      .where(eq(orderTable.id, id))
      .returning();
    if (!order) {
      res.status(404).send("Order not found");
    } else {
      res.status(200).json(order);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
