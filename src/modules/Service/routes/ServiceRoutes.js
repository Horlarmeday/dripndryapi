import { Router } from 'express';
import ServiceController from '../controller/ServiceController';
import verify from '../../../middleware/verify';

const router = Router();
router.post('/create', verify, ServiceController.createNewService);
router.put('/:id', verify, ServiceController.updateService);
router.get('/', verify, ServiceController.getAllServices);
router.get('/:serviceId', verify, ServiceController.getAllProductsInAService);
router.get('/search', verify, ServiceController.searchServices);
router.delete('/', verify, ServiceController.deleteService);

export default router;
