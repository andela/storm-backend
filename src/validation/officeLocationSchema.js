import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const validateRequiredString = JoiValidator.validateString().required();

const createLocationSchema = Joi.object({
  name: validateRequiredString,
  description: JoiValidator.validateString(),
  address: validateRequiredString,
  phoneNo: validateRequiredString,
  latitude: validateRequiredString,
  longitude: validateRequiredString
});

const getLocationByIdSchema = Joi.object({
  locationId: JoiValidator.validateString().uuid().required()
});

export default {
  createLocationSchema,
  getLocationByIdSchema
};
