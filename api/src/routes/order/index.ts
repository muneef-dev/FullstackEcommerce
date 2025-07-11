import { Router } from 'express';
import { createOrder, getOrderById, getOrders, updateOrder, deleteOrder } from '../order/controller.js';
import { validateData } from '../../middleware/validation.js';
import { createOrderWithOrderItemSchema, updateOrderSchema } from "../../db/orderSchema.js";
import { verifyToken } from '../../middleware/auth.js';

const router = Router();

router.get('/', verifyToken, getOrders);
router.get('/:id', verifyToken, getOrderById);
router.post('/', verifyToken, validateData(createOrderWithOrderItemSchema), createOrder);
router.put('/:id', validateData(updateOrderSchema), updateOrder);
router.delete('/:id', deleteOrder);

export default router;