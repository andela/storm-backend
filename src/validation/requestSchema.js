import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const validateRequiredString = JoiValidator.validateString().required();

const requestTripSchema = Joi.object({
  type: JoiValidator.validateString().valid('one-way', 'return').required(),
  originCity: validateRequiredString,
  destinationCity: validateRequiredString,
  departureDate: JoiValidator.validateDate().required().when('returnDate', {
    is: Joi.required(),
    then: Joi.date().less(Joi.ref('returnDate')),
  }),
  returnDate: JoiValidator.validateDate().when('type', {
    is: Joi.valid('return'),
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  reason: validateRequiredString,
  accommodation: validateRequiredString,
  subRequest: JoiValidator.validateArray()
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
