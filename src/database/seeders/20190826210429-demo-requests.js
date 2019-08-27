'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Requests', [
      {
        id: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
        type: 'return',
        originCity: 'Lagos',
        destinationCity: 'Istanbul',
        userId: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
        departureDate: '01-07-2017',
        createdAt: new Date(),
        updatedAt: new Date(),
        returnDate: '02-08-2017',
        reason: 'Check stocks',
        accommodation: 'Great Istanbul Arena',
        approvalStatus: false
      },
      {
        id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
        type: 'return',
        originCity: 'Abuja',
        destinationCity: 'Lagos',
        departureDate: '01-07-2017',
        userId: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
        createdAt: new Date(),
        updatedAt: new Date(),
        returnDate: '02-08-2017',
        reason: 'Annual meeting',
        accommodation: 'Eko Hotels & Suites',
        approvalStatus: true
      }, {
        id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        type: 'return',
        originCity: 'Abuja',
        destinationCity: 'Lagos',
        departureDate: '01-07-2018',
        userId: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
        createdAt: new Date(),
        updatedAt: new Date(),
        returnDate: '02-08-2018',
        reason: 'Annual meeting',
        accommodation: 'Eko Hotels & Suites',
        approvalStatus: true
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Requests', null, {});
  }
};
