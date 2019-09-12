import response from '../utils/response';
import messages from '../utils/messages';
import '../config/env';
import {
  markAsRead,
  markAllAsRead,
  deleteAllNotifications,
  findOneNotification,
  findByReceiver,
  optInEmail,
  optOutEmail
} from '../services/notificationServices';

/**
 * Helper function to update notification, helps avoid code duplication
 * @param {Object} req - express req object
 * @param {Object} res - express res object
 * @param {Function} method - method to be called
 * @param {String} message - success message to show to the users
 * @returns {void}
 */
const handleMethodById = async (req, res, method, message) => {
  try {
    const { id } = req.decoded;
    const data = await method(id);
    const payload = message ? { message } : data;
    response(res, 200, 'success', payload);
  } catch (error) {
    response(res, 500, 'error', { message: error.message });
  }
};

/**
 * notification controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
export const getAllNotifications = (req, res) => handleMethodById(req, res, findByReceiver);

/**
 * notification controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
export const handleOptInEmail = (req, res) => {
  return handleMethodById(req, res, optInEmail, messages.optinEmailNotification);
};

/**
 * notification controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 */
export const handleOptOutEmail = (req, res) => {
  return handleMethodById(req, res, optOutEmail, messages.optoutEmailNotification);
};

/**
 * notification controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
export const handleMarkAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.decoded;
    const notification = await findOneNotification(id);
    if (notification.receiver !== userId) return response(res, 403, 'error', { message: messages.forbidden });
    const update = await markAsRead(id, { isRead: true, readDate: Date.now() });
    response(res, 200, 'success', update);
  } catch (e) {
    response(res, 500, 'error', { message: e.message });
  }
};

/**
 * notification controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
export const handleMarkAllAsRead = async (req, res) => {
  try {
    const { id } = req.decoded;
    const update = await markAllAsRead(id, { isRead: true, readDate: Date.now() });
    response(res, 200, 'success', update);
  } catch (e) {
    response(res, 500, 'error', { message: e.message });
  }
};

/**
 * notification controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
*/
export const clearNotifications = (req, res) => {
  return handleMethodById(req, res, deleteAllNotifications, messages.notificationsCleared);
};
