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

export default {
  requestTripSchema
};
