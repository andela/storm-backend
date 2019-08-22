import Redis from 'ioredis';
import response from '../utils/response';
import messages from '../utils/messages';

const redis = new Redis();

/**
 * Token Blacklist Middleware
 * @param {Object} req - Express request object
 * @param {Oject} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - Returns Object
 */
const checkBlacklist = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
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
      errors: e
    });
  }
};

export default checkBlacklist;
