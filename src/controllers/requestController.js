import models from '../models';
import response from '../utils/response';
import roles from '../utils/roles';
import DbServices from '../services/dbServices';
import { calculateLimitAndOffset, paginate } from '../utils/pagination';
import { findRequest } from '../services/requestServices';
import messages from '../utils/messages';
import { findById } from '../services/userServices';
import { createNotification } from '../services/notificationServices';
import addOrCreateCounter from '../services/mostDestinationServices';
import notificationTypes from '../utils/notificationTypes';

const { Request, Subrequest, User } = models;
const {
  serverError, unauthorizedUserRequest, noRequests, acceptedTripRequest, rejectedTripRequest
} = messages;
const {
  create, getAll, bulkCreate, update
} = DbServices;

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
    const sender = await findById(userId);
    if (!sender.lineManager) return response(res, 403, 'error', { message: 'You have not been assigned to a line manager' });
    const {
      type, originCity, destinationCity, departureDate, returnDate, reason,
      accommodation, subRequest
    } = req.body;

    const trip = await createTrip(userId, {
      // eslint-disable-next-line max-len
      type, originCity, destinationCity, departureDate, returnDate, reason, accommodation, subRequest
    });

    const receiver = await findById(sender.lineManager);
    await createNotification({
      sender,
      receiver,
      type: notificationTypes.NEW_REQUEST,
      ref: subRequest ? trip.requestedTrip.id : trip.id
    });

    return response(res, 201, 'success', trip);
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};

/**
 * @function getUserRequest
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const getUserRequest = async (req, res) => {
  try {
    const { decoded: { id, roleId }, query: { page, perPage, userId, approvalStatus } } = req;
    if (userId && (userId !== id && roleId !== roles.SUPER_ADMIN)) {
      return response(res, 403, 'error', { message: unauthorizedUserRequest });
    }
    const { limit, offset } = calculateLimitAndOffset(page, perPage);
    const options = { where: { userId: userId || id }, order: [['updatedAt', 'ASC']], limit, offset };
    if (approvalStatus) {
      options.where.approvalStatus = approvalStatus;
    }
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

/**
 * @function getManagerRequest
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const getManagerRequest = async (req, res) => {
  try {
    const { decoded: { id, roleId }, query: { page, perPage, userId } } = req;
    if (userId && (userId !== id && roleId !== roles.SUPER_ADMIN)) {
      return response(res, 403, 'error', { message: unauthorizedUserRequest });
    }
    const { limit, offset } = calculateLimitAndOffset(page, perPage);
    const options = {
      where: { approvalStatus: 'pending' },
      include: [{
        model: User,
        as: 'User',
        where: { lineManager: userId || id },
        attributes: ['id', 'lineManager'],
      }],
      limit,
      offset
    };
    const { rows, count } = await getAll(Request, options);
    if (rows.length === 0) return response(res, 200, 'success', { message: noRequests });
    const meta = paginate(page, perPage, count, rows);
    return response(res, 200, 'success', { requests: rows, meta });
  } catch (error) {
    return response(res, 500, 'error', serverError);
  }
};

/**
 * reject request controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const updateApprovalStatus = async (req, res) => {
  try {
    let approvalStatusValue, approvalStatusMessage;
    const { requestId } = req.params;
    const { id: userId } = req.decoded;
    const options = { returning: true, where: { id: requestId } };
    const [, action] = req.url.match(/\/requests\/([a-z]+).*/);
    switch (action) {
      case 'accept':
        approvalStatusValue = 'accepted';
        approvalStatusMessage = acceptedTripRequest;
        break;
      case 'reject':
        approvalStatusValue = 'rejected';
        approvalStatusMessage = rejectedTripRequest;
        break;
      default:
        break;
    }
    const updateColumn = { approvalStatus: approvalStatusValue };
    await update(Request, updateColumn, options);
    const manager = await findById(userId);
    await createNotification({
      sender: manager,
      receiver: req.requester,
      type: action === 'accept' ? notificationTypes.APPROVED_REQUEST : notificationTypes.REJECTED_REQUEST,
      ref: requestId
    });
    if (approvalStatusValue === 'accepted') {
      await addOrCreateCounter(requestId);
    }
    return response(res, 201, 'success', { message: approvalStatusMessage });
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};

/**
 * update request controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const updateTripRequest = async (req, res) => {
  try {
    const {
      request, requestType, body, params: { requestId }
    } = req;
    const data = body;
    const model = (requestType === 'requests') ? Request : Subrequest;
    const options = { where: { id: requestId }, returning: true };
    const updatedRequest = await update(model, data, options);
    const [, [updatedRow]] = updatedRequest;

    const sender = await findById(request.userId);
    const receiver = await findById(sender.lineManager);

    await createNotification({
      sender, receiver, type: notificationTypes.EDITED_REQUEST, ref: requestId
    });

    return response(res, 201, 'success', updatedRow);
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};

export default {
  requestTrip,
  getUserRequest,
  searchRequest,
  updateApprovalStatus,
  getManagerRequest,
  updateTripRequest
};
