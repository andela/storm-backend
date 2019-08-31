import models from '../models';
import response from '../utils/response';
import DbServices from '../services/dbServices';
import { calculateLimitAndOffset, paginate } from '../utils/pagination';
import findRequest from '../services/requestServices';
import messages from '../utils/messages';
import { findById } from '../services/userServices';
import { createNotification } from '../services/notificationServices';

const { Request, Subrequest } = models;
const { serverError, unauthorizedUserRequest, noRequests } = messages;
const { create, getAll, bulkCreate } = DbServices;

/**
 * request trip controller
 * @param {Object} userId - user id
 * @param {Object} trip - trip data
 * @returns {Object} - saved trip
*/
const createTrip = async (userId, {
  type, originCity, destinationCity, departureDate, returnDate, reason, accommodation, subRequest
}) => {
  let trip;
  if (!subRequest) {
    trip = await create(Request, {
      type, originCity, destinationCity, departureDate, returnDate, reason, accommodation, userId
    });
  } else {
    const requestedTrip = await create(Request, {
      // eslint-disable-next-line max-len
      type, originCity, destinationCity, departureDate, reason, accommodation, multiCity: true, userId,
    });
    const subRequestWithRequestId = subRequest.map((sub) => ({
      requestId: requestedTrip.id,
      originCity: sub.subTripOriginCity,
      destinationCity: sub.subTripDestinationCity,
      departureDate: sub.subTripDepartureDate,
      reason: sub.subTripReason,
      accommodation: sub.subTripAccommodation
    }));
    const subRequestedTrips = await bulkCreate(Subrequest, subRequestWithRequestId);
    trip = { requestedTrip, subRequestedTrips };
  }
  return trip;
};

/**
 * request trip controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const requestTrip = async (req, res) => {
  try {
    const { id: userId } = req.decoded;
    const {
      type, originCity, destinationCity, departureDate, returnDate, reason,
      accommodation, subRequest
    } = req.body;

    const trip = await createTrip(userId, {
      // eslint-disable-next-line max-len
      type, originCity, destinationCity, departureDate, returnDate, reason, accommodation, subRequest
    });

    const sender = await findById(userId);
    if (sender.lineManager) {
      const receiver = await findById(sender.lineManager);
      await createNotification({
        sender, receiver, type: 'newRequest', ref: subRequest ? trip.requestedTrip.id : trip.id
      });
    }

    return response(res, 201, 'success', trip);
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
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

/* search requested trip and approval trip controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @param {Object} next - server response
 * @returns {Object} - custom response
 */
const searchRequest = async (req, res) => {
  try {
    const { body, query } = req;
    const { page, perPage } = query;
    const { rows, count } = await findRequest(body, query);
    const meta = paginate(page, perPage, count, rows);
    return response(res, 200, 'success', { requests: rows, meta });
  } catch (error) {
    return response(res, 400, 'error', { message: messages.error });
  }
};

export default {
  requestTrip,
  getUserRequest,
  searchRequest
};
