export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    requestId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});

  Comment.associate = (models) => {
    const { Request, User } = models;

    Comment.belongsTo(Request, {
      foreignKey: 'requestId',
      as: 'Request',
    });

    Comment.belongsTo(User, {
      foreignKey: 'ownerId',
      as: 'Owner',
    });
  };
  return Comment;
};
