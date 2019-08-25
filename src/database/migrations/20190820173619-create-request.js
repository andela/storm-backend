module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['one-way', 'return'],
      },
      originCity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destinationCity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departureDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      returnDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accommodation: {
        type: Sequelize.STRING,
      },
      approvalStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Requests');
  }
};
