import DbServices from '../services/dbServices';
import models from '../models';
import response from '../utils/response';
import messages from '../utils/messages';
import roles from '../utils/roles';

const { getById } = DbServices;
const { User } = models;
const { serverError, forbidden } = messages;

/**
 * @function authorize
 * @param {Array} permitedRoles the roles allowed to use the route
 * @returns {Object} decoded object
 * @description checks if the user is allowed to access the route
 */
const authorize = (permitedRoles) => async (req, res, next) => {
  try {
    const { id: userId } = req.decoded;
    const { roleId } = await getById(User, userId, { attributes: ['roleId'] });

    if (!permitedRoles.includes(roleId) || roleId !== roles.SUPER_ADMIN) {
      return response(res, 403, 'error', { message: forbidden });
    }

    return next();
  } catch (error) {
    return response(res, 500, 'error', { message: serverError });
  }
};

export default authorize;
