/**
 * Customer controller handles all requests that has to do with customer
 *
 * - createCustomer - allow customers to create a new account
 * - loginCustomer - allow customers to login to their account
 * - getCustomerProfile - allow customers to view their profile info
 * - updateCustomerProfile - allow customers to update their profile info like firstname, lastname, email, password, phone
 * - addDebitCard - allow customers to add their debit card
 */
import bcrypt from 'bcryptjs';
import _ from 'lodash';
import { validateCustomer, validateCustomerLogin } from '../../../middleware/validations';

const { Customer } = require('../../../database/models');

/**
 *
 *
 * @class CustomerController
 */
class CustomerController {
  /**
   * create a customer record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, customer data and access token
   */
  static async createCustomer(req, res, next) {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      let customer = await Customer.findOne({ where: { phone: req.body.phone } });
      if (customer) return res.status(400).json('Customer already exists');

      const { firstname, lastname, phone, password, email } = req.body;

      customer = Customer.build({
        firstname,
        lastname,
        phone,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(16);
      customer.password = await bcrypt.hash(customer.password, salt);
      await customer.save();

      const token = customer.generateAuthToken();

      return res.header('x-auth-token', token).json({
        message: 'Successful, registration!',
        data: _.pick(customer, ['customer_id', 'firstname', 'lastname', 'phone']),
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * login a customer
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, customer data and access token
   */
  static async loginCustomer(req, res, next) {
    const { error } = validateCustomerLogin(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const customer = await Customer.findOne({ where: { phone: req.body.phone } });
      if (!customer) return res.status(400).json('Invalid phone number or password');

      const validPassword = await bcrypt.compare(req.body.password, customer.password);
      if (!validPassword) return res.status(400).json('Invalid phone number or password');

      const token = customer.generateAuthToken();

      return res.status(200).json({
        message: 'Login successful!',
        token,
        data: _.pick(customer, ['customer_id', 'firstname', 'lastname', 'phone', 'email']),
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * show customer profile
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with customer profile data
   */
  static async getCustomerProfile(req, res, next) {
    try {
      const customer = await Customer.findByPk(req.user.customer_id);
      if (!customer) return res.status(404).json('The customer with this Id does not exists');

      return res.status(200).json({
        message: 'Success',
        data: customer,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * update customer profile data such as name, email, password, phone, address, country, state, city
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with customer profile data
   */
  static async updateCustomerProfile(req, res, next) {
    try {
      const customer = await Customer.findByPk(req.user.customer_id);
      if (!customer) return res.status(404).json('Customer not found');

      const updatedCustomerProfile = await customer.update(req.body);

      return res.status(200).json({
        message: 'Profile updated successfully',
        data: updatedCustomerProfile,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default CustomerController;
