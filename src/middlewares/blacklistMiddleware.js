import response from '../utils/response';
import messages from '../utils/messages';
import stripBearerToken from '../utils/stripBearerToken';
import models from '../models';

const { Tokenblacklist } = models;

/**
 * Token Blacklist Middleware
 * @param {Object} req - Express request object
 * @param {Oject} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - Returns Object
 */
const checkBlacklist = async (req, res, next) => {
  const { id } = req.decoded;
  let token = req.headers.authorization;
  token = stripBearerToken(token);

  try {
    const checkedToken = await Tokenblacklist.findOne({ where: { userId: id, token } });
    if (checkedToken) {
      return response(res, 500, 'error', {
        message: messages.blacklisted
      });
    }
    next();
  } catch (e) {
    return response(res, 500, 'error', {
      errors: e.toString()
    });
  }
};

export default checkBlacklist;
