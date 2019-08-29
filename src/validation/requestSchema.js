import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const requestTripSchema = Joi.object({
  type: JoiValidator.validateString().valid('one-way', 'return').required(),
  originCity: JoiValidator.validateString().required(),
  destinationCity: JoiValidator.validateString().required(),
  departureDate: JoiValidator.validateDate().required().when('returnDate', {
    is: Joi.required(),
    then: Joi.date().less(Joi.ref('returnDate')),
  }),
  returnDate: JoiValidator.validateDate().when('type', {
    is: Joi.valid('return'),
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  reason: JoiValidator.validateString().required(),
  accommodation: JoiValidator.validateString().required(),
});

const getUserRequestSchema = Joi.object({
  userId: JoiValidator.validateUuidV4().required(),
  page: Joi.number().min(1),
  perPage: Joi.number().min(1)
});

export default {
  requestTripSchema,
  getUserRequestSchema
};
