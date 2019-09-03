import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';


const chatPostSchema = Joi.object({
  message: JoiValidator.validateString().required(),
});

export default {
  chatPostSchema
};
