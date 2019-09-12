import requestController from '../../controllers/requestController';
import validate from '../../middlewares/validator';
import requestSchema from '../../validation/requestSchema';
import { checkToken, checkUserId } from '../../middlewares/userMiddlewares';
import checkBlacklist from '../../middlewares/blacklistMiddleware';
import { verifyRequestLineManager, checkRequestId, verifyEditRequestAuthorization } from '../../middlewares/requestMiddlewares';
import authorize from '../../middlewares/authorizer';
import roles from '../../utils/roles';
import requestConfirmation from '../../middlewares/confirmationMiddleware';

const {
  requestTrip,
  getUserRequest,
  searchRequest,
  updateApprovalStatus,
  updateTripRequest,
  getManagerRequest
} = requestController;

const {
  requestTripSchema,
  getUserRequestSchema,
  searchRequestTripSchema,
  requestIdSchema,
  subrequestTripSchema
} = requestSchema;

const { MANAGER, SUPER_ADMIN } = roles;

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

  router.route('/requests/user')
  /**
   * @swagger
   * /api/v1/requests/user:
   *   get:
   *     tags:
   *       - Requests
   *     description: Get all requests for a user
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: query
   *         name: userId
   *         schema:
   *           type: string
   *           format: uuid
   *         required: false
   *       - in: query
   *         name: approvalStatus
   *         schema:
   *           type: string
   *         required: false
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

  router.route('/requests/manager')
  /**
   * @swagger
   * /api/v1/requests/manager:
   *   get:
   *     tags:
   *       - Requests
   *     description: Get all requests for a manager
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: query
   *         name: userId
   *         schema:
   *           type: string
   *           format: uuid
   *         description: id of manager
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
    .get(
      checkToken, checkBlacklist, authorize([MANAGER, SUPER_ADMIN]),
      validate(getUserRequestSchema), checkUserId, getManagerRequest
    );
};

const searchRequestRoute = (router) => {
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
     *   get:
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
    .get(checkToken, checkBlacklist, validate(searchRequestTripSchema), searchRequest);

  router.route('/requests/reject/:requestId')
  /**
   * @swagger
   * components:
   *  schemas:
   *    acceptOrRejectTrip:
   *      properties:
   *        message:
   *          type: string
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
   * /api/v1/requests/reject/{requestId}:
   *   patch:
   *     tags:
   *       - Requests
   *     description: Reject a request for a trip
   *     parameters:
   *       - in: path
   *         name: requestId
   *         schema:
   *           type: string
   *         required: true
   *       - in: query
   *         name: confirmation
   *         schema:
   *           type: boolean
   *         required: false
   *     produces:
   *       - application/json
   *     responses:
   *       201:
   *         description: Trip request successfully rejected
   *         content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  example: success
   *                data:
   *                  allOf:
   *                    - $ref: '#/components/schemas/acceptOrRejectTrip'
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
    .patch(checkToken, checkBlacklist, validate(requestIdSchema), checkRequestId,
      verifyRequestLineManager, requestConfirmation, updateApprovalStatus);

  router.route('/requests/accept/:requestId')
  /**
   * @swagger
   * components:
   *  schemas:
   *    acceptOrRejectTrip:
   *      properties:
   *        message:
   *          type: string
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
   * /api/v1/requests/accept/{requestId}:
   *   patch:
   *     tags:
   *       - Requests
   *     description: Accept a request for a trip
   *     parameters:
   *       - in: path
   *         name: requestId
   *         schema:
   *           type: string
   *         required: true
   *       - in: query
   *         name: confirmation
   *         schema:
   *           type: boolean
   *         required: false
   *     produces:
   *       - application/json
   *     responses:
   *       201:
   *         description: Trip request successfully accepted
   *         content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  example: success
   *                data:
   *                  allOf:
   *                    - $ref: '#/components/schemas/acceptOrRejectTrip'
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
    .patch(checkToken, checkBlacklist, validate(requestIdSchema), checkRequestId,
      verifyRequestLineManager, requestConfirmation, updateApprovalStatus);

  router.route('/requests/edit/:requestId')
  /**
   * @swagger
   * components:
   *  schemas:
   *    editRequest:
   *      properties:
   *        type:
   *          type: string
   *          enum: [return, one-way]
   *        originCity:
   *          type: string
   *          example: Gotham City
   *        destinationCity:
   *          type: string
   *          example: Central City
   *        departureDate:
   *          type: string
   *          example: 19 Sep 2019 21:03:25
   *        returnDate:
   *          type: string
   *          example: 10 Sep 2020 21:03:25
   *        reason:
   *          type: string
   *          example: Meet barry allen
   *        accommodation:
   *          type: string
   *          example: Star Labs
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
   * /api/v1/requests/edit/{requestId}:
   *   put:
   *     tags:
   *       - Requests
   *     description: Edit trip request
   *     parameters:
   *       - in: path
   *         name: requestId
   *         schema:
   *           type: string
   *         required: true
   *     produces:
   *       - application/json
   *     requestBody:
   *      description: Updated request
   *      required: true
   *      content:
   *       application/json:
   *          schema:
   *            $ref: '#/components/schemas/editRequest'
   *     responses:
   *       201:
   *         description: Trip request successfully updated
   *         content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  example: success
   *                data:
   *                  allOf:
   *                    - $ref: '#/components/schemas/editRequest'
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
    .put([
      checkToken,
      checkBlacklist,
      validate(requestIdSchema),
      validate(requestTripSchema),
      verifyEditRequestAuthorization,
      updateTripRequest
    ]);

  router.route('/subrequests/edit/:requestId')
  /**
   *
   * @swagger
   * components:
   *  schemas:
   *    editSubRequest:
   *      properties:
   *        originCity:
   *          type: string
   *          example: Metropolis City
   *        destinationCity:
   *          type: string
   *          example: Atlantis
   *        departureDate:
   *          type: string
   *          example: 15 Sep 2020 21:03:25
   *        reason:
   *          type: string
   *          example: Meet AquaMan
   *        accommodation:
   *          type: string
   *          example: Pacific Ocean
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
   * /api/v1/subrequests/edit/{requestId}:
   *   put:
   *     tags:
   *       - Requests
   *     description: Edit trip subrequest
   *     parameters:
   *       - in: path
   *         name: requestId
   *         schema:
   *           type: string
   *         required: true
   *     produces:
   *       - application/json
   *     requestBody:
   *      description: Updated subrequest
   *      required: true
   *      content:
   *       application/json:
   *          schema:
   *            $ref: '#/components/schemas/editSubRequest'
   *     responses:
   *       201:
   *         description: Trip request successfully updated
   *         content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  example: success
   *                data:
   *                  allOf:
   *                    - $ref: '#/components/schemas/editSubRequest'
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
    .put([
      checkToken,
      checkBlacklist,
      validate(requestIdSchema),
      validate(subrequestTripSchema),
      verifyEditRequestAuthorization,
      updateTripRequest
    ]);
};

export { requestRoute, searchRequestRoute };
