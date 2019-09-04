import models from '../models';
import response from '../utils/response';
import DbServices from '../services/dbServices';
import messages from '../utils/messages';
import pushChatToFront from '../services/chatServices';

const { Chat, User } = models;
const { serverError, chatAdded } = messages;
const { getAllRecord, create, getById } = DbServices;

/**
 * get all chat message in controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const getAllChat = async (req, res) => {
  try {
    const options = {
      order: [
        ['createdAt', 'ASC']
      ],
      include: [{
        model: User,
        as: 'sender',
        attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNo']
      }],
      attributes: { exclude: ['userId'] }
    };
    const chats = await getAllRecord(Chat, options);
    return response(res, 200, 'success', chats);
  } catch (error) {
    return response(res, 500, 'error', serverError);
  }
};

/**
 * insert chat message in controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
const postChat = async (req, res) => {
  try {
    const { id: userId } = req.decoded;
    const { message } = req.body;
    const chat = await create(Chat, { userId, message });
    const userDetails = await getById(User, userId, { attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNo'] });
    const sender = {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      phoneNo: userDetails.phoneNo
    };
    pushChatToFront(message, sender, chat.createdAt);
    return response(res, 200, 'success', { message: chatAdded });
  } catch (error) {
    return response(res, 500, 'error', serverError);
  }
};

export default {
  getAllChat, postChat
};
