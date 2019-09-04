import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY;

/**
   * Generate JWT
   * @param {Object} payload - object literal resource to be encoded
   *  @param {Object} expiresIn - object literal resource to be encoded
   * @returns {String} - jwt token
   */
const generateToken = (payload, expiresIn = '7d') => {
  const token = jwt.sign({ ...payload }, secret, { expiresIn });
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

export const verifyResetPasswordToken = async (token) => {
  const decoded = await jwt.verify(token, process.env.SECRET_KEY, (error) => {
    if (error) {
      return 'password reset link is invalid or has expired';
    }
  });
  return decoded;
};

export default {
  generateToken
};
