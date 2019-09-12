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
        allowNull: true,
        type: Sequelize.STRING
      },
      phoneNo: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true
      },
      birthDate: {
        allowNull: true,
        type: Sequelize.STRING
      },
      preferredCurrency: {
        allowNull: true,
        type: Sequelize.STRING
      },
      preferredLanguage: {
        allowNull: true,
        type: Sequelize.STRING
      },
      currentLocation: {
        allowNull: true,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING
      },
      roleId: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      lineManager: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      verified: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      emailNotificationEnabled: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      rememberProfile: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
        })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
