import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
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
      allowNull: false,
      type: DataTypes.STRING
    },
    phoneNo: {
      allowNull: true,
      type: DataTypes.STRING
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
    }
  }, {});
  //  hash user password before creating user
  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password, salt);
  });
  return User;
};
