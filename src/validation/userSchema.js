import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';


const signUpSchema = Joi.object({
  email: JoiValidator.validateEmail().required(),
  password: JoiValidator.validatePassword().required(),
  firstName: JoiValidator.validateString().required(),
  lastName: JoiValidator.validateString().required(),
  phoneNo: JoiValidator.validateString().required(),
});


const signInSchema = Joi.object({
  email: JoiValidator.validateEmail().required(),
  password: JoiValidator.validatePassword().required(),
});

const updateUserSchema = Joi.object({
  firstName: JoiValidator.validateString().required(),
  lastName: JoiValidator.validateString().required(),
  phoneNo: JoiValidator.validateNumber().required(),
  gender: JoiValidator.validateString().required(),
  lineManager: JoiValidator.validateString().required(),
  birthDate: JoiValidator.validateDate().required(),
  preferredCurrency: JoiValidator.validateString().required(),
  preferredLanguage: JoiValidator.validateString().required(),
  currentLocation: JoiValidator.validateString().required(),
});

export {
  signUpSchema, signInSchema, updateUserSchema
};
