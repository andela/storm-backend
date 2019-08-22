import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import models from '../database/models';

const { User } = models;

/**
 * Helper function to create a new user
 * @param {Object} user - user's object
 * @returns {Promise} - sequelize response
*/
export const create = (user) => User.create(user);

/**
 * Helper function to find a user by email
 * @param {String} email - user's email
 * @returns {Promise} - sequelize response
*/
export const findByEmail = (email) => User.findOne({ where: { email } });

/**
 * Helper function to find a user by id
 * @param {String} id - user's id
 * @returns {Promise} - sequelize response
 */
export const findById = (id) => User.findOne({ where: { id } });

/**
 * Helper function to find a user by phone
 * @param {String} phoneNo - user's phone number
 * @returns {Promise} - sequelize response
 */
export const findByPhone = (phoneNo) => User.findOne({ where: { phoneNo } });

/**
 * Helper function to find a user by either email or phone
 * @param {String} email - user's email address
 * @param {String} phoneNo - user's phone number
 * @returns {Promise} - sequelize response
 */
export const findByEmailOrPhone = (email, phoneNo) => User.findOne({
  where: { [Op.or]: [{ phoneNo }, { email }] }
});

/**
 * Helper function to compare the password provided with the user's hashed password
 * @param {String} password - provided password
 * @param {String} hash - user's hashed password
 * @returns {Promise} - bcrypt response
*/
export const comparePasswords = (password, hash) => bcrypt.compare(password, hash);
