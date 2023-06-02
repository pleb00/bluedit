"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/encryption");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: `authorId` });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username cannot be blank",
          },
          notNull: {
            msg: "Username cannot be blank",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email cannot be blank",
          },
          notNull: {
            msg: "Email cannot be blank",
          },
        },
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance) => {
    let { password } = instance;
    let encryptedPassword = hashPassword(password);
    instance.password = encryptedPassword;
  });
  return User;
};
