import Joi from '@hapi/joi';
import response from '../utils/response';

export default (schema) => (req, res, next) => {
  if (!schema) return next();

  const { body, params, query } = req;

  Joi.validate({ ...body, ...params, ...query }, schema, {
    abortEarly: false,
    stripUnknown: true,
    allowUnknown: true
  }).then(() => next())
    .catch((err) => {
      const errors = {};
      err.details.forEach((e) => {
        errors[e.message.split(' ', 1)[0].replace(/['"]/g, '')] = e.message.replace(/['"]/g, '');
      });
      return response(res, 400, 'error', errors);
    });
};
