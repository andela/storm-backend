import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const validateRequiredString = JoiValidator.validateString().required();
const tripTypeSchema = JoiValidator.validateString().valid('one-way', 'return');

const requestTripSchema = Joi.object({
  type: tripTypeSchema.required(),
  originCity: validateRequiredString,
  destinationCity: validateRequiredString,
  departureDate: JoiValidator.compareDate('returnDate').required(),
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
  userId: JoiValidator.validateUuidV4(),
  page: JoiValidator.validateNumber().min(1),
  perPage: JoiValidator.validateNumber().min(1)
});

const searchRequestTripSchema = Joi.object({
  page: JoiValidator.validateNumber().min(1),
  perPage: JoiValidator.validateNumber().min(1),
  approvalStatus: JoiValidator.validateString().valid('accepted', 'rejected'),
  multiCity: JoiValidator.validateBoolean(),
  type: tripTypeSchema,
  originCity: JoiValidator.validateAlphabet(),
  destinationCity: JoiValidator.validateAlphabet(),
  departureDate: JoiValidator.validateDate(),
  reason: JoiValidator.validateAlphabet(),
  accommodation: JoiValidator.validateAlphabet(),
}).min(1);

const requestIdSchema = Joi.object({
  requestId: JoiValidator.validateString().uuid().required()
});


export default {
  requestTripSchema,
  getUserRequestSchema,
  searchRequestTripSchema,
  requestIdSchema
};
