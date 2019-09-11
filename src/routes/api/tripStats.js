import getUserXtripStat from '../../controllers/userTripStatsController';
import { checkToken } from '../../middlewares/userMiddlewares';
import checkBlacklist from '../../middlewares/blacklistMiddleware';

const tripStats = (router) => {
  router.route('/stats/requests')
  /**
   * @swagger
   * /api/v1/stats/requests:
   *   get:
   *     tags:
   *       - Requests
   *     description: Get all trip requests stats
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Get request stats successful
   *         content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  example: success
   *       500:
   *         description: Internal Server error
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/ErrorResponse'
   *     security:
   *       - bearerAuth: []
  */
    .get(checkToken, checkBlacklist, getUserXtripStat);
};

export default tripStats;
