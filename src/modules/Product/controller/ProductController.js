/* eslint-disable camelcase */
/**
 * Product controller handles all requests that has to do with services
 *
 * - createNewProducts - allow admin to create a new product
 * - getAllProducts - Returns a paginated list of product
 * - updateProduct - allow admin to edit and update a product
 * - deleteProduct - allow admin to delete a product
 * - getAllServiceProducts - Returns all products in a particular service
 */

import { validateNewProduct } from '../../../middleware/validations';

const { Product } = require('../../../database/models');
/**
 *
 *
 * @class ProductController
 */
class ProductController {
  /**
   * create a product
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with product data
   */
  static async createNewProduct(req, res, next) {
    const { error } = validateNewProduct(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const { product_name, service_charge, description, image } = req.body;
      const { serviceId } = req.params;
      const product = await Product.create({
        product_name,
        service_charge,
        description,
        image,
        service_id: serviceId,
      });

      return res.status(200).json({
        message: 'Product created successfully',
        data: product,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all products
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with products data
   */

  static async getAllProducts(req, res, next) {
    const { page } = req.query;
    try {
      const options = {
        page,
        paginate: 10,
        order: [['service_id', 'DESC']],
      };
      const products = await Product.paginate(options);

      return res.status(200).json({
        message: 'Success',
        data: products,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * update a product
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with updated product data
   */
  static async updateProduct(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json('Product not found');

      const updatedProduct = await product.update(req.body);

      return res.status(200).json({
        message: 'Product updated successfully',
        data: updatedProduct,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * update a product
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with updated product data
   */
  static async deleteProduct(req, res, next) {
    try {
      const product = await Product.findByPk(req.body.product_id);
      if (!product) return res.status(404).json('Product not found');

      const deletedProduct = await product.destroy({ force: true });

      return res.status(200).json({
        message: 'Product successfully deleted',
        data: deletedProduct,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default ProductController;
