import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const requestTripSchema = Joi.object({
  type: JoiValidator.validateString().valid('one-way', 'return').required(),
  originCity: JoiValidator.validateString().required(),
  destinationCity: JoiValidator.validateString().required(),
  departureDate: JoiValidator.validateDate().required(),
  returnDate: JoiValidator.validateDate().allow(''),
  reason: JoiValidator.validateString().required(),
  accommodation: JoiValidator.validateString().required(),
});

export default {
  requestTripSchema
};
