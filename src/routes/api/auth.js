import passport from 'passport';
import userController from '../../controllers/userController';
import '../../config/passport';

const {
  socialAuth
} = userController;


const authRoute = (router) => {
  router.route('/auth/google')

  /**
   * @swagger
   * /api/v1/auth/google:
   *   post:
   *     tags:
   *       - Users
   *     description: Authenticate a user with email and password using google
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Authenticated user and generated a token
   *       500:
   *         description: Internal Server error
  */
    .get(passport.authenticate('google', {
      scope:
      ['profile', 'email']
    }));

  router.get('/auth/google/callback', passport.authenticate('google', { session: false }), socialAuth);
  router.route('/auth/facebook')

  /**
   * @swagger
   * /api/v1/auth/facebook:
   *   post:
   *     tags:
   *       - Users
   *     description: Authenticate a user with email and password using facebook
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Authenticated user and generated a token
   *       500:
   *         description: Internal Server error
  */

    .get(passport.authenticate('facebook', { scope: ['email'] }));
  router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), socialAuth);
};

export default authRoute;
