'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BookAccomodations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      accommodationId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      tripRequestId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      typeOfRoom: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      checkIn: {
        type: Sequelize.DATE,
        allowNull: false
      },
      checkOut: {
        type: Sequelize.DATE,
        allowNull: false
      },
      numOfRooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      adults: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      children: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BookAccomodations');
  }
};
