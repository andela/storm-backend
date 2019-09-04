import models from '../models/index';
import { updateById } from './userServices';
import createEmailTemplate from '../utils/createEmailTemplate';
import Notifications from '../utils/notifications';
import sendMail from '../utils/sendMail';
import client from '../config/pusher';

const { Notification } = models;

/**
 * Helper function to send a notification email through sendgrid
 * @param {String} email - recepient's email
 * @param {String} subject - notification email subject
 * @param {String} message - notification email message
 * @returns {Promise} - sendgrid response
 */
const sendViaEmail = (email, subject, message) => sendMail(email, subject, message);

/**
 * Helper function to send a notification to browser through pusher
 * @param {String} id - receiver's id
 * @param {String} title - notification title
 * @param {String} body - notification body
 * @param {String} actionLink - actionLink
 * @returns {VoidFunction} - sendgrid
 */
const sendViaApp = (id, title, body, actionLink) => client.trigger(`${id}`, 'notification', {
  title, body, actionLink
});

/**
 * Create notification
 * @param {Object} options - required notification data
 * @returns {null} - null
 */
// eslint-disable-next-line object-curly-newline
export const createNotification = async ({ sender, receiver, type, ref }) => {
  // title - Notification title
  // body - Notification body
  // actionLink - Redirect url from email or browser notification pane
  // actionText - Redirect button text in email
  let title, body, actionLink, actionText;
  switch (type) {
    case 'newRequest':
      ({ title, body } = Notifications.newTravelRequest(sender));
      ([actionLink, actionText] = [`/request/${ref}`, 'Respond']);
      break;
    default:
      break;
  }
  await Notification.create({
    sender: sender.id, receiver: receiver.id, message: body, type, ref
  });
  receiver.emailNotificationEnabled && sendViaEmail(
    receiver.email, title, createEmailTemplate(title, body, actionLink, actionText)
  );
  sendViaApp(receiver.id, title, body, actionLink);
};

/**
 * Helper function to allow a user optin to email notification
 * @param {String} id - receiver's id
 * @returns {Promise} - sequelize response
 */
export const optInEmail = (id) => updateById(id, {
  emailNotificationEnabled: true
});

/**
 * Helper function to allow a user optout of email notification
 * @param {String} id - receiver's id
 * @returns {Promise} - sequelize response
 */
export const optOutEmail = (id) => updateById(id, {
  emailNotificationEnabled: false
});

/**
 * Helper function to get a notification by id
 * @param {String} id - notification id
 * @returns {Promise} - sequelize response
 */
export const findOneNotification = (id) => Notification.findOne({ where: { id } });

/**
 * Helper function to get all notification by receiver
 * @param {String} receiver - receiver's id
 * @returns {Promise} - sequelize response
 */
export const findByReceiver = (receiver) => Notification.findAll({ where: { receiver } });

/**
 * Helper function to update notification, helps avoid code duplication
 * @param {Object} data - Update data
 * @param {Object} options - Update options
 * @returns {Promise} - sequelize response
 */
const handleNotificationUpdate = (data, options) => Notification.update(data, options);

/**
 * Helper function to mark a notification as read
 * @param {String} id - notification id
 * @param {String} data - update data
 * @returns {Promise} - sequelize response
 */
export const markAsRead = async (id, data) => {
  const result = await handleNotificationUpdate(data, {
    where: { id, isRead: false },
    returning: true
  });
  return result[1][0];
};

/**
 * Helper function to mark all notifications for a receiver as read
 * @param {String} receiver - receiver's id
 * @param {String} data - update data
 * @returns {Promise} - sequelize response
 */
export const markAllAsRead = async (receiver, data) => {
  const result = await handleNotificationUpdate(data, {
    where: { receiver, isRead: false },
    returning: true
  });
  return result[1];
};

/**
 * Helper function to clear all notifications for a receiver
 * @param {String} receiver - receiver's id
 * @returns {Promise} - sequelize response
 */
export const deleteAllNotifications = (receiver) => Notification.destroy({ where: { receiver } });
