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

  /**
   * date schema creator
   * @returns {Object} - date schema
  */
  validateDate() {
    return Joi.date();
  },

  /**
   * number schema creator
   * @returns {Object} - number schema
  */
  validateNumber() {
    return Joi.number().required();
  }
};

export default JoiValidation;
