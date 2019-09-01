export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Requests', [
      {
        id: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
        type: 'return',
        originCity: 'Lagos',
        destinationCity: 'Istanbul',
        userId: '3e747d71-4fa1-4934-af9d-13926eb2d063',
        departureDate: '01-07-2017',
        returnDate: '02-08-2017',
        reason: 'Check stocks',
        accommodation: 'Great Istanbul Arena',
        approvalStatus: 'pending'
      },
      {
        id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
        type: 'return',
        originCity: 'Abuja',
        destinationCity: 'Lagos',
        departureDate: '01-07-2017',
        userId: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
        returnDate: '02-08-2017',
        reason: 'Annual meeting',
        accommodation: 'Eko Hotels & Suites',
        approvalStatus: 'accepted'
      }, 
      {
        id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        type: 'return',
        originCity: 'Abuja',
        destinationCity: 'Lagos',
        departureDate: '01-07-2018',
        userId: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
        returnDate: '02-08-2018',
        reason: 'Annual meeting',
        accommodation: 'Eko Hotels & Suites',
        approvalStatus: 'accepted'
      }, 
      {
        id: 'b2092fb0-502a-4105-961f-2d310d340168',
        type: 'return',
        originCity: 'lagos',
        destinationCity: 'bahamas',
        departureDate: '2019-09-21 17:59:04.305+00',
        returnDate: '2020-08-21 17:59:04.305+00',
        reason: 'vacation',
        accommodation: 'Hotel Transylvania',
        userId: '3e747d71-4fa1-4934-af9d-13926eb2d063',
        approvalStatus: 'accepted'
      }, {
        id: 'd2b80fd4-e9f2-4c2d-b56c-fabc41821f7d',
        type: 'return',
        originCity: 'Abuja',
        destinationCity: 'Lagos',
        departureDate: '01-07-2018',
        userId: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
        returnDate: '02-08-2018',
        reason: 'Annual meeting',
        accommodation: 'Eko Hotels & Suites',
        approvalStatus: 'accepted'
      }, {
        id: '3e747d71-4fa1-4934-af9d-13926eb2d063',
        type: 'return',
        originCity: 'Abuja',
        destinationCity: 'Lagos',
        departureDate: '01-07-2018',
        userId: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
        returnDate: '02-08-2018',
        reason: 'Annual meeting',
        accommodation: 'Eko Hotels & Suites',
        approvalStatus: 'pending'
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Requests', null, {});
  }
};
