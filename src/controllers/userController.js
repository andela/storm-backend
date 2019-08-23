import Redis from 'ioredis';
import authHelper from '../utils/authHelper';
import response from '../utils/response';
import messages from '../utils/messages';
import {
  create, findByEmail, comparePasswords, findByEmailOrPhone
} from '../services/userServices';

/**
 * user signup controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 */
const signUp = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password, phoneNo
    } = req.body;
    const user = {
      firstName, lastName, email, phoneNo, password
    };

    const exists = await findByEmailOrPhone(email, phoneNo);
    if (exists) return response(res, 400, 'error', { message: 'Email address or phone number already in use' });

    const createdUser = await create(user);
    const userData = {
      user: {
        id: createdUser.id,
        email: createdUser.email,
        token: authHelper.generateToken({ id: createdUser.id }),
      }
    };

    return response(res, 200, 'success', userData);
  } catch (error) {
    return response(res, 500, 'error', { errors: error.message });
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

/**
 * User logout Function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - custom response
 */

const logout = async (req, res) => {
  const redis = new Redis();
  const token = req.headers.authorization.split(' ')[1];

  try {
    await redis.set(token, token, 'EX', 604800000);
    return response(res, 200, 'success', { message: messages.loggedOut });
  } catch (e) {
    return response(res, 500, 'error', {
      errors: e
    });
  }
};

export default {
  signUp,
  signIn,
  logout
};
