"use strict";
const { verifyToken } = require("../helper/jwt");
const { Post, User } = require("../models");

const authenticate = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (access_token === null) {
      throw {
        name: "AuthenticationError",
        msg: "login please",
      };
    }

    const out = verifyToken(access_token);
    req.user = out;
    next();
  } catch (error) {
    next(error);
  }
};

const authorize = async (req, res, next) => {
  try {
    +req.params.id;
    +req.user.id;
    const id = +req.params.id;
    const userId = +req.user.id;
    const user = await User.findByPk(userId);
    const post = await Post.findByPk(id);

    if (post === null) {
      throw "NOT_FOUND";
    }

    if (post.authorId !== user.id) {
      if (user.role !== "Admin") {
        throw "INVALID_AUTHORIZATION";
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

const authorizeAdminOnly = async (req, res, next) => {
  try {
    const user = await User.findByPk(+req.user.id);
    if (user.role !== "Admin") {
      throw "INVALID_AUTHORIZATION";
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authorize, authenticate, authorizeAdminOnly };
