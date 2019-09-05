import models from '../models';

const { Request, Mostdestination } = models;
/** helper function that adds request destinationCity count
 * @param {String} requestId - request id for the destination
 * @returns {Promise} Promise resolved or rejected
 */
const addOrCreateCounter = async (requestId) => {
  const requestApproved = await Request.findByPk(requestId);
  const destinationCity = requestApproved.destinationCity.toLowerCase();
  const toBeUpdated = await Mostdestination.findOrCreate({
    where: { destinationCity }, defaults: { count: 0 }
  });
  await toBeUpdated[0].increment('count');
};

export default addOrCreateCounter;
