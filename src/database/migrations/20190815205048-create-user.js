'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
        },
        firstName: {
          allowNull: false,
          type: Sequelize.STRING
        },
        lastName: {
          allowNull: false,
          type: Sequelize.STRING
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING
        },
        phoneNo: {
          allowNull: true,
          type: Sequelize.STRING,
          unique: true
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
       })
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Users');
  }
};
