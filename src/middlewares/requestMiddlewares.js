import response from '../utils/response';
import messages from '../utils/messages';
import DbServices from '../services/dbServices';
import models from '../models';
import roles from '../utils/roles';

const { User, Request } = models;
const { findOneIncludeModel, getById } = DbServices;
const { serverError, forbidden } = messages;

export const verifyRequestLineManager = async (req, res, next) => {
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
   * @method checkRequestId
   * @param {object} req request object
   * @param {object} res request object
   * @param {function} next next function
   * @returns {object} custom response
   * @description checks if requestId passed is valid
   */
export const checkRequestId = async (req, res, next) => {
  try {
    const { requestId } = { ...req.params, ...req.body, ...req.query };
    if (requestId) {
      const request = await getById(Request, requestId, {});
      if (!request) {
        return response(res, 404, 'error', { message: messages.requestNotFoundId });
      }
      req.payload = { ...req.payload, request };
      return next();
    }
    return next();
  } catch (error) {
    return response(res, 500, 'error', { message: messages.serverError });
  }
};

/**
 * @function canAccessRequest
 * @param {object} req request object
 * @param {object} res request object
 * @param {function} next next function
 * @returns {Object} response object
 * @description checks if the user is allowed to access a request
 */
export const canAccessRequest = async (req, res, next) => {
  try {
    const { payload, decoded } = req;
    const { request } = payload;
    const { id: ownerId, roleId: ownerRoleId } = decoded;
    const { userId } = request;
    if (userId === ownerId || ownerRoleId === roles.SUPER_ADMIN) {
      return next();
    }

    const { lineManager: requestUserLineManager } = await getById(User, userId, {
      attributes: ['lineManager']
    });
    if (ownerId === requestUserLineManager) {
      return next();
    }

    return response(res, 403, 'error', { message: forbidden });
  } catch (error) {
    return response(res, 500, 'error', { message: serverError });
  }
};
