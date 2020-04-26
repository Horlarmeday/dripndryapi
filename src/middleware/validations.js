import Joi from '@hapi/joi';

export function validateCustomer(customer) {
  const schema = Joi.object({
    firstname: Joi.string()
      .min(3)
      .max(50)
      .required(),
    lastname: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    phone: Joi.string()
      .min(11)
      .required(),
  });
  return schema.validate(customer);
}

export function validateCustomerLogin(customer) {
  const schema = Joi.object({
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    phone: Joi.string()
      .min(11)
      .required(),
  });
  return schema.validate(customer);
}

export function validateNewService(service) {
  const schema = Joi.object({
    service_name: Joi.string()
      .max(50)
      .required(),
    service_description: Joi.string()
      .max(255)
      .optional()
      .allow(''),
  });
  return schema.validate(service);
}

export function validateNewProduct(product) {
  const schema = Joi.object({
    product_name: Joi.string()
      .max(50)
      .required(),
    service_charge: Joi.number().required(),
    description: Joi.string()
      .max(255)
      .optional()
      .allow(''),
    image: Joi.string()
      .max(255)
      .optional()
      .allow(''),
  });
  return schema.validate(product);
}

export function validateNewOrder(order) {
  const schema = Joi.object({
    total_amount: Joi.number().required(),
    comments: Joi.string()
      .max(255)
      .optional()
      .allow(''),
    data: Joi.array()
      .items(Joi.object())
      .required(),
  });
  return schema.validate(order);
}

export function validateAdminAccount(admin) {
  const schema = Joi.object({
    firstname: Joi.string()
      .min(3)
      .max(50)
      .required(),
    lastname: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    phone: Joi.string()
      .min(11)
      .required(),
    address: Joi.string()
      .max(100)
      .required(),
    role: Joi.string().required(),
  });
  return schema.validate(admin);
}

export function validateAdminLogin(admin) {
  const schema = Joi.object({
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    email: Joi.string()
      .email()
      .min(5)
      .max(255)
      .required(),
  });
  return schema.validate(admin);
}
