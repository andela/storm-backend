import Sequelize from 'sequelize';
import models from '../models';
import response from '../utils/response';
import messages from '../utils/messages';
import DbServices from '../services/dbServices';

const { Request } = models;
const { getAll } = DbServices;


/**
 * get user details by id
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 * @description get's details of logged in user
 */
const getUserXtripStat = async (req, res) => {
  const { decoded: { id } } = req;
  try {
    const options = {
      where: { userId: id },
      attributes:
      ['approvalStatus', [Sequelize.fn('COUNT', Sequelize.col('approvalStatus')), 'statusCount']],
      group: ['approvalStatus']
    };

    const { count } = await getAll(Request, options);
    return response(res, 200, 'success', count);
  } catch (error) {
    return response(res, 500, 'error', { message: messages.serverError });
  }
};

export default getUserXtripStat;
