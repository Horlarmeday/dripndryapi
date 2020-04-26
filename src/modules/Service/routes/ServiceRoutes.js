import { Router } from 'express';
import ServiceController from '../controller/ServiceController';
import verify from '../../../middleware/verify';
import { authorize } from '../../../middleware/authorize';
import Role from '../../../helpers/roles';

const router = Router();
router.post(
  '/create',
  verify,
  authorize([Role.Admin, Role.SuperAdmin]),
  ServiceController.createNewService
);
router.put(
  '/:id',
  verify,
  authorize([Role.Admin, Role.SuperAdmin]),
  ServiceController.updateService
);
router.get('/', verify, ServiceController.getAllServices);
router.get('/:serviceId', verify, ServiceController.getAllProductsInAService);
router.get('/search', verify, ServiceController.searchServices);
router.delete(
  '/',
  verify,
  authorize([Role.Admin, Role.SuperAdmin]),
  ServiceController.deleteService
);

export default router;
