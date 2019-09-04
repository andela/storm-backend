import {
  handleMarkAsRead,
  handleMarkAllAsRead,
  handleOptInEmail,
  clearNotifications,
  handleOptOutEmail,
  getAllNotifications,
} from '../../controllers/notificationController';
import { checkToken } from '../../middlewares/userMiddlewares';

const notificationRoutes = (router) => {
  router.route('/notification')
  /**
   * @swagger
   * components:
   *  schemas:
   *    Notification:
   *      properties:
   *        id:
   *          type: string
   *          readOnly: true
   *        type:
   *          type: string
   *        sender:
   *          type: string
   *          formal: uuid
   *        receiver:
   *          type: string
   *          formal: uuid
   *        ref:
   *          type: string
   *          formal: uuid
   *        message:
   *          type: string
   *        isRead:
   *          type: boolean
   *        readDate:
   *          type: date
   *        createdAt:
   *          type: string
   *          format: date-time
   *          readOnly: true
   *        updateAt:
   *          type: string
   *          format: date-time
   *          readOnly: true
   *    ErrorResponse:
   *      properties:
   *        status:
   *          type: string
   *          example: error
   *        data:
   *          type: object
   */
    /**
     * @swagger
     * /api/v1/notification:
     *   get:
     *     tags:
     *       - Notifications
     *     description: Get all notification for a user
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Get request successful
     *         content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                status:
     *                  type: string
     *                  example: success
     *                data:
     *                  type: array
     *                  description: array of notifications
     *                  items:
     *                    $ref: '#/components/schemas/Notification'
     *       403:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server error
     *         content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/ErrorResponse'
     *     security:
     *       - bearerAuth: []
    */
    .get(checkToken, getAllNotifications);

  router.route('/notification/optIn')
    /**
     * @swagger
     * /api/v1/notification/optIn:
     *   patch:
     *     tags:
     *       - Notifications
     *     description: Allow a user optin to email notification
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Opt in successful
     *       403:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server error
     *     security:
     *       - bearerAuth: []
    */
    .patch(checkToken, handleOptInEmail);

  router.route('/notification/optOut')
    /**
       * @swagger
       * /api/v1/notification/optOut:
       *   patch:
       *     tags:
       *       - Notifications
       *     description: Allow a user optout of email notification
       *     produces:
       *       - application/json
       *     responses:
       *       200:
       *         description: Opt out successful
       *       403:
       *         description: Unauthorized
       *       500:
       *         description: Internal Server error
       *     security:
       *       - bearerAuth: []
      */
    .patch(checkToken, handleOptOutEmail);

  router.route('/notification/markAsRead/:id')
    /**
       * @swagger
       * /api/v1/notification/markAsRead/{notificationId}:
       *   patch:
       *     tags:
       *       - Notifications
       *     description: Marks a notification as read
       *     produces:
       *       - application/json
       *     parameters:
       *       - in: path
       *         name: notificationId
       *         schema:
       *           type: string
       *           format: uuid
       *         required: true
       *     responses:
       *       200:
       *         description: Successfully updated notification
       *       403:
       *         description: Unauthorized
       *       500:
       *         description: Internal Server error
       *     security:
       *       - bearerAuth: []
      */
    .patch(checkToken, handleMarkAsRead);

  router.route('/notification/markAllAsRead')
    /**
       * @swagger
       * /api/v1/notification/markAllAsRead:
       *   patch:
       *     tags:
       *       - Notifications
       *     description: Marks all user's notification as read
       *     produces:
       *       - application/json
       *     responses:
       *       200:
       *         description: Successfully updated notifications
       *         content:
       *          application/json:
       *            schema:
       *              type: object
       *              properties:
       *                status:
       *                  type: string
       *                  example: success
       *                data:
       *                  type: array
       *                  description: array of updated notifications
       *                  items:
       *                    $ref: '#/components/schemas/Notification'
       *       403:
       *         description: Unauthorized
       *       500:
       *         description: Internal Server error
       *     security:
       *       - bearerAuth: []
      */
    .patch(checkToken, handleMarkAllAsRead);

  router.route('/notification/clear')
  /**
       * @swagger
       * /api/v1/notification/clear:
       *   delete:
       *     tags:
       *       - Notifications
       *     description: Deletes all user's notifications
       *     produces:
       *       - application/json
       *     responses:
       *       200:
       *         description: Successfully deleted notifications
       *       403:
       *         description: Unauthorized
       *       500:
       *         description: Internal Server error
       *     security:
       *       - bearerAuth: []
      */
    .delete(checkToken, clearNotifications);
};

export default notificationRoutes;
