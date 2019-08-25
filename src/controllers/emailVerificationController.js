import jwt from 'jsonwebtoken';
import response from '../utils/response';
import '../config/env';
import models from '../models';

/**
 * mail controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 */

const verifyEmail = async (req, res) => {
  try {
    const { id } = await jwt.verify(req.params.token, process.env.SECRET_KEY);
    const userId = id;
    await models.User.update({ verified: true }, { where: { id: userId } });
  } catch (e) {
    const rescode = (e.name === 'JsonWebTokenError') ? 403 : 500;
    return response(res, rescode, 'error', {
      errors: e
    });
  }

  return res.redirect(process.env.SIGNIN_PAGE);
};
export default {
  verifyEmail
};
