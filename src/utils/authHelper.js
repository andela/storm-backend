import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY;

/**
   * Generate JWT
   * @param {Object} payload - object literal resource to be encoded
   * @returns {String} - jwt token
   */
const generateToken = (payload) => {
  const token = jwt.sign({ ...payload }, secret, { expiresIn: '7 days' });
  return token;
};

export default { generateToken };
