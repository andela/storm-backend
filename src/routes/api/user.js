import userController from '../../controllers/userController';
import validate from '../../middlewares/validator';
import {
  signUpSchema, signInSchema, updateUserSchema, getUserSchema,
  setUserRoleSchema, emailSchema, passwordSchema
} from '../../validation/userSchema';
import checkBlacklist from '../../middlewares/blacklistMiddleware';
import verifyEmailController from '../../controllers/emailVerificationController';
import { checkUserId, checkToken } from '../../middlewares/userMiddlewares';
import authorize from '../../middlewares/authorizer';
import roles from '../../utils/roles';

const {
  signUp,
  signIn,
  logout,
  getUserDetailsById,
  updateUserDetails,
  forgotPassword,
  resetPassword,
  setUserRole,
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

    .post(checkToken, checkBlacklist, logout);

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
  router.route('/users')
    /**
     * @swagger
     * paths:
     *  /api/v1/users:
     *    get:
     *     tags:
     *       - Users
     *     summary: Get one user's details
     *     parameters:
     *       - in: query
     *         name: userId
     *         schema:
     *           type: string
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
    .get(checkToken, validate(getUserSchema), checkUserId, getUserDetailsById);
  router.route('/users/:userId')
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
  router.route('/forgot/password')
  /**
       * @swagger
       * components:
       *  schemas:
       *    forgotPassword:
       *      properties:
       *        email:
       *          type: string
       */
    /**
       * @swagger
       * /api/v1/forgot/password:
       *  post:
       *     tags:
       *       - Users
       *     name: Reset Password Link
       *     summary: Reset Password Link
       *     consumes:
       *       - application/json
       *     requestBody:
       *      description: User data object
       *      required: true
       *      content:
       *       application/json:
       *          schema:
       *            $ref: '#/components/schemas/forgotPassword'
       *     responses:
       *       '200':
       *         description: Check your mail to reset your password
       *       '403':
       *         description: Password reset link is invalid or has expired
       */
    .post(validate(emailSchema), forgotPassword);
  router.route('/reset/password/:userId/:token')
  /**
       * @swagger
       * components:
       *  schemas:
       *    resetPassword:
       *      properties:
       *        password:
       *          type: string
       */
    /**
           * @swagger
           *  paths:
           *    /api/v1/reset/password/{userId}/{token}:
           *      patch:
           *        tags:
           *          - Users
           *        summary: Update Password
           *        parameters:
           *          - in: path
           *            name: userId
           *            schema:
           *              type: string
           *            required: true
           *          - in: path
           *            name: token
           *            schema:
           *               type: string
           *            required: true
           *        requestBody:
           *          description: User data object
           *          required: true
           *          content:
           *            application/json:
           *              schema:
           *                $ref: '#/components/schemas/resetPassword'
           *        responses:
           *          200:
           *            description: Password updated successfully
           *          404:
           *            description: "password is required"
           *          500:
           *            description: Internal Server error
          */
    .patch(validate(passwordSchema), resetPassword);

  router.route('/users/:userId')
    /**
     * @swagger
     * /api/v1/users/{userId}:
     *   patch:
     *     tags:
     *       - Users
     *     summary: Change the user role
     *     description: Change the user role
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name: userId
     *        schema:
     *          type: string
     *          format: uuid
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *       application/json:
     *          schema:
     *            type: object
     *            properties:
     *              role:
     *                type: string
     *                enum: [requester, travel-admin, travel-team-member, manager, super-admin]
     *     responses:
     *       200:
     *         description: User role successfully changed
     *         content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                status:
     *                  type: string
     *                  example: success
     *                data:
     *                  type: string
     *                  example: User role successfully changed
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
    .patch(checkToken, validate(setUserRoleSchema),
      authorize([roles.SUPER_ADMIN]), checkUserId, setUserRole);
};

export default userRoute;
