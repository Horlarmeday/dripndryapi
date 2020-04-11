import Joi from '@hapi/joi';

export function validateCustomer(customer) {
  const schema = Joi.object({
    firstname: Joi.string()
      .min(4)
      .max(50)
      .required(),
    lastname: Joi.string()
      .min(4)
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
