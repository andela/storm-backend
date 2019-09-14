/* eslint-disable arrow-body-style */
import models from '../models';

const { Rating } = models;

/**
 * @method createRating
 * @param {string} userId user's id
 * @param {string} accommodationId accomodation's id
 * @param {string} value rating value
 * @returns {promise} sequelize response
 * @description Create a rating
*/
export const createRating = async (userId, accommodationId, value) => {
  const rating = await Rating.findOne({ where: { userId, accommodationId } });
  if (rating) return Rating.update({ value }, { where: { id: rating.id } });
  return Rating.create({ userId, accommodationId, value });
};

/**
 * @method getAverageRating
 * @param {array} ratings ratings
 * @returns {integer} average ratings
 * @description Calculates the average rating from an array of ratings object
*/
const getAverageRating = (ratings) => {
  if (!ratings.length) return 0;
  const values = ratings.map((rating) => rating.value);
  const getLength = (n) => values.filter((value) => value === n).length;
  const [fives, fours, threes, twos, ones] = [
    getLength(5), getLength(4), getLength(3), getLength(2), getLength(1)
  ];
  const numerator = (5 * fives) + (4 * fours) + (3 * threes) + (2 * twos) + ones;
  const denominator = fives + fours + threes + twos + ones;
  const average = numerator / denominator;
  return Math.round(average);
};

/**
 * @method getAverageRatingByAccommodation
 * @param {accommodation} accommodation accommodation object returned by sequelize
 * @returns {object} ratings data
 * @description gets the avarate rating for an accommodation
*/
export const getAverageRatingByAccommodation = async (accommodation) => {
  const ratingsArr = await accommodation.getRatings();
  return { value: getAverageRating(ratingsArr), count: ratingsArr.length };
};
