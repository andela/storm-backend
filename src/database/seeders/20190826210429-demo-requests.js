export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Requests', [
      {
        id: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
        type: 'return',
        originCity: 'Lagos',
        destinationCity: 'Istanbul',
        userId: '98686f96-3452-4420-a093-8f2fbba1ff05',
        departureDate: '2019-09-01T00:00:00.000Z',
        returnDate: '2019-10-07T00:00:00.000Z',
        reason: 'Check stocks',
        accommodation: 'Great Istanbul Arena',
        approvalStatus: 'rejected',
        multiCity: false
      },

      {
        id: '8fac5db3-0537-4ff5-9547-4800a0ec2c45',
        type: 'return',
        originCity: 'Lagos',
        destinationCity: 'Istanbul',
        userId: '98686f96-3452-4420-a093-8f2fbba1ff05',
        departureDate: '2019-08-25T00:00:00.000Z',
        returnDate: '2019-09-01T00:00:00.000Z',
        reason: 'Check stocks',
        accommodation: 'Great Istanbul Arena',
        approvalStatus: 'accepted',
        multiCity: false
      },

      {
        id: '96a267fc-1852-4c12-9acf-bcb37d81e8bc',
        type: 'return',
        originCity: 'Lagos',
        destinationCity: 'Istanbul',
        userId: '98686f96-3452-4420-a093-8f2fbba1ff05',
        departureDate: '2019-08-31T00:00:00.000Z',
        returnDate: '2019-09-07T00:00:00.000Z',
        reason: 'Check stocks',
        accommodation: 'Great Istanbul Arena',
        approvalStatus: 'pending',
        multiCity: false
      },

      {
        id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
        type: 'return',
        originCity: 'Abuja',
        destinationCity: 'Lagos',
        departureDate: '2019-01-07T00:00:00.000Z',
        userId: '98686f96-3452-4420-a093-8f2fbba1ff05',
        returnDate: '2019-01-07T00:00:00.000Z',
        reason: 'Annual meeting',
        accommodation: 'Eko Hotels & Suites',
        approvalStatus: 'accepted',
        multiCity: false
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
        approvalStatus: 'accepted',
        multiCity: false
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
        approvalStatus: 'accepted',
        multiCity: false
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
        approvalStatus: 'accepted',
        multiCity: false
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
        approvalStatus: 'pending',
        multiCity: false
      },
      {
        id: 'ba94c67b-1d18-4628-ab12-ce2efe46f00b',
        type: 'return',
        originCity: 'Abuja',
        destinationCity: 'Lagos',
        departureDate: '01-07-2018',
        userId: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        returnDate: '02-08-2018',
        reason: 'Annual meeting',
        accommodation: 'Eko Hotels & Suites',
        approvalStatus: 'accepted',
        multiCity: false
      },
      {
        id: '0fcda9b7-e17f-4162-88ed-ded031063e53',
        userId: 'c1b0a0fc-7536-4152-8837-6a5348ba9566',
        type: 'return',
        originCity: 'Gotham City',
        destinationCity: 'Metropolis',
        departureDate: '2019-11-21 17:59:04.305+00',
        returnDate: '2020-08-21 17:59:04.305+00',
        reason: 'Meet Superman',
        accommodation: 'Metropolis Hotel',
        approvalStatus: 'pending',
        multiCity: true
      },
      {
        id: '707969c1-a4c1-4f58-a683-b86f01a94e31',
        userId: 'c1b0a0fc-7536-4152-8837-6a5348ba9566',
        type: 'return',
        originCity: 'Metropolis',
        destinationCity: 'Gotham City',
        departureDate: '2019-10-21 17:59:04.305+00',
        returnDate: '2020-03-21 17:59:04.305+00',
        reason: 'Kill The Joker',
        accommodation: 'Wayne Mansion',
        approvalStatus: 'accepted',
        multiCity: false
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Requests', null, {});
  }
};
