
/**
 * @function calculateLimitAndOffset
 * @param {number} page page number to get
 * @param {number} perPage number of items per page/request
 * @param {number} defaultLimit default items per page = 50
 * @returns {object} returns object containing limit and offset
 */
export const calculateLimitAndOffset = (page, perPage, defaultLimit = 20) => {
  const offset = (page ? Number(page) - 1 : 0) * (perPage ? Number(perPage) : defaultLimit);
  const limit = perPage ? Number(perPage) : defaultLimit;
  return { offset, limit };
};

/**
 * @function paginate
 * @param {number} page page number to get
 * @param {number} perPage number of items per page/request
 * @param {number} count total number of items
 * @param {array} rows items
 * @param {number} defaultLimit default items per page = 20
 * @returns {object} return the meta for pagination
 */
export const paginate = (page, perPage, count, rows, defaultLimit = 20) => {
  const meta = {
    page: Number(page) || 1,
    pageCount: Math.ceil(count / (perPage ? Number(perPage) : defaultLimit)),
    pageSize: rows.length,
    count
  };
  return meta;
};
