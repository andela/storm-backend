'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Subrequests', [{
        id: '01282bdb-e23f-4ece-ab08-49a1f618e66a',
        requestId: '0fcda9b7-e17f-4162-88ed-ded031063e53',
        originCity: 'Metropolis City',
        destinationCity: 'Themyscira',
        departureDate: '2019-12-21 17:59:04.305+00',
        reason: 'Meet Wonder Woman',
        accommodation: 'Themyscira Palace'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Subrequest', null, {});
  }
};
