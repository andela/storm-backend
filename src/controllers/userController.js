
import models from '../database/models';
import authHelper from '../utils/authHelper';
import response from '../utils/response';
import messages from '../utils/messages';
import create from '../services/dbServices';
import { findByEmail, comparePasswords } from '../services/userServices';

const { User } = models;

/**
   * user signup controller
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {Object} - custom response
   */

const signUp = async (req, res) => {
  const {
    firstName, lastName, email, password, phoneNo
  } = req.body;
  try {
    const user = {
      firstName, lastName, email, phoneNo, password
    };

    const emailExists = await findByEmail(email);
    if (emailExists) return response(res, 400, 'error', { message: messages.emailExists });

    const createdUser = await create(User, user);

    const userData = {
      user: {
        id: createdUser.id,
        email: createdUser.email,
        token: authHelper.generateToken({ id: createdUser.id }),
      }
    };

    return response(res, 200, 'success', userData);
  } catch (e) {
    return response(res, 500, 'error', { errors: e });
  }
};

/**
 * user signin controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);
    if (!user) return response(res, 404, 'error', { message: messages.userNotFound });
    const { password: hash, ...data } = user.dataValues;
    const passwordsMatch = await comparePasswords(password, hash);
    if (!passwordsMatch) return response(res, 400, 'error', { message: messages.incorrectPassword });
    const token = authHelper.generateToken({ id: data.id });
    return response(res, 200, 'success', { ...data, token });
  } catch (error) {
    response(res, 500, 'error', { error: error.message });
  }
};

export default {
  signUp,
  signIn,
};
