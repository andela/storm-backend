import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY;

/**
   * Generate JWT
   * @param {Object} payload - object literal resource to be encoded
   * @returns {String} - jwt token
   */
export const generateToken = (payload) => {
  const token = jwt.sign({ ...payload }, secret, { expiresIn: '7 days' });
  return token;
};

/**
 * @function verifyToken
 * @param {String} token jwt token
 * @returns {Object} decoded object
 */
export const verifyToken = async (token) => {
  const decoded = await jwt.verify(token, process.env.SECRET_KEY);
  return decoded;
};
  /**
   * Generate verification token for a user
   *
   * @memberof User
   *
   *
   * @returns {string} user token
   */
export const generateVerificationToken = (...payload) => jwt.sign({ ...payload }, secret, { expiresIn: '10m' });
/**
   * Decode verification token for a user
   *
   * @memberof User
   *
   * @param {string} token
   *
   * @returns {string} decoded token
   */
export const decodeVerificationToken = (token) => jwt.verify(token, secret);

export default {
  generateToken, generateVerificationToken, verifyToken, decodeVerificationToken
};
