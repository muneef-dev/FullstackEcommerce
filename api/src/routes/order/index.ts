import { Router } from 'express';
import { createOrder, getOrderById, getOrders } from '../order/controller';
import { validateData } from '../../middleware/validation';
import { createOrderWithOrderItemSchema } from "../../db/orderSchema";
import { verifyToken } from '../../middleware/auth';

const router = Router();

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', verifyToken, validateData(createOrderWithOrderItemSchema), createOrder);
router.put('/:id', createOrder);
router.delete('/:id', createOrder);

export default router;