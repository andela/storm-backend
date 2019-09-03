import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import {
  create, findByEmail
} from '../services/userServices';
import MockStrategy from '../test/mockData/mockStrategy';


const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  GOOGLE_APP_ID,
  GOOGLE_APP_SECRET,
  BACKEND_BASE_URL,
} = process.env;

const baseUrl = BACKEND_BASE_URL;

const facebookConfig = {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: `${baseUrl}/api/v1/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'displayName'],
};

const googleConfig = {
  clientID: GOOGLE_APP_ID,
  clientSecret: GOOGLE_APP_SECRET,
  callbackURL: `${baseUrl}/api/v1/auth/google/callback`
};

const facebookCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const { _json: userDetails } = profile;
    const { email } = userDetails;
    let user = await findByEmail(email) || null;
    if (!user) {
      // create user
      const [firstName, lastName] = userDetails.name.split(' ');
      const newUser = {};
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      user = await create(newUser);
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
};

const googleCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const { _json: userDetails } = profile;
    const { email } = userDetails;
    let user = await findByEmail(email) || null;
    if (!user) {
      // create user
      const newUser = {};
      newUser.firstName = userDetails.given_name;
      newUser.lastName = userDetails.family_name;
      newUser.email = email;
      user = await create(newUser);
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
};

if (process.env.NODE_ENV === 'test') {
  passport.use(new MockStrategy('facebook', facebookCallback));
  passport.use(new MockStrategy('google', googleCallback));
} else {
  passport.use(new FacebookStrategy(
    facebookConfig, facebookCallback
  ));
  passport.use(new GoogleStrategy(
    googleConfig, googleCallback
  ));
}
