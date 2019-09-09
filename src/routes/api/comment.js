import validate from '../../middlewares/validator';
import commentSchema from '../../validation/commentSchema';
import { checkToken } from '../../middlewares/userMiddlewares';
import checkBlacklist from '../../middlewares/blacklistMiddleware';
import authorize from '../../middlewares/authorizer';
import { checkRequestId, canAccessRequest } from '../../middlewares/requestMiddlewares';
import commentController from '../../controllers/commentController';
import roles from '../../utils/roles';

const { createComment, getComments, deleteComment } = commentController;
const { createCommentSchema, getCommentsSchema } = commentSchema;
const { REQUESTER, MANAGER } = roles;

const commentRoute = (router) => {
  router.route('/comments/:requestId')
  /**
     * @swagger
     * components:
     *  schemas:
     *    Comment:
     *      properties:
     *        id:
     *          type: string
     *          format: uuid
     *        content:
     *          type: string
     *        requestId:
     *          type: string
     *          format: uuid
     *        Owner:
     *          type: object
     *          readOnly: true
     *          properties:
     *            firstName:
     *              type: string
     *            lastName:
     *              type: string
     *            ownerId:
     *              type: string
     *              format: uuid
     *            createdAt:
     *              type: string
     *              format: date-time
     *            updatedAt:
     *              type: string
     *              format: date-time
    */

    /**
     * @swagger
     * /api/v1/comments/{requestId}:
     *   post:
     *     tags:
     *       - Comments
     *     summary: Add a comment to a request
     *     description: Create a comment
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name: requestId
     *        schema:
     *          type: string
     *          format: uuid
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *          schema:
     *            type: object
     *            properties:
     *              content:
     *                type: string
     *                example: Can you explain more?
     *     responses:
     *       201:
     *         description: Comment created successfully
     *         content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                status:
     *                  type: string
     *                  example: success
     *                data:
     *                  $ref: '#/components/schemas/Comment'
     *       400:
     *         description: Input validation error
     *         content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/ErrorResponse'
     *       403:
     *         description: Unauthorization error
     *         content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/ErrorResponse'
     *       500:
     *         description: Internal Server error
     *         content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/ErrorResponse'
     *     security:
     *       - bearerAuth: []
    */
    .post(validate(createCommentSchema), checkToken, checkBlacklist,
      authorize([REQUESTER, MANAGER]), checkRequestId, canAccessRequest, createComment);

  router.route('/comments/:requestId')
    /**
     * @swagger
     * /api/v1/comments/{requestId}:
     *   get:
     *     tags:
     *       - Comments
     *     summary: Get request comments
     *     description: Get all comments in a specific request
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name: requestId
     *        schema:
     *          type: string
     *          format: uuid
     *        required: true
     *      - in: query
     *        name: page
     *        schema:
     *          type: number
     *        required: false
     *      - in: query
     *        name: perPage
     *        schema:
     *          type: number
     *        required: false
     *     responses:
     *       200:
     *         description: Comments fetched successfully
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
     *                  items:
     *                    $ref: '#/components/schemas/Comment'
     *       400:
     *         description: Input validation error
     *         content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/ErrorResponse'
     *       403:
     *         description: Unauthorization error
     *         content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/ErrorResponse'
     *       500:
     *         description: Internal Server error
     *         content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/ErrorResponse'
     *     security:
     *       - bearerAuth: []
    */
    .get(validate(getCommentsSchema), checkToken, checkBlacklist,
      authorize([REQUESTER, MANAGER]), checkRequestId, canAccessRequest, getComments);

  router.route('/comments/:commentId')
  /**
             * @swagger
             * components:
             *  schemas:
             *    Comment:
             *      properties:
             *        id:
             *          type: string
             *        content:
             *          type: string
             *        requestId:
             *          type: string
             *        ownerId:
             *          type: string
            */

  /**
             * @swagger
             * /api/v1/comments/{commentId}:
             *   patch:
             *     tags:
             *       - Comments
             *     summary: Update a comment status to deleted
             *     description: Change comment status to deleted so it wont show in the frontend
             *     produces:
             *       - application/json
             *     parameters:
             *      - in: path
             *        name: commentId
             *        schema:
             *          type: string
             *          format: uuid
             *        required: true
             *     responses:
             *       201:
             *         description: Comment deleted successfully
             *         content:
             *          application/json:
             *            schema:
             *              type: object
             *              properties:
             *                status:
             *                  type: string
             *                  example: success
             *                data:
             *                  type: string
             *                  example: Comment deleted successfully
             *       400:
             *         description: Input validation error
             *         content:
             *          application/json:
             *            schema:
             *              $ref: '#/components/schemas/ErrorResponse'
             *       500:
             *         description: Internal Server error
             *         content:
             *          application/json:
             *            schema:
             *              $ref: '#/components/schemas/ErrorResponse'
             *     security:
             *       - bearerAuth: []
            */
    .patch(checkToken, checkBlacklist, authorize([REQUESTER, MANAGER]), deleteComment);
};

export default commentRoute;
