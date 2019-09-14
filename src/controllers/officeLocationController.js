import models from '../models';
import response from '../utils/response';
import DbServices from '../services/dbServices';
import messages from '../utils/messages';

const { OfficeLocation } = models;
const { serverError, noLocation } = messages;
const { getAllRecord, create, getById } = DbServices;

/**
 * get all office locations in controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const getLocation = async (req, res) => {
  try {
    const allLoactions = await getAllRecord(OfficeLocation, {});
    if (allLoactions.length === 0) return response(res, 200, 'success', { message: noLocation });
    return response(res, 200, 'success', allLoactions);
  } catch (error) {
    return response(res, 500, 'error', serverError);
  }
};

/**
 * get office location by id in controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const getLocationById = async (req, res) => {
  const { locationId } = req.params;
  try {
    const location = await getById(OfficeLocation, locationId, {});
    if (!location) return response(res, 200, 'success', { message: noLocation });
    return response(res, 200, 'success', location);
  } catch (error) {
    return response(res, 500, 'error', serverError);
  }
};

/**
 * insert office location in controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const postLocation = async (req, res) => {
  const {
    name, description, address, phoneNo, latitude, longitude
  } = req.body;
  try {
    const createdLocation = await create(OfficeLocation, {
      name, description, address, phoneNo, latitude, longitude
    });
    return response(res, 200, 'success', { message: createdLocation });
  } catch (error) {
    return response(res, 500, 'error', serverError);
  }
};

export default {
  getLocation, postLocation, getLocationById
};
