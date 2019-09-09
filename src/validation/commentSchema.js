import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';


const createCommentSchema = Joi.object({
  requestId: JoiValidator.validateUuidV4().required(),
  content: JoiValidator.validateString().required(),
});

const getCommentsSchema = Joi.object({
  requestId: JoiValidator.validateUuidV4().required(),
  page: JoiValidator.validateNumber().min(1),
  perPage: JoiValidator.validateNumber().min(1),
});

export default {
  createCommentSchema,
  getCommentsSchema,
};
