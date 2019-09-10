module.exports = (sequelize, DataTypes) => {
  const Tokenblacklist = sequelize.define('Tokenblacklist', {
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
    expiresIn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  return Tokenblacklist;
};
