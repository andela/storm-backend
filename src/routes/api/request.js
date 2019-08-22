import requestController from '../../controllers/requestController';
import validate from '../../middlewares/validator';
import requestSchema from '../../validation/requestSchema';
import { verifyToken } from '../../middlewares/userMiddlewares';

const { requestTrip } = requestController;
const { requestTripSchema } = requestSchema;

const requestRoute = (router) => {
  router.route('/requests')
  /**
   * @swagger
   * components:
   *  schemas:
   *    RequestTrip:
   *      properties:
   *        id:
   *          type: string
   *          readOnly: true
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
   *        approvalStatus:
   *          type: string
   *          readOnly: true
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
    .post(verifyToken, validate(requestTripSchema), requestTrip);
};

export default requestRoute;
