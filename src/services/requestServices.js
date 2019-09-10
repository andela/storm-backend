import { Op } from 'sequelize';
import models from '../models';
import { calculateLimitAndOffset } from '../utils/pagination';

const { Request } = models;

/** helper function that get request with a search keyword
  * @param {object} body query
  * @param {object} query query
  * @returns {Promise} Promise resolved or rejected
  */
export const findRequest = (body, query) => {
  const { page, perPage } = query;
  const { limit, offset } = calculateLimitAndOffset(page, perPage);
  const searchValue = Object.keys(body).map((key) => {
    switch (key) {
      case 'type':
        return {
          type: body[key]
        };
      case 'approvalStatus':
        return {
          approvalStatus: body[key]
        };
      case 'multiCity':
        return {
          multiCity: body[key]
        };
      default:
        return {
          [key]: {
            [Op.iLike]: `%${body[key]}%`
          }
        };
    }
  });
  return Request.findAndCountAll({
    where: {
      [Op.or]: searchValue
    },
    limit,
    offset
  });
};
