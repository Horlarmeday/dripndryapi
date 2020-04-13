import { Router } from 'express';
import ProductController from '../controller/ProductController';
import verify from '../../../middleware/verify';

const router = Router();
router.post('/:serviceId/create', verify, ProductController.createNewProduct);
router.put('/:id', verify, ProductController.updateProduct);
router.get('/', ProductController.getAllProducts);
router.delete('/', ProductController.deleteProduct);

export default router;
