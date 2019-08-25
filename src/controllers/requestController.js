import models from '../models';
import response from '../utils/response';
import messages from '../utils/messages';
import DbServices from '../services/dbServices';

const { Request } = models;
const { serverError } = messages;
const { create } = DbServices;

/**
 * request trip controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const requestTrip = async (req, res) => {
  try {
    const { body, decoded } = req;
    const { id: userId } = decoded;
    const {
      type, originCity, destinationCity, departureDate, returnDate, reason, accommodation
    } = body;

    const tripToBeRequested = {
      type,
      originCity,
      destinationCity,
      departureDate,
      returnDate,
      reason,
      accommodation,
      userId,
    };

    const requestedTrip = await create(Request, tripToBeRequested);

    return response(res, 201, 'success', requestedTrip);
  } catch (error) {
    return response(res, 500, 'error', {
      message: serverError,
    });
  }
};

export default {
  requestTrip,
};
