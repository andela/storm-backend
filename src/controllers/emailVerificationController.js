import response from '../utils/response';
import { verifyToken } from '../utils/authHelper';
import { updateById } from '../services/userServices';
import '../config/env';

/**
 * mail controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const verifyEmail = async (req, res) => {
  try {
    const { id } = await verifyToken(req.params.token);
    await updateById(id, { verified: true });
    return res.redirect(process.env.SIGNIN_PAGE);
  } catch (error) {
    const rescode = (error.name === 'JsonWebTokenError') ? 403 : 500;
    return response(res, rescode, 'error', { error });
  }
};

export default {
  verifyEmail
};
