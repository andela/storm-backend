module.exports = (sequelize, DataTypes) => {
  const BookAccomodation = sequelize.define('BookAccomodation', {
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
      allowNull: false
    },
    tripRequestId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeOfRoom: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: false
    },
    numOfRooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    adults: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    children: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {});
  BookAccomodation.associate = (models) => {
    BookAccomodation.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
    });
    BookAccomodation.belongsTo(models.Accommodation, {
      foreignKey: 'accommodationId',
      as: 'Accommodation',
    });
    BookAccomodation.belongsTo(models.Request, {
      foreignKey: 'tripRequestId',
      as: 'Request',
    });
  };
  return BookAccomodation;
};
