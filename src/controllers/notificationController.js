import response from '../utils/response';
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
 * @returns {void}
 */
const handleMethodById = async (req, res, method) => {
  try {
    const { id } = req.decoded;
    const data = await method(id);
    response(res, 200, 'success', data);
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
export const handleOptInEmail = (req, res) => handleMethodById(req, res, optInEmail);

/**
 * notification controller
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @returns {Object} - custom response
 */
export const handleOptOutEmail = (req, res) => handleMethodById(req, res, optOutEmail);

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
    if (notification.receiver !== userId) return response(res, 403, 'error', { message: 'Forbidden' });
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
export const clearNotifications = (req, res) => handleMethodById(req, res, deleteAllNotifications);
