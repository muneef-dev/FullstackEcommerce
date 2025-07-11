import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { userTable } from "./userSchema";
import { productTable } from "./productSchema";
import {z} from 'zod';


export const orderTable = pgTable('orders', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default('New'),
  userId: integer().references(() => userTable.id).notNull(),
});

export const orderItemTable = pgTable('orderItems', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer().references(() => orderTable.id).notNull(),
  productId: integer().references(() => productTable.id).notNull(),
  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

export const createOrderSchema = createInsertSchema(orderTable).omit({
  userId: true,
  status: true,
  createdAt: true,
});

export const createOrderItemSchema = createInsertSchema(orderItemTable).omit({
  orderId: true
});

export const createOrderWithOrderItemSchema = z.object({
  // @ts-ignore
  order: createOrderSchema,
  // @ts-ignore
  items: z.array(createOrderItemSchema)
});

export const updateOrderSchema = createInsertSchema(orderTable).pick({
  status: true
});
