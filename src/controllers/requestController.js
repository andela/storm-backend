import models from '../models';
import response from '../utils/response';
import messages from '../utils/messages';
import DbServices from '../services/dbServices';
import { calculateLimitAndOffset, paginate } from '../utils/pagination';

const { Request, Subrequest } = models;
const { serverError, unauthorizedUserRequest, noRequests } = messages;
const { create, getAll, bulkCreate } = DbServices;

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
      type, originCity, destinationCity, departureDate, returnDate, reason,
      accommodation, subRequest
    } = body;

    let trip = {};

    if (!subRequest) {
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
      trip = requestedTrip;
    } else {
      const tripToBeRequested = {
        type,
        originCity,
        destinationCity,
        departureDate,
        reason,
        accommodation,
        multiCity: true,
        userId,
      };

      const requestedTrip = await create(Request, tripToBeRequested);

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
    return response(res, 201, 'success', trip);
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
