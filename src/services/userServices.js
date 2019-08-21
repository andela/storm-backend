import bcrypt from 'bcrypt';
import models from '../database/models';

const { User } = models;

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
 * Helper function to compare the password provided with the user's hashed password
 * @param {String} password - provided password
 * @param {String} hash - user's hashed password
 * @returns {Promise} - bcrypt response
*/
export const comparePasswords = (password, hash) => bcrypt.compare(password, hash);
