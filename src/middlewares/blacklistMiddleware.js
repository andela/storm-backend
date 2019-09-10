import response from '../utils/response';
import messages from '../utils/messages';
import stripBearerToken from '../utils/stripBearerToken';
import redis from '../config/redis';

/**
 * Token Blacklist Middleware
 * @param {Object} req - Express request object
 * @param {Oject} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - Returns Object
 */
const checkBlacklist = async (req, res, next) => {
  let token = req.headers.authorization;
  token = stripBearerToken(token);

  if (!token) {
    return response(res, 401, 'error', {
      message: messages.noToken
    });
  }

  try {
    const checkedToken = await redis.get(token);
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
