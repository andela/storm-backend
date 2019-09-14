import officeLocationController from '../../controllers/officeLocationController';
import checkBlacklist from '../../middlewares/blacklistMiddleware';
import { checkToken } from '../../middlewares/userMiddlewares';
import validate from '../../middlewares/validator';
import authorize from '../../middlewares/authorizer';
import roles from '../../utils/roles';
import officeLocationSchema from '../../validation/officeLocationSchema';

const { SUPER_ADMIN } = roles;

const { getLocation, postLocation, getLocationById } = officeLocationController;
const { createLocationSchema, getLocationByIdSchema } = officeLocationSchema;

const officeLocationRoutes = (router) => {
  router.route('/officelocation')
  /**
   * @swagger
   * components:
   *  schemas:
   *    OfficeLocationResponse:
   *      properties:
   *        name:
   *          type: string
   *        description:
   *          type: string
   *        address:
   *          type: string
   *        phoneNo:
   *          type: string
   *        latitude:
   *         type: string
   *        longitude:
   *          type: string
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
   * /api/v1/officelocation:
   *   get:
   *     tags:
   *       - Office Locations
   *     description: Get all office locations
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Get all office locations was successful
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
   *                  description: array of office locations
   *                  items:
   *                    $ref: '#/components/schemas/OfficeLocationResponse'
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
    .get(checkToken, checkBlacklist, getLocation)

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
   * /api/v1/officelocation:
   *   post:
   *     tags:
   *       - Office Locations
   *     description: Create new office location
   *     produces:
   *       - application/json
   *     requestBody:
   *      description: Office location data object
   *      required: true
   *      content:
   *       application/json:
   *          schema:
   *            $ref: '#/components/schemas/OfficeLocationResponse'
   *     responses:
   *       200:
   *         description: office location created successfully
   *       500:
   *         description: Internal Server error
   *     security:
   *      - bearerAuth: []
   */
    .post(checkToken, checkBlacklist,
      authorize([SUPER_ADMIN]), validate(createLocationSchema), postLocation);

  router.route('/officelocation/:locationId')
  /**
   * @swagger
   * /api/v1/officelocation/{locationId}:
   *   get:
   *     tags:
   *       - Office Locations
   *     description: Get office location by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: locationId
   *         schema:
   *           type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Get office location was successful
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
   *                  description: object of office location
   *                  $ref: '#/components/schemas/OfficeLocationResponse'
   *
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
    .get(checkToken, checkBlacklist, validate(getLocationByIdSchema), getLocationById);
};

export default officeLocationRoutes;
