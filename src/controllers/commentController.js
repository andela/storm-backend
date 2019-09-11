import models from '../models';
import response from '../utils/response';
import DbServices from '../services/dbServices';
import messages from '../utils/messages';
import { calculateLimitAndOffset, paginate } from '../utils/pagination';
import notificationTypes from '../utils/notificationTypes';
import { createNotification } from '../services/notificationServices';
import roles from '../utils/roles';

const { Comment, User } = models;
const { create, getAll, getById } = DbServices;
const { serverError, noComment } = messages;
const { NEW_COMMENT } = notificationTypes;

/**
 * create a comment
 * @param {Object} req - (params, body, decoded) server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 * @description create a comment
 */
const createComment = async ({
  params, body, decoded, payload,
}, res) => {
  try {
    const { requestId } = params;
    const { content } = body;
    const { id: ownerId, roleId } = decoded;

    const createdComment = await create(Comment, {
      content,
      ownerId,
      requestId,
    });

    const { user, request } = payload;
    const receiverId = (roleId === roles.REQUESTER) ? user.lineManager : request.userId;
    const receiver = await getById(User, receiverId);

    await createNotification({
      receiver, sender: user, type: NEW_COMMENT, ref: request.id,
    }, true);

    return response(res, 201, 'success', createdComment);
  } catch (error) {
    return response(res, 500, 'error', { message: error.message });
  }
};

/**
 * get all comments of a specific request
 * @param {Object} params - server request's params
 * @param {Object} res - server response
 * @returns {Object} - custom response
 * @description get all comments of a specific request
 */
const getComments = async ({ params, query }, res) => {
  try {
    const { requestId } = params;
    const { page, perPage } = query;
    const { limit, offset } = calculateLimitAndOffset(page, perPage);
    const options = {
      limit,
      offset,
      where: { requestId },
      order: [
        ['createdAt', 'ASC']
      ],
      attributes: { exclude: ['ownerId'] },
      include: [{
        model: User,
        as: 'Owner',
        attributes: {
          include: [['id', 'ownerId']],
          exclude: ['id', 'email', 'phoneNo', 'password', 'birthDate',
            'preferredCurrency', 'preferredLanguage', 'currentLocation', 'gender', 'roleId',
            'lineManager', 'verified', 'emailNotificationEnabled']
        },
      }],
    };

    const { count, rows } = await getAll(Comment, options);
    const meta = paginate(page, perPage, count, rows);

    return response(res, 200, 'success', count > 0 ? { comments: rows, meta } : {
      message: noComment,
    });
  } catch (error) {
    return response(res, 500, 'error', serverError);
  }
};

export default {
  createComment, getComments,
};
