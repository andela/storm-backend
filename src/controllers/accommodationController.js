import models from '../models';
import response from '../utils/response';
import messages from '../utils/messages';
import DbServices from '../services/dbServices';


const {
  Accommodation, BookAccomodation, User, Request
} = models;
const { create, getById } = DbServices;
const { serverError } = messages;

/**
 * travel admin can add accommodation controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const createAccommodation = async (req, res) => {
  try {
    const { body } = req;
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

export { createAccommodation, bookAccommodation };
