import { Router } from 'express';
import CustomerController from '../controller/CustomerController';
import verify from '../../../middleware/verify';

const router = Router();
router.post('/create', CustomerController.createCustomer);
router.post('/login', CustomerController.loginCustomer);
router.put('/', verify, CustomerController.updateCustomerProfile);
router.get('/', verify, CustomerController.getCustomerProfile);

export default router;
