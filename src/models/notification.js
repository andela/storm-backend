export default (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['newRequest', 'modifiedRequest', 'approvedRequest', 'rejectedRequest']
    },
    ref: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    readDate: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {});

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: 'sender'
    });
    Notification.belongsTo(models.User, {
      foreignKey: 'receiver'
    });
  };
  return Notification;
};
