import roles from '../../utils/roles';

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        id: roles.REQUESTER,
        type: 'requester',
      },
      {
        id: roles.SUPER_ADMIN,
        type: 'super-admin',
      },
      {
        id: roles.MANAGER,
        type: 'manager',
      },
      {
        id: roles.TRAVEL_ADMIN,
        type: 'travel-admin',
      },
      {
        id: roles.TRAVEL_TEAM_MEMBER,
        type: 'travel-team-member',
      },
      {
        id: roles.ACCOMMODATION_SUPPLIER,
        type: 'accommodation-supplier',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
