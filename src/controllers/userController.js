
import models from '../database/models';
import authHelper from '../utils/authHelper';
import response from '../utils/response';
import create from '../services/dbServices';

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
      firstName,
      lastName,
      email,
      phoneNo,
      password
    };
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
    return response(res, 500, 'error', {
      errors: e
    });
  }
};

export default {
  signUp
};
