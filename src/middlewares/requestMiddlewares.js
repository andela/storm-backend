import response from '../utils/response';
import messages from '../utils/messages';
import DbServices from '../services/dbServices';
import models from '../models';

const { User, Request } = models;
const { findOneIncludeModel, getById } = DbServices;

const verifyRequestLineManager = async (req, res, next) => {
  try {
    const { id: loggedInUserId } = req.decoded;
    const { requestId } = req.params;
    const table2 = {
      model: User,
      alias: 'User',
      column: { lineManager: loggedInUserId }
    };
    const data = await findOneIncludeModel(Request, requestId, table2);
    const { dataValues: { User: { dataValues: requester }, ...request } } = data;
    const isManager = loggedInUserId === data.User.lineManager;
    if (!isManager) return response(res, 401, 'error', { message: messages.unauthorized });
    req.request = request;
    req.requester = requester;
    next();
  } catch (error) {
    return response(res, 500, 'error', {
      errors: error.message
    });
  }
};

/**
   * @method checkUserId
   * @param {object} req request object
   * @param {object} res request object
   * @param {function} next next function
   * @returns {object} custom response
   * @description checks if userId passed to params is valid
   */
export const checkRequestId = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    if (requestId) {
      const request = await getById(Request, requestId, {});
      if (!request) {
        return response(res, 404, 'error', { message: messages.requestNotFoundId });
      }
      return next();
    }
    return next();
  } catch (error) {
    return response(res, 500, 'error', { message: messages.serverError });
  }
};

export default verifyRequestLineManager;
