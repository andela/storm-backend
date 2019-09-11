export default (sequelize, DataTypes) => {
  const AccomodationFeedback = sequelize.define('AccomodationFeedback', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    accommodationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {});

  AccomodationFeedback.associate = (models) => {
    const { Accommodation, User } = models;

    AccomodationFeedback.belongsTo(Accommodation, {
      foreignKey: 'accomodationId',
      as: 'Accomodation',
    });

    AccomodationFeedback.belongsTo(User, {
      foreignKey: 'userId',
      as: 'User',
    });
  };
  return AccomodationFeedback;
};
