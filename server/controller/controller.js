const { hashPassword, comparePassword } = require("../helper/encryption");
const { signToken, verifyToken } = require("../helper/jwt");
const { Category, Post, User, Log } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { where } = require("sequelize");

class Controller {
  static async add(req, res, next) {
    const { title, content, imgUrl, categoryId } = req.body;
    const { id, username } = req.user;

    try {
      let createdPost = await Post.create({
        title,
        content,
        imgUrl,
        categoryId: +categoryId,
        authorId: id,
        status: "Active",
      });

      await Log.create({
        name: "Add",
        description: `New post with id ${createdPost.dataValues.id} has been created`,
        updatedBy: username,
      });

      createdPost;
      res.status(201).json({
        statusCode: 201,
        message: "Post successfully created",
        data: createdPost,
      });
    } catch (error) {
      error;
      if (error.name === "SequelizeValidationError") {
        error.name = "CREATE_FAIL";
      }
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      let readPost = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["email"],
          },
        ],
      });

      res.status(200).json({
        statusCode: 200,
        message: "Read Data Success",
        data: readPost,
      });
    } catch (error) {
      error;
      if (error.name === "SequelizeValidationError") {
        error.name = "NOT_FOUND";
      }
      next(error);
    }
  }

  static async readById(req, res, next) {
    let id = +req.params.id;
    try {
      let readPostById = await Post.findByPk(id);

      res.status(200).json({
        statusCode: 200,
        message: `Read Data for ID ${id} Success`,
        data: readPostById,
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error.name = "NOT_FOUND";
      }
      next(error);
    }
  }

  static async deleteById(req, res, next) {
    let id = +req.params.id;
    const { userId, username } = req.user;
    req.user;

    try {
      let deleteTarget = await Post.findByPk(id);
      await Post.destroy({
        where: {
          id: id,
        },
      });

      // (deleteTarget);
      await Log.create({
        name: "Delete",
        description: `The post with id "${deleteTarget.dataValues.id}" has been deleted`,
        updatedBy: username,
      });

      res.status(200).json({
        statusCode: 200,
        message: `Content with the title ${deleteTarget.dataValues.title} has successfully deleted`,
      });
    } catch (error) {
      error;
      if (error.name === "SequelizeValidationError") {
        error.name = "NOT_FOUND";
      }
      next(error);
    }
  }

  static async readCategories(req, res, next) {
    try {
      let readCategories = await Category.findAll();
      res.status(200).json({
        statusCode: 200,
        message: `Read Categories Success`,
        data: readCategories,
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error.name = "NOT_FOUND";
      }
      next(error);
    }
  }

  static async registerAdmin(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      let createdAccount = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        role: "Admin",
      });

      const displayedData = {
        id: createdAccount.dataValues.id,
        email: createdAccount.dataValues.email,
      };
      res.status(201).json({
        statusCode: 201,
        message: "Account successfully created",
        data: displayedData,
      });
    } catch (error) {
      error;
      if (error.name === "SequelizeValidationError") {
        error.name = "CREATE_FAIL";
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        error.name = "CREATE_FAIL";
      }
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      let findUser = await User.findOne({
        where: {
          email: email,
        },
      });

      // generate payload for token
      const generatePayload = {
        id: findUser.id,
        username: findUser.username,
      };

      findUser.dataValues;
      // user does not exist

      // password validation
      const verdict = comparePassword(findUser.password, password);

      // if the password is incorrect
      if (verdict === false) {
        throw "INVALID_EMAIL_OR_PASSWORD";
      }

      // assign token
      const access_token = signToken(generatePayload);
      // (access_token);

      res.status(201).json({
        statusCode: 201,
        message: "Login Successful",
        data: {
          access_token,
          id: findUser.id,
          username: findUser.username,
        },
      });
    } catch (err) {
      err;
      if (err.name === "TypeError") {
        err.name = "INVALID_EMAIL_OR_PASSWORD";
      }
      next(err);
    }
  }

  static async addCategories(req, res, next) {
    try {
      let { name } = req.body;
      const { username, userId } = req.user;
      req.user;
      let createdCategory = await Category.create({
        name: name,
      });

      createdCategory;
      const displayedData = {
        id: createdCategory.dataValues.id,
        name: createdCategory.dataValues.name,
      };

      await Log.create({
        name: "Add",
        description: `New category called "${name}" has been created`,
        updatedBy: username,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Categories successfully created",
        data: displayedData,
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error.name = "CREATE_FAIL";
      }

      next(error);
    }
  }

  static async loginByGoogle(req, res, next) {
    try {
      // (req.headers.google_token);
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      // (payload);
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "!@#$%^&*()_+",
          role: "Staff",
          phoneNumber: "",
          address: "",
        },
        hooks: false,
      });

      // (user);

      // assign token
      const generatePayload = {
        id: user.dataValues.id,
        username: user.dataValues.username,
      };

      const access_token = signToken(generatePayload);
      access_token;

      res.status(201).json({
        statusCode: 201,
        message: "Login Successful",
        data: {
          access_token,
          id: user.dataValues.id,
          username: user.dataValues.username,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategories(req, res, next) {
    let id = +req.params.id;
    const { username, userId } = req.user;

    try {
      let deleteTarget = await Category.findByPk(id);
      await Category.destroy({
        where: {
          id: id,
        },
      });

      await Log.create({
        name: "Delete",
        description: `The category "${deleteTarget.dataValues.name}" has been deleted`,
        updatedBy: username,
      });

      res.status(200).json({
        statusCode: 200,
        message: `Category with the title ${deleteTarget.dataValues.name} has successfully deleted`,
      });
    } catch (error) {
      error;
      if (error.name === "SequelizeValidationError") {
        error.name = "NOT_FOUND";
      }
      next(error);
    }
  }

  static async replace(req, res, next) {
    const id = +req.params.id;
    const { title, content, categoryId, imageUrl } = req.body;
    const { username, userId } = req.user;

    try {
      const targetReplace = await Post.update(
        {
          title,
          content,
          categoryId,
          imageUrl,
        },
        {
          where: {
            id,
          },
        }
      );

      await Log.create({
        name: "Update",
        description: `The post with id ${id} has been updated`,
        updatedBy: username,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Update successful",
        data: targetReplace,
      });
    } catch (err) {
      err;
      next(err);
    }
  }

  static async modify(req, res, next) {
    const id = +req.params.id;
    const { status } = req.body;
    const { username, userId } = req.user;
    status;
    id;
    try {
      const togglePost = await Post.update(
        {
          status,
        },
        {
          where: {
            id,
          },
        }
      );

      await Log.create({
        name: "Update",
        description: `The status of post with id ${id} has been updated to ${status}`,
        updatedBy: username,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Update successful",
        data: {
          id,
          status,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async readHistory(req, res, next) {
    try {
      const logs = await Log.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(201).json({
        statusCode: 201,
        message: "Read logs successful",
        data: logs,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readCategoryById(req, res, next) {
    const currentCategoryId = +req.params.id;
    try {
      const currentCategory = await Category.findByPk(currentCategoryId);
      res.status(201).json({
        statusCode: 201,
        message: "Read category successful",
        data: currentCategory,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editCategory(req, res, next) {
    const id = +req.params.id;
    const { name } = req.body;
    const { username, userId } = req.user;

    try {
      const targetReplace = await Category.update(
        {
          name,
        },
        {
          where: {
            id,
          },
        }
      );

      await Log.create({
        name: "Update",
        description: `The Category with id ${id} has been updated to ${name}`,
        updatedBy: username,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Update successful",
        data: targetReplace,
      });
    } catch (err) {
      err;
      next(err);
    }
  }

  static async getUser(req, res, next) {
    const { username, id } = req.user;
    try {
      const targetUser = await User.findOne({
        where: {
          id,
        },
      });

      res.status(201).json({
        statusCode: 201,
        message: "User found",
        data: targetUser,
      });
    } catch (err) {
      err;
      next(err);
    }
  }
}

module.exports = Controller;
