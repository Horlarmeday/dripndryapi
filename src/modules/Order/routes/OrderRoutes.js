import { Router } from 'express';
import OrderController from '../controller/OrderController';
import verify from '../../../middleware/verify';
import { authorize } from '../../../middleware/authorize';
import Role from '../../../helpers/roles';

const router = Router();
router.post('/create', verify, OrderController.createOrder);
router.put('/', verify, authorize(Role.Admin, Role.SuperAdmin), OrderController.changeOrderStatus);
router.get('/', verify, OrderController.getAllOrders);
router.get('/one', verify, OrderController.getOneCustomerOrders);
router.get('/:orderId', verify, OrderController.getOneOrder);

export default router;
