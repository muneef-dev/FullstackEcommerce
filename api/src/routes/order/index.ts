import { Router } from 'express';
import { createOrder, getOrderById, getOrders, updateOrder, deleteOrder } from '../order/controller';
import { validateData } from '../../middleware/validation';
import { createOrderWithOrderItemSchema, updateOrderSchema } from "../../db/orderSchema";
import { verifyToken } from '../../middleware/auth';

const router = Router();

router.get('/', verifyToken, getOrders);
router.get('/:id', verifyToken, getOrderById);
router.post('/', verifyToken, validateData(createOrderWithOrderItemSchema), createOrder);
router.put('/:id', validateData(updateOrderSchema), updateOrder);
router.delete('/:id', deleteOrder);

export default router;