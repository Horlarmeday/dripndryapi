/* eslint-disable camelcase */
/**
 * Order controller handles all requests that has to do with orders
 *
 * - createOrder -Create an order
 * - getAllOrders - Returns a paginated list of orders
 * - getOneOrder - Returns one order
 * - getOneCustomerOrders - Returns all orders of a customer
 * - getOrderSummary - Returns the details of an order
 * - changeOrderStatus - allow admin to change an order status
 * - processOrderPayment - process order payment
 */
import { generatedReference } from '../../../helpers/helper';
import { validateNewOrder } from '../../../middleware/validations';

const { Order, OrderDetail } = require('../../../database/models');

const db = require('../../../database/models/index');

/**
 *
 *
 * @class OrderController
 */
class OrderController {
  /**
   * create an order
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with new order data
   */
  static async createOrder(req, res, next) {
    const { error } = validateNewOrder(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const data = req.body;
    const orderDetails = data.data;

    try {
      const result = await db.sequelize.transaction(async t => {
        const order = await Order.create(
          {
            total_amount: data.total_amount,
            comments: data.comments,
            reference: generatedReference,
            customer_id: req.user.customer_id,
          },
          { transaction: t }
        );

        const newOrderDetail = orderDetails.map(detail => ({
          ...detail,
          order_id: order.order_id,
        }));

        await OrderDetail.bulkCreate(newOrderDetail, { transaction: t });

        return order;
      });
      return res.status(200).json({
        message: 'Success, order created',
        data: result,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all orders
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with all orders data
   */
  static async getAllOrders(req, res, next) {
    const { page } = req.query;
    try {
      const options = {
        page,
        paginate: 10,
        order: [['order_id', 'DESC']],
        include: [{ model: OrderDetail, as: 'orderItems' }],
      };
      const orders = await Order.paginate(options);
      return res.status(200).json({
        message: 'Success',
        data: orders,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get one order
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with one order data
   */
  static async getOneOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const order = await Order.findByPk(orderId, {
        include: [{ model: OrderDetail, as: 'orderItems' }],
      });

      if (!order) return res.status(404).json('Order not found');

      return res.status(200).json({
        message: 'Success',
        data: order,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get one customer order
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with one customer orders data
   */
  static async getOneCustomerOrders(req, res, next) {
    try {
      const options = {
        paginate: 3,
        order: [['order_id', 'DESC']],
        where: { customer_id: req.user.customer_id },
      };
      const orders = await Order.paginate(options);

      return res.status(200).json({
        message: 'Success',
        data: orders,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * change an order status
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with one customer orders data
   */
  static async changeOrderStatus(req, res, next) {
    const { orderId, status } = req.body;
    try {
      const order = await Order.findByPk(orderId);
      if (!order) return res.status(404).json('Order not found');

      const updatedOrder = await order.update({ status });
      if (!updatedOrder) return res.status(400).json('Error occurred');

      return res.status(200).json({
        message: 'Success, order status changed!',
        data: updatedOrder,
      });
    } catch (e) {
      return next(e);
    }
  }
}

export default OrderController;
