module.exports = (sequelize, DataTypes) => {
  const Subrequest = sequelize.define('Subrequest', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
  });

  Subrequest.associate = (models) => {
    Subrequest.belongsTo(models.Request, {
      foreignKey: 'requestId',
      as: 'Request',
    });
  };

  return Subrequest;
};
