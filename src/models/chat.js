export default (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      references: 'users',
      referencesKey: 'id'
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});

  Chat.associate = (models) => {
    Chat.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'sender'
    });
  };
  return Chat;
};
