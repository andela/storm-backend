import requestController from '../../controllers/requestController';
import validate from '../../middlewares/validator';
import requestSchema from '../../validation/requestSchema';
import { checkToken, checkUserId } from '../../middlewares/userMiddlewares';
import checkBlacklist from '../../middlewares/blacklistMiddleware';

const { requestTrip, getUserRequest, searchRequest } = requestController;
const { requestTripSchema, getUserRequestSchema, searchRequestTripSchema } = requestSchema;

const requestRoute = (router) => {
  router.route('/requests')
  /**
   * @swagger
   * components:
   *  schemas:
   *    SubRequest:
   *      properties:
   *        id:
   *          type: string
   *          readOnly: true
   *        subTripOriginCity:
   *          type: string
   *        subTripDestinationCity:
   *          type: string
   *        subTripDepartureDate:
   *          type: string
   *        subTripReason:
   *          type: string
   *        subTripAccommodation:
   *          type: string
   *    RequestTrip:
   *      properties:
   *        id:
   *          type: string
   *          readOnly: true
   *        type:
   *          type: string
   *          enum: [one-way, return]
   *        originCity:
   *          type: string
   *          example: London
   *        destinationCity:
   *          type: string
   *          example: Asgard
   *        departureDate:
   *          type: string
   *          format: date-time
   *        returnDate:
   *          type: string
   *          format: date-time
   *        reason:
   *          type: string
   *          example: Interview Loki
   *        accommodation:
   *          type: string
   *          example: Asgard Palace
   *        approvalStatus:
   *          type: boolean
   *          readOnly: true
   *        subRequest:
   *          type: array
   *          items:
   *              $ref: '#/components/schemas/SubRequest'
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
   *          type: string
   */

  /**
   * @swagger
   * /api/v1/requests:
   *   post:
   *     tags:
   *       - Requests
   *     description: Create a request for a trip
   *     produces:
   *       - application/json
   *     requestBody:
   *      description: Request object that needs to be sent for approval
   *      required: true
   *      content:
   *       application/json:
   *          schema:
   *            $ref: '#/components/schemas/RequestTrip'
   *     responses:
   *       201:
   *         description: Trip request successfully created
   *         content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: object
   *                data:
   *                  $ref: '#/components/schemas/RequestTrip'
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
    .post(checkToken, checkBlacklist, validate(requestTripSchema), requestTrip);
  router.route('/requests/user/:userId')
  /**
   * @swagger
   * /api/v1/requests/user/{userId}:
   *   get:
   *     tags:
   *       - Requests
   *     description: Get all requests for a user
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: string
   *           format: uuid
   *         required: true
   *       - in: query
   *         name: page
   *         schema:
   *           type: number
   *         required: false
   *       - in: query
   *         name: perPage
   *         schema:
   *           type: number
   *         required: false
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
   *                  type: object
   *                  properties:
   *                    requests:
   *                      type: array
   *                      description: array of requests
   *                      items:
   *                        $ref: '#/components/schemas/RequestTrip'
   *       403:
   *         description: Unauthorized
   *       404:
   *          description: User not found
   *       500:
   *         description: Internal Server error
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/ErrorResponse'
   *     security:
   *       - bearerAuth: []
  */
    .get(checkToken, validate(getUserRequestSchema), checkUserId, getUserRequest);

  router.route('/search/requests')
  /**
     * @swagger
     * components:
     *  schemas:
     *    Search:
     *      properties:
     *        page:
     *          type: number
     *        perPage:
     *          type: number
     *        approvalStatus:
     *          type: boolean
     *        multiCity:
     *          type: boolean
     *        type:
     *          type: string
     *        originCity:
     *          type: string
     *        destinationCity:
     *          type: string
     *        departureDate:
     *          type: string
     *        returnDate:
     *          type: string
     *        reason:
     *          type: string
     *        accommodation:
     *          type: string
     *        createdAt:
     *          type: string
     *          readOnly: true
     *        updateAt:
     *          type: string
     *          readOnly: true
     *    ErrorResponse:
     *      properties:
     *        status:
     *          type: string
     *        data:
     *          type: string
     */

    /**
     * @swagger
     * /api/v1/search/requests:
     *   post:
     *     tags:
     *       - Requests
     *     description: search request
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: number
     *         required: false
     *       - in: query
     *         name: perPage
     *         schema:
     *           type: number
     *         required: false
     *     produces:
     *       - application/json
     *     requestBody:
     *          description: Search data object
     *          required: false
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Search'
     *     responses:
     *       200:
     *         description: success
     *         content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                status:
     *                  type: object
     *                data:
     *                  $ref: '#/components/schemas/RequestTrip'
     *       404:
     *         description: No request result found
     *         content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/ErrorResponse'
     *       400:
     *         description: An unexpected error occur
     *         content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/ErrorResponse'
     *     security:
     *       - bearerAuth: []
    */
    .post(checkToken, validate(searchRequestTripSchema), searchRequest);
};

export default requestRoute;
