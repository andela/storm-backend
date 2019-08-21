const DbServices = {
  /**
   * Database create service funcion
   * @param {Object} model - Defined model
   * @param {Object} data - Data to be created
   * @returns {Promise} - Promise response
   */
  create(model, data) {
    return model.create(data);
  },

  /**
   * @param {object} model model /table
   * @param {string} id id of row to get
   * @param {object} options query options
   * @returns {Promise} Promise resolved or rejected
   * @description get one row by the id been passed to it
   */
  getById(model, id, options) {
    return model.findByPk(id, options);
  },
};

export default DbServices;
