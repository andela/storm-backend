import response from '../utils/response';
import messages from '../utils/messages';
import models from '../models';

const { Request, User } = models;

/**
 * ReConfirm Travel Request Middleware
 * @param {Object} req - Express request object
 * @param {Oject} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - Returns Object
 */
const requestConfirmation = async (req, res, next) => {
  const { requestId } = req.params;
  let { confirmation } = req.query;
  confirmation = (confirmation === 'true');
  try {
    if (!confirmation) {
      const option = {
        include: [{
          model: User,
          as: 'User',
          attributes: ['firstName', 'lastName']
        }],
        attributes: { exclude: ['id', 'approvalStatus', 'userId', 'createdAt', 'updatedAt', 'multiCity'] }
      };
      const request = await Request.findByPk(requestId, option);
      return response(res, 201, 'success', {
        message: messages.confirmation,
        request
      });
    }
    next();
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};

export default requestConfirmation;
