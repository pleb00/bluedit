"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: `authorId` });
      Post.belongsTo(models.Category, { foreignKey: `categoryId` });
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title cannot be blank",
          },
          notEmpty: {
            msg: "Title cannot be blank",
          },
        },
      },

      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Content cannot be blank",
          },
          notEmpty: {
            msg: "Content cannot be blank",
          },
        },
      },

      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image URL cannot be blank",
          },
          notEmpty: {
            msg: "Image URL cannot be blank",
          },
        },
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Status cannot be blank",
          },
          notEmpty: {
            msg: "Status cannot be blank",
          },
        },
      },

      categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category cannot be blank",
          },
          notEmpty: {
            msg: "Category cannot be blank",
          },
        },
      },

      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Author cannot be blank",
          },
          notEmpty: {
            msg: "Author cannot be blank",
          },
        },
      },
    },

    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
