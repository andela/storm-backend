import userController from '../../controllers/userController';
import validate from '../../middlewares/validator';
import { signUpSchema, signInSchema, updateUserSchema } from '../../validation/userSchema';
import checkBlacklist from '../../middlewares/blacklistMiddleware';
import verifyEmailController from '../../controllers/emailVerificationController';
import { checkUserId, checkToken } from '../../middlewares/userMiddlewares';

const {
  signUp,
  signIn,
  logout,
  getUserDetailsById,
  updateUserDetails
} = userController;

const {
  verifyEmail
} = verifyEmailController;

const userRoute = (router) => {
  router.route('/user/signup')

  /**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *         type: string
 *        phoneNo:
 *          type: string
 */

  /**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     tags:
 *       - Users
 *     description: Create a new user account
 *     produces:
 *       - application/json
 *     requestBody:
 *      description: User data object
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *       500:
 *         description: Internal Server error
 */

    .post(validate(signUpSchema), signUp);

  router.route('/user/signin')

  /**
   * @swagger
   * components:
   *  schemas:
   *    SignIn:
   *      properties:
   *        email:
   *          type: string
   *        password:
   *          type: string
   */

  /**
   * @swagger
   * /api/v1/user/signin:
   *   post:
   *     tags:
   *       - Users
   *     description: Authenticate a user with email and password
   *     produces:
   *       - application/json
   *     requestBody:
   *      description: User data object
   *      required: true
   *      content:
   *       application/json:
   *          schema:
   *            $ref: '#/components/schemas/SignIn'
   *     responses:
   *       200:
   *         description: Authenticated user and generated a token
   *       500:
   *         description: Internal Server error
  */

    .post(validate(signInSchema), signIn);
  router.route('/user/logout')

  /**
   * @swagger
   * /api/v1/user/logout:
   *   post:
   *     tags:
   *       - Users
   *     description: Logout user
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Logged out successfully
   *       401:
   *         description: Token missing, you need a token to have access
   *       500:
   *         description: You are already logged out!
   */

    .post(checkBlacklist, logout);

  // Email verification endpoint
  router
    .route('/user/verify/:token')

  /**
   * @swagger
   * /api/v1/user/verify/{token}:
   *   get:
   *     tags:
   *       - Users
   *     summary: Verify email address
   *     description: Verify email address
   *     parameters:
   *      - name: token
   *        in: path
   *        required: true
   *        schema:
   *          type: string
   *     produces:
   *       - application/json
   *     responses:
   *       403:
   *         description: Unauthorized
   *       500:
   *         description: Internal Server error
   */

    .get(verifyEmail);
  router.route('/users/:userId')
  /**
   * @swagger
   * paths:
   *  /api/v1/users/{userId}:
   *    get:
   *     tags:
   *       - Users
   *     summary: Get one user's details
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: string
   *         required: true
   *     responses:
   *       200:
   *         description: User deatails fetched successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server error
   *     security:
   *       - bearerAuth: [ ]
  */
    .get(checkToken, checkUserId, getUserDetailsById)
    /**
     * @swagger
     *  paths:
     *    /api/v1/users/{userId}:
     *      put:
     *        tags:
     *          - Users
     *        summary: Get one user's details
     *        parameters:
     *          - in: path
     *            name: userId
     *            schema:
     *              type: string
     *            required: true
     *        requestBody:
     *          description: User data object
     *          required: true
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/User'
     *        responses:
     *          200:
     *            description: User deatails fetched successfully
     *          403:
     *            description: Unauthorized
     *          404:
     *            description: User not found
     *          500:
     *            description: Internal Server error
     *        security:
     *          - bearerAuth: [ ]
    */
    .put(checkToken, validate(updateUserSchema), checkUserId, updateUserDetails);
};
export default userRoute;
