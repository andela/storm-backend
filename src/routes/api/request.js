import requestController from '../../controllers/requestController';
import validate from '../../middlewares/validator';
import requestSchema from '../../validation/requestSchema';
import { checkToken } from '../../middlewares/userMiddlewares';

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
     *                  type: string
     *                  example: success
     *                data:
     *                  allOf:
     *                    - $ref: '#/components/schemas/RequestTrip'
     *                    - type: object
     *                      properties:
     *                        userId:
     *                          type: string
     *                          format: uuid
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
    .post(checkToken, validate(requestTripSchema), requestTrip);
};

export default requestRoute;
