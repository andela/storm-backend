export default (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});

  Rating.associate = (models) => {
    Rating.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Rating.belongsTo(models.Accommodation, {
      foreignKey: 'accommodationId',
      as: 'accommodation'
    });
  };

  return Rating;
};
