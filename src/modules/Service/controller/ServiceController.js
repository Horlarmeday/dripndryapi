/* eslint-disable camelcase */
/**
 * Service controller handles all requests that has to do with services
 *
 * - createNewService - allow admin to create a new service
 * - getAllServices - Returns a paginated list of services
 * - searchServices - Returns a list of services that matches the query string
 * - updateService - allow admin to edit and update a service
 * - deleteService - allow admin to delete a service
 * - getAllProductsInAService - Returns all products in a particular service
 */
import { validateNewService } from '../../../middleware/validations';

const { Service, Product } = require('../../../database/models');

/**
 *
 *
 * @class ServiceController
 */
class ServiceController {
  /**
   * create a service
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with service data
   */
  static async createNewService(req, res, next) {
    const { error } = validateNewService(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const { service_name, service_description } = req.body;

      const service = await Service.create({
        service_name,
        service_description,
      });

      return res.status(200).json({
        message: 'Service created successfully',
        data: service,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * getting all the services
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with all the paginated services data
   */
  static async getAllServices(req, res, next) {
    const {
      query: { page },
    } = req;

    try {
      const options = {
        page,
        paginate: 10,
        order: [['createdAt', 'DESC']],
        include: [{ model: Product, as: 'products' }],
      };
      const services = await Service.paginate(options);

      return res.status(200).json({
        message: 'Success',
        data: services,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * search all services
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and service data
   */
  static async searchServices(req, res, next) {
    const { all_words } = req.query;

    try {
      const services = await Service.findAll({
        where: {
          service_name: `${all_words}`,
        },
      });

      return res.status(200).json({
        message: 'Success, search results returned',
        data: services,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * update a service
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and service data
   */
  static async updateService(req, res, next) {
    try {
      const service = await Service.findByPk(req.params.id);
      if (!service) return res.status(404).json('Service not found');

      const updatedService = await service.update(req.body);

      return res.status(200).json({
        message: 'Service updated successfully',
        data: updatedService,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * delete a service
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and service data
   */
  static async deleteService(req, res, next) {
    try {
      const service = await Service.findByPk(req.body.service_id);
      if (!service) return res.status(404).json('Service not found');

      const deletedService = await service.destroy({ force: true });

      return res.status(200).json({
        message: 'Service successfully deleted',
        data: deletedService,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all products in a service
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and service products data
   */
  static async getAllProductsInAService(req, res, next) {
    try {
      const { serviceId } = req.params;
      const service = await Service.findByPk(serviceId, {
        include: [{ model: Product, as: 'products' }],
      });

      return res.status(200).json({
        message: 'Success',
        data: service,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default ServiceController;
