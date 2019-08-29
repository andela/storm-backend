import models from '../models';
import response from '../utils/response';
import messages from '../utils/messages';
import DbServices from '../services/dbServices';
import { calculateLimitAndOffset, paginate } from '../utils/pagination';

const { Request } = models;
const { serverError, unauthorizedUserRequest, noRequests } = messages;
const { create, getAll } = DbServices;

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

/**
 * request trip controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const getUserRequest = async (req, res) => {
  try {
    const { params, decoded, query } = req;
    const { userId } = params;
    if (userId !== decoded.id) {
      return response(res, 403, 'error', { message: unauthorizedUserRequest });
    }
    const { page, perPage } = query;
    const { limit, offset } = calculateLimitAndOffset(page, perPage);
    const options = { where: { userId }, limit, offset };
    const { rows, count } = await getAll(Request, options);
    if (rows.length === 0) return response(res, 200, 'success', { message: noRequests });
    const meta = paginate(page, perPage, count, rows);
    return response(res, 200, 'success', { requests: rows, meta });
  } catch (error) {
    return response(res, 500, 'error', serverError);
  }
};

export default {
  requestTrip,
  getUserRequest
};
