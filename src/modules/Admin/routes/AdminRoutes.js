import { Router } from 'express';
import AdminController from '../controller/AdminController';
import verify from '../../../middleware/verify';
import { authorize } from '../../../middleware/authorize';
import Role from '../../../helpers/roles';

const router = Router();
router.post('/create', AdminController.createAdminAccount);
router.post('/login', AdminController.loginAdmin);
router.put(
  '/',
  verify,
  authorize([Role.SuperAdmin, Role.Admin]),
  AdminController.updateAdminProfile
);
router.put('/status', verify, authorize(Role.SuperAdmin), AdminController.changeAdminStatus);
router.get('/', verify, authorize([Role.SuperAdmin, Role.Admin]), AdminController.getAdminProfile);

export default router;
