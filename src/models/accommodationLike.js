export default (sequelize, DataTypes) => {
  const AccommodationLike = sequelize.define('AccommodationLike', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {});
  AccommodationLike.associate = (models) => {
    // associations can be defined here
    AccommodationLike.belongsTo(models.Accommodation, {
      foreignKey: 'accommodationId',
      as: 'accommodation'
    });

    AccommodationLike.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return AccommodationLike;
};
