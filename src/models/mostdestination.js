module.exports = (sequelize, DataTypes) => {
  const Mostdestination = sequelize.define('Mostdestination', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    destinationCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Mostdestination;
};
