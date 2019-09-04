import chatController from '../../controllers/chatController';
import { checkToken } from '../../middlewares/userMiddlewares';
import validate from '../../middlewares/validator';
import chatSchema from '../../validation/chatSchema';

const { getAllChat, postChat } = chatController;
const { chatPostSchema } = chatSchema;

const chatRoutes = (router) => {
  router.route('/chat')
  /**
   * @swagger
   * components:
   *  schemas:
   *    ChatUser:
   *      properties:
   *        email:
   *          type: string
   *        firstName:
   *          type: string
   *        lastName:
   *         type: string
   *        phoneNo:
   *          type: string
   *    ChatResponse:
   *      properties:
   *        id:
   *          type: string
   *          readOnly: true
   *        sender:
   *          type: string
   *          formal: uuid
   *        message:
   *          type: string
   *        createdAt:
   *          type: string
   *          format: date-time
   *          readOnly: true
   *        updateAt:
   *          type: string
   *          format: date-time
   *          readOnly: true
   *        User:
   *          type: array
   *          items:
   *              $ref: '#/components/schemas/ChatUser'
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
     * /api/v1/chat:
     *   get:
     *     tags:
     *       - Chats
     *     description: Get all chats
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Get all chats was successful
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
     *                  description: array of chats
     *                  items:
     *                    $ref: '#/components/schemas/ChatResponse'
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
    .get(checkToken, getAllChat);

  router.route('/chat')
  /**
   * @swagger
   * components:
   *  schemas:
   *    Chat:
   *      properties:
   *        message:
   *          type: string
   */

  /**
   * @swagger
   * /api/v1/chat:
   *   post:
   *     tags:
   *       - Chats
   *     description: Create a new chat message
   *     produces:
   *       - application/json
   *     requestBody:
   *      description: Chat data object
   *      required: true
   *      content:
   *       application/json:
   *          schema:
   *            $ref: '#/components/schemas/Chat'
   *     responses:
   *       200:
   *         description: Your message was pushed successfully
   *       500:
   *         description: Internal Server error
   *     security:
   *      - bearerAuth: []
   */
    .post(checkToken, validate(chatPostSchema), postChat);
};

export default chatRoutes;
