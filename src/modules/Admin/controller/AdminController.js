/**
 * Admin controller handles all requests that has to do with admin
 *
 * - createAdminAccount - allow admins to create a new account
 * - loginAdmin - allow admins to login to their account
 * - getAdminProfile - allow admins to view their profile info
 * - updateAdminProfile - allow admins to update their profile info like firstname, lastname, email, password, phone
 * - changeAdminStatus - allow super admin to change admin status
 */

import bcrypt from 'bcryptjs';
import _ from 'lodash';
import { validateAdminAccount, validateAdminLogin } from '../../../middleware/validations';

const { Admin } = require('../../../database/models');
/**
 *
 *
 * @class CustomerController
 */
class AdminController {
  /**
   * create an admin record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, admin data and access token
   */
  static async createAdminAccount(req, res, next) {
    const { error } = validateAdminAccount(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      let admin = await Admin.findOne({ where: { phone: req.body.phone } });
      if (admin) return res.status(400).json('Account already exists');

      const { firstname, lastname, phone, password, email, address, role } = req.body;

      admin = Admin.build({
        firstname,
        lastname,
        phone,
        email,
        password,
        address,
        role,
      });

      const salt = await bcrypt.genSalt(16);
      admin.password = await bcrypt.hash(admin.password, salt);
      await admin.save();

      const token = admin.generateAuthToken();

      return res.header('x-auth-token', token).json({
        message: 'Successful, admin created!',
        data: _.pick(admin, ['admin_id', 'firstname', 'lastname', 'phone', 'role']),
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * login a admin
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, admin data and access token
   */
  static async loginAdmin(req, res, next) {
    const { error } = validateAdminLogin(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const admin = await Admin.findOne({ where: { email: req.body.email } });
      if (!admin) return res.status(400).json('Invalid email or password');

      const validPassword = await bcrypt.compare(req.body.password, admin.password);
      if (!validPassword) return res.status(400).json('Invalid email or password');

      if (admin.status === 'Suspended' || admin.status === 'Ban')
        return res.status(400).json('You are not allowed to access this system');

      const token = admin.generateAuthToken();

      return res.status(200).json({
        message: 'Welcome, Login successful!',
        token,
        data: _.pick(admin, ['admin_id', 'firstname', 'lastname', 'phone', 'email', 'role']),
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * show admin profile
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with admin profile data
   */
  static async getAdminProfile(req, res, next) {
    try {
      const admin = await Admin.findByPk(req.user.sub);
      if (!admin) return res.status(404).json('Account not found');

      return res.status(200).json({
        message: 'Success',
        data: admin,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * update admin profile data such as name, email, password, phone, address
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with admin profile data
   */
  static async updateAdminProfile(req, res, next) {
    try {
      const admin = await Admin.findByPk(req.user.customer_id);
      if (!admin) return res.status(404).json('Customer not found');

      const updatedAdminProfile = await admin.update(req.body);

      return res.status(200).json({
        message: 'Profile updated successfully',
        data: updatedAdminProfile,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * change admin status
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with admin profile data
   */
  static async changeAdminStatus(req, res, next) {
    const { status, adminId } = req.body;
    try {
      const admin = await Admin.findByPk(adminId);
      if (!admin) return res.status(404).json('Account not found');

      const updatedAccount = await admin.update({ status });

      return res.status(200).json({
        message: 'Successful, status changed',
        data: updatedAccount,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default AdminController;
