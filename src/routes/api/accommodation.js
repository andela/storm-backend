import { createAccommodation, bookAccommodation } from '../../controllers/accommodationController';
import { checkToken } from '../../middlewares/userMiddlewares';
import validate from '../../middlewares/validator';
import { accommodationSchema, bookAccommodationSchema } from '../../validation/accommodationSchema';

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
   *          type: string
   *        numOfRooms:
   *          type: integer
   *        description:
   *          type: string
   *        facilities:
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
    .post(checkToken, validate(accommodationSchema), createAccommodation);
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
    .post(checkToken, validate(bookAccommodationSchema), bookAccommodation);
};

export {
  accommodationRoute,
  bookAccommodationRoute
};
