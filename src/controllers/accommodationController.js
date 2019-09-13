import { Op } from 'sequelize';
import models from '../models';
import response from '../utils/response';
import messages from '../utils/messages';
import DbServices from '../services/dbServices';
import { createRating, getAverageRatingByAccommodation } from '../services/ratingService';

const {
  Accommodation, BookAccomodation, User, Request, AccomodationFeedback, AccommodationLike
} = models;

const {
  create, getById, getOrCreate, getAllRecord
} = DbServices;

const { serverError, accommodationFeedbackPosted } = messages;

/**
 * travel admin can add accommodation controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const createAccommodation = async (req, res) => {
  try {
    const { decoded: { id: userId }, body } = req;
    const user = await getById(User, userId, {});
    const { verified } = user;
    if (verified === false) {
      return response(res, 403, 'error', { message: messages.unAuthorized });
    }
    const {
      country, city, address, accommodation, accommodationType, roomType, numOfRooms,
      description, facilities
    } = body;

    const createdAccommodation = {
      country,
      city,
      address,
      accommodation,
      accommodationType,
      roomType,
      numOfRooms,
      description,
      facilities
    };
    const accomm = await create(Accommodation, createdAccommodation);

    return response(res, 201, 'success', accomm);
  } catch (error) {
    return response(res, 500, 'error', {
      message: serverError,
    });
  }
};


/**
 * user can book accomodation facility
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const bookAccommodation = async (req, res) => {
  try {
    const { id: userId } = req.decoded;
    const {
      tripRequestId, typeOfRoom, numOfRooms, checkIn, checkOut, adults, children
    } = req.body;
    const { accommodationId } = req.params;
    const user = await getById(User, userId, {});
    const { firstName, lastName } = user;
    const fullName = `${lastName} ${firstName}`;

    const request = await getById(Request, tripRequestId, {});
    if (!request) return response(res, 404, 'error', { message: messages.noResult });
    const accommodation = await getById(Accommodation, accommodationId, {});
    if (!accommodation) return response(res, 404, 'error', { message: messages.notExistAccommodation });
    const { roomType } = accommodation;
    const inValidRoomArray = typeOfRoom.filter((roomName) => !roomType.includes(roomName));
    if (inValidRoomArray.length) return response(res, 400, 'error', { message: messages.invalidRoom(inValidRoomArray.join()) });

    const bookingDetails = {
      userId,
      accommodationId,
      tripRequestId,
      fullName,
      typeOfRoom,
      numOfRooms,
      checkIn,
      checkOut,
      adults,
      children
    };
    const bookedAccommodation = await create(BookAccomodation, bookingDetails);

    return response(res, 201, 'success', bookedAccommodation);
  } catch (error) {
    return response(res, 500, 'error', {
      message: serverError,
    });
  }
};

/**
 * @function likeAccommodation
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 */
const likeAccommodation = async (req, res) => {
  const { decoded: { id }, params: { accommodationId } } = req;
  try {
    const options = { where: { userId: id, accommodationId }, defaults: { liked: true } };
    const [feedback, created] = await getOrCreate(AccommodationLike, options);
    if (!created) {
      feedback.liked = !feedback.liked;
      const savedFeedback = await feedback.save();
      return response(res, 202, 'success', savedFeedback);
    }
    return response(res, 201, 'success', feedback);
  } catch (error) {
    return response(res, 500, 'error', { message: serverError });
  }
};

/**
 * @function accomodationFeedback
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 */
const accomodationFeedback = async (req, res) => {
  try {
    const { id: userId } = req.decoded;
    const { accommodationId } = req.params;
    const {
      message
    } = req.body;
    await create(AccomodationFeedback, { accommodationId, userId, message });
    return response(res, 200, 'success', { message: accommodationFeedbackPosted });
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};

/* user can get accomodation by its ID
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const getAccomodation = async (req, res) => {
  try {
    const { accommodationId } = req.params;
    let accommodation = [];
    if (accommodationId) {
      accommodation = await getById(Accommodation, accommodationId, {});
      if (!accommodation) return response(res, 404, 'error', { message: messages.notExistAccommodation });
    } else {
      accommodation = await getAllRecord(Accommodation);
    }
    return response(res, 200, 'success', accommodation);
  } catch (error) {
    return response(res, 500, 'error', {
      message: serverError,
    });
  }
};

/* user can get accomodation by destination city
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const getByDestinationCity = async (req, res) => {
  try {
    const { destinationCity } = req.params;
    const options = { where: { city: { [Op.iLike]: `%${destinationCity}%` } } };
    let accommodations = await getAllRecord(Accommodation, options);
    accommodations = await Promise.all(
      accommodations.map(async (accommodation) => {
        accommodation.dataValues.rating = await getAverageRatingByAccommodation(accommodation);
        return accommodation;
      })
    );

    return response(res, 200, 'success', accommodations);
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};

/**
 * @method rateAccommodation
 * @param {object} req request object
 * @param {object} res request object
 * @returns {object} custom response
 * @description rates an accomodation
*/
const rateAccommodation = async (req, res) => {
  try {
    const {
      params: { accommodationId },
      body: { value },
      decoded: { id: userId },
      accommodation
    } = req;
    await createRating(userId, accommodationId, value);
    accommodation.dataValues.rating = await getAverageRatingByAccommodation(accommodation);
    return response(res, 201, 'success', accommodation);
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};

export {
  createAccommodation, bookAccommodation, accomodationFeedback,
  likeAccommodation, getByDestinationCity, rateAccommodation, getAccomodation
};
