import roles from '../../utils/roles';
import { hashPassword } from '../../utils/authHelper';

export default {
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
        verified: true,
        roleId: roles.SUPER_ADMIN,
      },
      {
        id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
        firstName: 'Samuel',
        lastName: 'Ladapo',
        email: 'samuelman@gmail.com',
        password: hashPassword('samman12358'),
        phoneNo: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        verified: false,
        roleId: roles.MANAGER,
      }, {
        id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        firstName: 'Police',
        lastName: 'man',
        email: 'polman@gmail.com',
        password: hashPassword('polly11167'),
        phoneNo: '2347032123404',
        createdAt: new Date(),
        updatedAt: new Date(),
        verified: true,
        roleId: roles.REQUESTER,
      }, {
        id: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
        firstName: 'Mr',
        lastName: 'Nobody',
        email: 'freeman@gmail.com',
        password: hashPassword('polly123456'),
        phoneNo: '2347032123409',
        createdAt: new Date(),
        updatedAt: new Date(),
        verified: true,
        lineManager: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        roleId: roles.REQUESTER,
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
