import models from '../models';
import response from '../utils/response';
import DbServices from '../services/dbServices';
import messages from '../utils/messages';

const { Mostdestination } = models;
const { serverError } = messages;
const { getAllRecord } = DbServices;

/**
 * get top 10 most travelled destination counters in controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const getMostDestinations = async (req, res) => {
  try {
    const options = {
      limit: 10,
      order: [
        ['count', 'ASC']
      ]
    };
    const mostDestinations = await getAllRecord(Mostdestination, options);
    return response(res, 200, 'success', mostDestinations);
  } catch (error) {
    return response(res, 500, 'error', serverError);
  }
};

export default {
  getMostDestinations
};
