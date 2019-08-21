
import userController from '../../controllers/userController';

const {
  signUp,
  signIn,
} = userController;
const userRoute = (router) => {
  router.route('/user/signup')

  /**
 * @swagger
 * components:
 *  schemas:
 *    SignUp:
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
 *            $ref: '#/components/schemas/SignUp'
 *     responses:
 *       200:
 *         description: User created successfully
 *       500:
 *         description: Internal Server error
 */

    .post(signUp);

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

    .post(signIn);
};
export default userRoute;
