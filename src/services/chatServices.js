import client from '../config/pusher';

/**
 * Helper function to send chat update to browser through pusher
 * @param {String} message - message
 * @param {String} sender - sender's details
 * @param {Date} createdAt - notification body
 * @returns {VoidFunction} - pusher
 */
const pushChatToFront = (message, sender, createdAt) => client.trigger('chatroom', 'message', {
  message, sender, createdAt
});

export default pushChatToFront;
