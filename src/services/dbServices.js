/**
   * Database create service funcion
   * @param {Object} model - Defined model
   * @param {Object} data - Data to be created
   * @returns {Promise} - Promise response
   */
const create = (model, data) => model.create(data);

export default create;
