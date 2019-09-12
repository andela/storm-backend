import roles from '../utils/roles';
import { hashPassword } from '../utils/authHelper';

export default (Sequelize, DataTypes) => {
  const User = Sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING
    },
    phoneNo: {
      allowNull: true,
      type: DataTypes.STRING
    },
    birthDate: {
      allowNull: true,
      type: DataTypes.STRING
    },
    preferredCurrency: {
      allowNull: true,
      type: DataTypes.STRING
    },
    preferredLanguage: {
      allowNull: true,
      type: DataTypes.STRING
    },
    currentLocation: {
      allowNull: true,
      type: DataTypes.STRING
    },
    gender: {
      allowNull: true,
      type: DataTypes.STRING
    },
    roleId: {
      allowNull: true,
      type: DataTypes.UUID,
      defaultValue: roles.REQUESTER,
    },
    lineManager: {
      allowNull: true,
      type: DataTypes.UUID
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW')
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW')
    },
    verified: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    rememberProfile: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    emailNotificationEnabled: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});

  User.associate = (models) => {
    User.hasOne(models.User, {
      foreignKey: 'lineManager',
      as: 'User',
    });
  };
  //  hash user password before creating user
  User.beforeCreate((user) => {
    if (user.password) { user.password = hashPassword(user.password); }
  });
  //  hash user password before updatng user password
  User.beforeBulkUpdate(({ attributes: user }) => {
    if (user.password) { user.password = hashPassword(user.password); }
  });
  return User;
};
