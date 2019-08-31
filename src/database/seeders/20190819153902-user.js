const { hashPassword } = require('../../utils/authHelper')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
        firstName: 'James',
        lastName: 'Williams',
        email: 'jammy@gmail.com',
        phoneNo: '2347032123304',
        password: hashPassword('jammy11167'),
        createdAt: new Date(),
        updatedAt: new Date(),
        verified: true
      },
      {
        id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
        firstName: 'Samuel',
        lastName: 'Ladapo',
        email: 'samuelman@gmail.com',
        password: hashPassword('samman'),
        phoneNo: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        verified: true
      }, {
        id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        firstName: 'Police',
        lastName: 'man',
        email: 'polman@gmail.com',
        password: hashPassword('polly11167'),
        phoneNo: '2347032123404',
        createdAt: new Date(),
        updatedAt: new Date(),
        verified: true
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
