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

  /**
   * @param {object} model model /table
   * @param {object} options query options
   * @returns {Promise} Promise resolved or rejected
   * @description get one row by the options been passed to it
   */
  getByOptions(model, options) {
    return model.findOne(options);
  },

  /**
   * @param {object} model model /table
   * @param {object} updateInfo columns with values to update
   * @param {object} options columns with values to update
   * @returns {Promise} Promise resolved or rejected
   * @description updates one row whose details is passed to as argument in options with the
   * values in updateInfo
   */
  update(model, updateInfo, options) {
    return model.update(
      updateInfo,
      options
    );
  },

  /**
   * @param {object} model model /table
   * @param {object} options query options
   * @returns {Promise} Promise resolved or rejected
   * @description gets all items that fit the criteria and returns rows and count
   */
  getAll(model, options) {
    return model.findAndCountAll(options);
  },

  /**
   * @param {object} model model /table
   * @param {object} options query options
   * @returns {Promise} Promise resolved or rejected
   * @description gets all items that fit the criteria and returns rows and count
   */
  getAllRecord(model, options) {
    return model.findAll(options);
  },

  /**
   * Database create service funcion
   * @param {Object} model - Defined model
   * @param {Array} data - Data to be created
   * @returns {Promise} - Promise response
   */
  bulkCreate(model, data) {
    return model.bulkCreate(data, { returning: true });
  },

  /**
   * @param {object} model primary model /table
   * @param {string} id the id (primary model /table)
   * @param {object} modelDetailsToInclude object containing 3 properties (secondary model /table)
   * @param {object} modelDetailsToInclude.model secondary model /table
   * @param {string} modelDetailsToInclude.alias alias of secondary model /table
   * @param {object} modelDetailsToInclude.column column of secondary model /table
   * @returns {Promise} Promise resolved or rejected
   * @description gets data from a primary table and also joins data from a secondary table
   *
   * @example
   *   getTwoTables(Request, 1, { model: User, alias: 'User', column: { lineManager: managerId } })
   */
  findOneIncludeModel(model, id, modelDetailsToInclude) {
    return model.findOne({
      where: { id },
      include: [
        {
          model: modelDetailsToInclude.model,
          as: modelDetailsToInclude.alias,
          where: modelDetailsToInclude.column
        }
      ]
    });
  }
};

export default DbServices;
