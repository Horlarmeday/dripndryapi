import { Router } from 'express';
import ProductController from '../controller/ProductController';
import verify from '../../../middleware/verify';
import { authorize } from '../../../middleware/authorize';
import Role from '../../../helpers/roles';

const router = Router();
router.post(
  '/:serviceId/create',
  verify,
  authorize([Role.SuperAdmin, Role.Admin]),
  ProductController.createNewProduct
);
router.put(
  '/:id',
  verify,
  authorize([Role.SuperAdmin, Role.Admin]),
  ProductController.updateProduct
);
router.get('/', authorize([Role.SuperAdmin, Role.Admin]), ProductController.getAllProducts);
router.delete('/', authorize([Role.SuperAdmin, Role.Admin]), ProductController.deleteProduct);

export default router;
