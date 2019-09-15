import { checkToken } from '../../middlewares/userMiddlewares';
import validator from '../../middlewares/validator';
import { checkAccommodationId } from '../../middlewares/accommodationMiddlewares';
import {
  createAccommodation, bookAccommodation, accomodationFeedback,
  likeAccommodation, getByDestinationCity, rateAccommodation
} from '../../controllers/accommodationController';
import checkBlacklist from '../../middlewares/blacklistMiddleware';
import {
  accommodationSchema, bookAccommodationSchema, accomodationFeedbackSchema,
  accommodationIdSchema, destinationCitySchema, accommodationRatingSchema
} from '../../validation/accommodationSchema';
import authorize from '../../middlewares/authorizer';
import roles from '../../utils/roles';

const { TRAVEL_ADMIN, SUPER_ADMIN, ACCOMMODATION_SUPPLIER } = roles;

const accommodationRoute = (router) => {
  router.route('/accommodation')
  /**
   * @swagger
   * components:
   *  schemas:
   *    accommodation:
   *      properties:
   *        id:
   *          type: string
   *          readOnly: true
   *        country:
   *          type: string
   *        city:
   *          type: string
   *        address:
   *          type: string
   *        accommodation:
   *          type: string
   *        accommodationType:
   *          type: string
   *        roomType:
   *          type: array
   *          items:
   *           type: string
   *        numOfRooms:
   *          type: integer
   *        description:
   *          type: string
   *        facilities:
   *          type: array
   *          items:
   *           type: string
   *        rating:
   *          type: integer
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
   * /api/v1/accommodation:
   *   post:
   *     tags:
   *       - Accommodation
   *     description: Travel admin can create accommodation
   *     produces:
   *       - application/json
   *     requestBody:
   *      description: Accommodation
   *      required: true
   *      content:
   *       application/json:
   *          schema:
   *            $ref: '#/components/schemas/accommodation'
   *     responses:
   *       201:
   *         description: Acommodation successfully created
   *         content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: object
   *                data:
   *                  $ref: '#/components/schemas/accommodation'
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
    .post(checkToken, checkBlacklist,
      authorize([TRAVEL_ADMIN, SUPER_ADMIN, ACCOMMODATION_SUPPLIER]),
      validator(accommodationSchema), createAccommodation);

  router.route('/accommodation/:destinationCity')
  /**
   * @swagger
   * components:
   *  schemas:
   *    accommodation:
   *      properties:
   *        id:
   *          type: string
   *          readOnly: true
   *        country:
   *          type: string
   *        city:
   *          type: string
   *        address:
   *          type: string
   *        accommodation:
   *          type: string
   *        accommodationType:
   *          type: string
   *        roomType:
   *          type: array
   *          items:
   *           type: string
   *        numOfRooms:
   *          type: integer
   *        description:
   *          type: string
   *        facilities:
   *          type: array
   *          items:
   *           type: string
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
   * /api/v1/accommodation/{destinationCity}:
   *   get:
   *     tags:
   *       - Accommodation
   *     description: Users can get accommodation by destination city
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: destinationCity
   *         schema:
   *           type: string
   *         required: true
   *     responses:
   *       201:
   *         description: Acommodation by destination city successful
   *         content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: object
   *                data:
   *                  type: array
   *                  description: array of accomodations
   *                  items:
   *                    $ref: '#/components/schemas/accommodation'
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
    .get(checkToken, checkBlacklist, validator(destinationCitySchema), getByDestinationCity);
};


const bookAccommodationRoute = (router) => {
  router.route('/book/accommodation/:accommodationId')
  /**
   * @swagger
   * components:
   *  schemas:
   *    bookAccommodation:
   *      properties:
   *        id:
   *          type: string
   *          readOnly: true
   *        userId:
   *          type: string
   *          readOnly: true
   *        accommodationId:
   *          type: string
   *          readOnly: true
   *        fullName:
   *          type: string
   *          readOnly: true
   *        tripRequestId:
   *          type: string
   *        typeOfRoom:
   *          type: array
   *          items:
   *           type: string
   *        numOfRooms:
   *          type: integer
   *        checkIn:
   *          type: string
   *          format: date
   *        checkOut:
   *          type: string
   *          format: date
   *        adults:
   *          type: integer
   *        children:
   *          type: integer
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
   * /api/v1/book/accommodation/{accommodationId}:
   *   post:
   *     tags:
   *       - Accommodation
   *     description: Users can book an accommodation
   *     parameters:
   *       - in: path
   *         name: accommodationId
   *         schema:
   *           type: string
   *         required: true
   *     produces:
   *       - application/json
   *     requestBody:
   *      description: Accommodation
   *      required: true
   *      content:
   *       application/json:
   *          schema:
   *            $ref: '#/components/schemas/bookAccommodation'
   *     responses:
   *       201:
   *         description: Acommodation successfully booked
   *         content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: object
   *                data:
   *                  $ref: '#/components/schemas/bookAccommodation'
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
    .post(checkToken, checkBlacklist, validator(bookAccommodationSchema), bookAccommodation);

  /**
   * @swagger
   * components:
   *  schemas:
   *    AccommodationLike:
   *      properties:
   *        id:
   *          type: string
   *          readOnly: true
   *        liked:
   *          type: boolean
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
  router.route('/accommodations/:accommodationId/like')
  /**
   * @swagger
   * /api/v1/accommodations/{accommodationId}/like:
   *   patch:
   *     tags:
   *       - Accommodation
   *     description: Users like and unlike
   *     parameters:
   *       - in: path
   *         name: accommodationId
   *         schema:
   *           type: string
   *           format: uuid
   *         required: true
   *     produces:
   *       - application/json
   *     responses:
   *       201:
   *         description: Feedback recorded
   *         content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: object
   *                data:
   *                  $ref: '#/components/schemas/AccommodationLike'
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
    .patch(checkToken, checkBlacklist, validator(accommodationIdSchema),
      checkAccommodationId, likeAccommodation);

  router.route('/accommodations/:accommodationId/rate')
  /**
   * @swagger
   * components:
   *  schemas:
   *    Rating:
   *      properties:
   *        value:
   *          type: integer
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
     * /api/v1/accommodations/{accommodationId}/rate:
     *   post:
     *     tags:
     *       - Accommodation
     *     description: Rate an accomodation
     *     parameters:
     *       - in: path
     *         name: accommodationId
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *     requestBody:
     *      description: Rating value
     *      required: true
     *      content:
     *       application/json:
     *          schema:
     *            $ref: '#/components/schemas/Rating'
     *     produces:
     *       - application/json
     *     responses:
     *       201:
     *         description: Rating recorded successfully
     *         content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                status:
     *                  type: object
     *                data:
     *                  $ref: '#/components/schemas/accommodation'
     *       404:
     *         description: Accommodation not found
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
    .post(checkToken, checkBlacklist, validator(accommodationRatingSchema),
      checkAccommodationId, rateAccommodation);
};

const accomodationFeedbackRoute = (router) => {
  router.route('/feedback/accommodation/:accommodationId')
  /**
       * @swagger
       * components:
       *  schemas:
       *    accomodationFeedback:
       *      properties:
       *        id:
       *          type: string
       *          readOnly: true
       *        userId:
       *          type: string
       *          readOnly: true
       *        accommodationId:
       *          type: string
       *          readOnly: true
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
       * /api/v1/feedback/accommodation/{accommodationId}:
       *   post:
       *     tags:
       *       - Accommodation
       *     description: Users can provide feedback comment on an accomodation facility
       *     parameters:
       *       - in: path
       *         name: accommodationId
       *         schema:
       *           type: string
       *         required: true
       *     produces:
       *       - application/json
       *     requestBody:
       *      description: Accommodation
       *      required: true
       *      content:
       *       application/json:
       *          schema:
       *            $ref: '#/components/schemas/accomodationFeedback'
       *     responses:
       *       201:
       *         description: Feedback submitted successfully
       *         content:
       *          application/json:
       *            schema:
       *              type: object
       *              properties:
       *                status:
       *                  type: object
       *                data:
       *                  $ref: '#/components/schemas/accomodationFeedback'
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
    .post(checkToken, checkBlacklist, validator(accomodationFeedbackSchema),
      checkAccommodationId, accomodationFeedback);
};

export {
  accommodationRoute,
  bookAccommodationRoute,
  accomodationFeedbackRoute
};
