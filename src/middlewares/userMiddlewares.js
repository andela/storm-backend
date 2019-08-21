import jwt from 'jsonwebtoken';
import models from '../database/models';
import DbServices from '../services/dbServices';
import response from '../utils/response';
import messages from '../utils/messages';

const { User } = models;
const { getById } = DbServices;
const {
  invalidToken, noToken
} = messages;

/**
 * @method verifyToken
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {Object} response object
 */
// eslint-disable-next-line import/prefer-default-export
export const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    const [, jwtToken] = token.split(' ');
    token = jwtToken;
  }
  try {
    if (token) {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const user = await getById(User, decoded.id, {});
      if (!user) {
        return response(res, 401, 'error', { message: invalidToken });
      }
      req.decoded = decoded;
      return next();
    }
    return response(res, 401, 'error', { message: noToken });
  } catch (error) {
    return response(res, 500, 'error', error);
  }
};
