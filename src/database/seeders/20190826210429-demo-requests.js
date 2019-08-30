export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Requests', [
      {
        id: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
        type: 'return',
        originCity: 'Lagos',
        destinationCity: 'Istanbul',
        userId: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
        departureDate: '01-07-2017',
        returnDate: '02-08-2017',
        reason: 'Check stocks',
        accommodation: 'Great Istanbul Arena',
        approvalStatus: 'rejected'
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
        id: '7093b8ef-83e7-4b8f-a9a2-f020ddda9d24',
        userId: 'f71235bc-cd87-11e9-a32f-2a2ae2dbcce4',
        type: 'return',
        originCity: 'lagos',
        destinationCity: 'bahamas',
        departureDate: '2019-09-21 17:59:04.305+00',
        returnDate: '2020-08-21 17:59:04.305+00',
        reason: 'vacation',
        accommodation: 'Hotel Transylvania',
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Requests', null, {});
  }
};
