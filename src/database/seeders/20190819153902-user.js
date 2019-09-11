import roles from '../../utils/roles';
import { hashPassword } from '../../utils/authHelper';

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: '38eb202c-3f67-4eed-b7ac-9c31bc226e0c',
        firstName: 'line',
        lastName: 'manager',
        email: 'linemanager@gmail.com',
        password: hashPassword('Password'),
        phoneNo: '2347033545645',
        verified: true,
        roleId: roles.MANAGER,
      },
      {
        id: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
        firstName: 'James',
        lastName: 'Williams',
        email: 'jammy@gmail.com',
        phoneNo: '2347032123304',
        password: hashPassword('jammy11167'),
        verified: true,
        roleId: roles.SUPER_ADMIN
      },
      {
        id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
        firstName: 'Samuel',
        lastName: 'Ladapo',
        email: 'samuelman@gmail.com',
        password: hashPassword('samman12358'),
        phoneNo: null,
        verified: false,
        roleId: roles.MANAGER,
        lineManager: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5'
      }, {
        id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        firstName: 'Manager',
        lastName: 'Jude',
        email: 'judecodes@gmail.com',
        password: hashPassword('password'),
        phoneNo: '2347032123404',
        verified: true,
        roleId: roles.MANAGER,
        lineManager: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
      }, {
        id: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
        firstName: 'Requester',
        lastName: 'Jude',
        email: 'judecodes@yahoo.com',
        password: hashPassword('password'),
        phoneNo: '2347032123409',
        lineManager: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        roleId: roles.REQUESTER,
        verified: true
      },
      {
        id: '2999c776-0f6f-471d-bced-b661d6e75586',
        firstName: 'request',
        lastName: 'man',
        email: 'requestman@gmail.com',
        password: hashPassword('requestman'),
        phoneNo: '2347032746854',
        lineManager: '38eb202c-3f67-4eed-b7ac-9c31bc226e0c',
        roleId: roles.REQUESTER,
        verified: true
      },
      {
        id: '3e747d71-4fa1-4934-af9d-13926eb2d063',
        firstName: 'Mrs',
        lastName: 'Somebody',
        email: 'freewoman@gmail.com',
        password: hashPassword('polly123456'),
        phoneNo: '2347032123509',
        verified: true,
        lineManager: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        verified: true,
        roleId: roles.REQUESTER,
      },
      {
        id: '98686f96-3452-4420-a093-8f2fbba1ff05',
        firstName: 'Kazeem',
        lastName: 'Odutola',
        email: 'kazmobileapp@gmail.com',
        password: hashPassword('Kazeem27'),
        phoneNo: '2347039387595',
        lineManager: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        verified: true,
        roleId: roles.TRAVEL_ADMIN,
      },
      {
        id: 'a2ff3c34-4b2b-449e-aa35-6587f56fdff3',
        firstName: 'Kazeem',
        lastName: 'Odutola',
        email: 'odutolak@gmail.com',
        password: hashPassword('Kazeem27'),
        phoneNo: '2347032123522',
        verified: true,
        lineManager: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        roleId: roles.ACCOMMODATION_SUPPLIER,
      },
      {
        id: 'c1b0a0fc-7536-4152-8837-6a5348ba9566',
        firstName: 'bruce',
        lastName: 'wayne',
        email: 'brucewayne@gmail.com',
        password: hashPassword('brucewayne'),
        phoneNo: '2347032444332',
        lineManager: '38eb202c-3f67-4eed-b7ac-9c31bc226e0c',
        verified: true
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
