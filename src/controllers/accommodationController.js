import models from '../models';
import response from '../utils/response';
import messages from '../utils/messages';
import DbServices from '../services/dbServices';

const { Accommodation } = models;
const { create } = DbServices;
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

export default createAccommodation;
