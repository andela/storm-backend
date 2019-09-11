import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const validateRequiredString = JoiValidator.validateString().required();
const tripTypeSchema = JoiValidator.validateString().valid('one-way', 'return');
const validNum = JoiValidator.validateNumber().min(1);

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

const subrequestTripSchema = Joi.object({
  requestId: JoiValidator.validateUuidV4().required(),
  originCity: validateRequiredString,
  destinationCity: validateRequiredString,
  departureDate: JoiValidator.validateDate().required(),
  reason: validateRequiredString,
  accommodation: validateRequiredString
});

const getUserRequestSchema = Joi.object({
  userId: JoiValidator.validateUuidV4(),
  approvalStatus: JoiValidator.validateString().valid('accepted', 'rejected', 'pending'),
  page: validNum,
  perPage: validNum
});

const searchRequestTripSchema = Joi.object({
  page: validNum,
  perPage: validNum,
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
  subrequestTripSchema,
  getUserRequestSchema,
  searchRequestTripSchema,
  requestIdSchema,
};
