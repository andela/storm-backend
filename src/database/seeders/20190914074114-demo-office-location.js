'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('OfficeLocations', [
      {
        id: '122a0d86-8b78-4bb8-b28f-8e5f7811c477',
        name: 'Lagos Mainland Branch',
        description: 'GPRINTS NIGERIA, Osho Street, Lagos',
        address: 'GPRINTS NIGERIA, Osho Street, Lagos',
        phoneNo: '08022835496',
        latitude: '6.524990',
        longitude: '3.381760',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '122a0d86-8b78-4bb8-b28f-8e5f7811c487',
        name: 'Abuja Branch',
        description: 'Atiku Abubakar Plaza, Trade Fair Complex,, Badagry Expressway, Trade Fair Complex 102109, Ojo',
        address: 'Atiku Abubakar Plaza, Trade Fair Complex,, Badagry Expressway, Trade Fair Complex 102109, Ojo',
        phoneNo: '08022835496',
        latitude: '-29.500030',
        longitude: '-63.693770',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '122a0d86-8b78-4bb8-b28f-8e5f7811c489',
        name: 'Rivers Branch',
        description: 'Port Harcourt Rivers NG, 62 Aggrey Rd, Port Harcourt 500272, River State',
        address: 'Port Harcourt Rivers NG, 62 Aggrey Rd, Port Harcourt 500272, River State',
        phoneNo: '08022836496',
        latitude: '4.761790',
        longitude: '7.023810',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '122a0d86-8b78-4bb8-b78f-8e5f7811c487',
        name: 'Kano Branch',
        description: '110 Murtala Mohammed Rd, Kofar Mazugal, Kano',
        address: '110 Murtala Mohammed Rd, Kofar Mazugal, Kano',
        phoneNo: '09023835496',
        latitude: '12.007560',
        longitude: '8.556870',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('OfficeLocations', null, {});
  }
};
