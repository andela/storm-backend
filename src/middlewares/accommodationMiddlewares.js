import response from '../utils/response';
import messages from '../utils/messages';
import DbServices from '../services/dbServices';
import models from '../models';

const { Accommodation } = models;
const { getById } = DbServices;

/**
   * @method checkAccommodationId
   * @param {object} req request object
   * @param {object} res request object
   * @param {function} next next function
   * @returns {object} custom response
   * @description checks if accommodationId passed to params is valid
   */
export const checkAccommodationId = async (req, res, next) => {
  try {
    const { accommodationId } = req.params;
    if (accommodationId) {
      const accommodation = await getById(Accommodation, accommodationId, {});
      if (!accommodation) {
        return response(res, 404, 'error', { message: messages.notExistAccommodation });
      }
      return next();
    }
    return next();
  } catch (error) {
    return response(res, 500, 'error', { message: messages.serverError });
  }
};
