const { User, Customer, Post, Category, Bookmark } = require("../models");
const { where, Op } = require("sequelize");
const { hashPassword, comparePassword } = require("../helper/encryption");
const { signToken, verifyToken } = require("../helper/jwt");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

class userController {
  static async registerCustomer(req, res, next) {
    try {
      const { email, password } = req.body;
      const createdAccount = await Customer.create({
        email,
        password,
        role: "Customer",
      });
      res.status(201).json({
        statusCode: 201,
        message: "Account successfully created",
        data: createdAccount,
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginCustomer(req, res, next) {
    try {
      const { email, password } = req.body;

      const targetCustomer = await Customer.findOne({
        where: {
          email,
        },
      });
      const generatePayload = {
        id: targetCustomer.id,
      };

      const verdict = comparePassword(targetCustomer.password, password);
      if (verdict === false) {
        throw "INVALID_EMAIL_OR_PASSWORD";
      }

      const access_token = signToken(generatePayload);

      res.status(200).json({
        statusCode: 200,
        message: "Login Successful",
        data: {
          access_token,
          id: targetCustomer.id,
          email: targetCustomer.email,
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

  static async readPosts(req, res, next) {
    try {
      let { count, page, order, search } = req.query;
      let option = {
        include: [Category],
        order: [["id", "ASC"]],
        offset: (+page - 1) * count,
        limit: +count,
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        },
      };

      if (!search) {
        delete option.where;
      }

      if (!count || !page) {
        delete option.limit;
        delete option.offset;
      }
      const posts = await Post.findAndCountAll(option);
      const totalPage = Math.ceil(posts.count / 5);

      res.status(200).json({
        statusCode: 200,
        data: {
          totalPost: posts.count,
          page: +page,
          limit: +count,
          search: search,
          posts: posts.rows,
          totalPage,
        },
      });
    } catch (error) {
      error;
      // next(error);
      console.log(error);
    }
  }

  static async readPostsById(req, res, next) {
    try {
      const { id } = req.params;
      const targetPost = await Post.findByPk(id);
      if (targetPost === null) throw "NOT_FOUND";

      // const qrcode = await axios({
      //   method: "post",
      //   url: "https://api.qr-code-generator.com/v1/create?access-token=l3tLWZK8h0gZGJxcn11V85lEPu64_mE42VO3-b7_TNr6WmUaoJA1iEbP9h8Ru_qs",
      //   data: {
      //     frame_name: "no-frame",
      //     qr_code_text: `http://localhost:5173/details/${id}`,
      //     image_format: "SVG",
      //     qr_code_logo: "scan-me-square",
      //   },
      // });

      // targetPost.dataValues.qrCode = qrcode.data;
      res.status(200).json({
        statusCode: 200,
        data: targetPost,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readBookmarks(req, res, next) {
    try {
      const { id } = req.user;
      const customerBookmarks = await Bookmark.findAll({
        include: [
          {
            model: Post,
            include: [Category],
          },
        ],
        where: {
          CustomerId: id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        data: customerBookmarks,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addBookmarks(req, res, next) {
    try {
      const { id } = req.user;
      const PostId = req.params.id;
      const targetBookmark = await Bookmark.findOrCreate({
        where: {
          CustomerId: id,
          PostId,
        },
      });
      res.status(201).json({
        statusCode: 201,
        data: targetBookmark,
      });
    } catch (err) {
      next("NOT_FOUND");
    }
  }

  static async googleLogin(req, res, next) {
    try {
      // (req.headers.google_token);
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      // (payload);
      const [user, created] = await Customer.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "!@#$%^&*()_+",
          role: "Customer",
        },
        hooks: false,
      });

      const generatePayload = {
        id: user.dataValues.id,
      };

      console.log(generatePayload);
      const access_token = signToken(generatePayload);
      console.log(access_token);
      res.status(201).json({
        statusCode: 201,
        message: "Login Successful",
        data: {
          access_token,
          id: user.dataValues.id,
          email: user.dataValues.email,
        },
      });
    } catch (err) {
      console.log("ERROR", err);
      next(err);
    }
  }
}

module.exports = userController;
