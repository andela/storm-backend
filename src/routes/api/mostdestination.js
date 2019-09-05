import mostDestinationController from '../../controllers/mostDestinationController';
import { checkToken } from '../../middlewares/userMiddlewares';

const { getMostDestinations } = mostDestinationController;

const counterRoutes = (router) => {
  router.route('/mostdestination')
  /**
   * @swagger
   * components:
   *  schemas:
   *    MostDestination:
   *      properties:
   *        id:
   *          type: string
   *          readOnly: true
   *        count:
   *          type: integer
   *        destinationCity:
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
   *          type: object
   */
    /**
     * @swagger
     * /api/v1/mostdestination:
     *   get:
     *     tags:
     *       - Most Travelled
     *     description: Get 10 most travelled destinations
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Get 10 most travelled destinations successfully
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
     *                    $ref: '#/components/schemas/MostDestination'
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
    .get(checkToken, getMostDestinations);
};

export default counterRoutes;
