import messages from '../utils/messages';
import response from '../utils/response';
import userRoute from './api/user';
import { requestRoute, searchRequestRoute } from './api/request';
import notificationRoutes from './api/notification';
import authRoute from './api/auth';
import chatRoutes from './api/chat';
import { accommodationRoute, bookAccommodationRoute, accomodationFeedbackRoute } from './api/accommodation';
import mostDestinationRoutes from './api/mostdestination';
import commentRoute from './api/comment';

const routes = (router) => {
  router
    .route('/')
    /**
     * @swagger
     * /api/v1:
     *   get:
     *     tags:
     *      - name: Welcome Message Endpoint
     *     summary: Welcome message endpoint
     *     description: Endpoint returns welcome message
     *     responses:
     *      200:
     *        description: Successful operation
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/welcomeResponse'
     * components:
     *   schemas:
     *     welcomeResponse:
     *       type: object
     *       properties:
     *         status:
     *           type: string
     *         data:
     *           type: object
     *           properties:
     *             message:
     *               type: string
     */
    .get((req, res) => response(res, 200, 'success', {
      message: messages.apiV1Welcome,
    }));

  // user routes
  userRoute(router);
  // request routes
  requestRoute(router);
  // notification routes
  notificationRoutes(router);
  // social auth routes
  authRoute(router);
  // chat routes
  chatRoutes(router);
  // accommodation routes
  accommodationRoute(router);
  // Most Destination routes
  mostDestinationRoutes(router);
  // admin can search request
  searchRequestRoute(router);
  // book accommodation facility
  bookAccommodationRoute(router);
  // feedback accomodation routes
  accomodationFeedbackRoute(router);
  // comment routes
  commentRoute(router);
};

export default routes;
