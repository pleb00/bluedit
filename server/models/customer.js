"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/encryption");

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Bookmark, { foreignKey: "CustomerId" });
    }
  }
  Customer.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "Email has already been used",
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email cannot be blank",
          },
          notNull: {
            msg: "Email cannot be blank",
          },
          isEmail: {
            msg: "Email format is incorrect",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be blank",
          },
          notNull: {
            msg: "Password cannot be blank",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );

  Customer.beforeCreate((instance) => {
    let { password } = instance;
    let encryptedPassword = hashPassword(password);
    instance.password = encryptedPassword;
  });
  return Customer;
};
