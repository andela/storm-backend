import { Op } from 'sequelize';
import models from '../models';
import authHelper from '../utils/authHelper';
import response from '../utils/response';
import messages from '../utils/messages';
import {
  create, findByEmail, comparePasswords, findByEmailOrPhone
} from '../services/userServices';
import verifyEmailMessage from '../utils/templates/verifyEmailMessage';
import roleEmailMessage from '../utils/templates/roleEmailMessage';
import createTemplate from '../utils/createTemplate';
import sendMail from '../utils/sendMail';
import DbServices from '../services/dbServices';
import redis from '../config/redis';

const { User, Role } = models;
const { getById, update, getByOptions } = DbServices;
const {
  unauthorizedUserProfile, serverError, phoneExists, roleChanged,
} = messages;

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
    const link = `${process.env.BASE_URL}/api/v1/user/verify/${userData.user.token}`;
    const message = createTemplate(verifyEmailMessage, link);
    await sendMail(userData.user.email, 'VERIFY EMAIL', message);
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

/**
 * get user details by id
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 * @description get's details of logged in user
 */
const getUserDetailsById = async (req, res) => {
  try {
    const { userId } = req.params;
    const options = { attributes: { exclude: ['password'] } };
    const user = await getById(User, userId, options);
    return response(res, 200, 'success', { user });
  } catch (error) {
    return response(res, 500, 'error', { message: serverError });
  }
};

/**
 * update user details
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 * @description updates details of logged in user
 */
const updateUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id } = req.decoded;
    if (userId !== id) {
      return response(res, 403, 'error', { message: unauthorizedUserProfile });
    }
    const {
      firstName, lastName, phoneNo, birthDate, preferredLanguage,
      preferredCurrency, gender, lineManager, currentLocation
    } = req.body;
    const phoneNoExists = await getByOptions(User, {
      where: { id: { [Op.not]: userId }, phoneNo }
    });
    if (phoneNoExists) return response(res, 409, 'error', { message: phoneExists });
    const userInfo = {
      firstName,
      lastName,
      phoneNo,
      birthDate,
      preferredLanguage,
      preferredCurrency,
      gender,
      lineManager,
      currentLocation
    };
    const options = { returning: true, where: { id: userId } };
    const updatedUser = await update(User, userInfo, options);
    const { email, roleId, updatedAt } = updatedUser[1][0];
    return response(res, 202, 'success', {
      updatedUser: {
        id, email, roleId, updatedAt, ...userInfo
      }
    });
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};

/**
 * set user role
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 * @description set user role
 */
const setUserRole = async (req, res) => {
  try {
    const { role: type } = req.body;
    const { id: roleId } = await getByOptions(Role, { where: { type }, attributes: ['id'] });

    const { userId: staffId } = req.params;
    const options = { returning: true, where: { id: staffId } };
    const [, [{ email: staffEmail }]] = await update(User, { roleId }, options);

    const message = createTemplate(roleEmailMessage, type);
    await sendMail(staffEmail, 'User Role Set', message);
    return response(res, 200, 'success', { message: `${roleChanged} ${type}` });
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};

export default {
  signUp,
  signIn,
  logout,
  getUserDetailsById,
  updateUserDetails,
  setUserRole,
};
