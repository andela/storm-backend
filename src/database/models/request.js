module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['one-way', 'return'],
    },
    originCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destinationCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accommodation: {
      type: DataTypes.STRING,
    },
    approvalStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Request.associate = function(models) {
    Request.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
    });
  };

  return Request;
};
