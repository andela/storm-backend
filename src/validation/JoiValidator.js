import Joi from '@hapi/joi';

/** *
 *  Object that help to validate user details
 */
const JoiValidation = {

  validateString() {
    return Joi.string();
  },

  validateEmail() {
    return Joi.string().email();
  },

  validatePassword() {
    return Joi.string().min(8).strict()
      .required();
  },
};

export default JoiValidation;
