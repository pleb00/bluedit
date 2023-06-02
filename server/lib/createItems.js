const { Customer, Post, User, Bookmark } = require("../models/index");

const createUniqueEmail = async () => {
  await Customer.create({
    email: "testUniqueEmail@gmail.com",
    password: "test",
    role: "Customer",
  });
};

const createTestLogin = async () => {
  await Customer.create({
    email: "testLogin@gmail.com",
    password: "test",
    role: "Customer",
  });
};

const seedEntity = async () => {
  const posts = require("../data/posts.json");
  const data = posts.map((element) => {
    element.createdAt = new Date();
    element.updatedAt = new Date();
    return element;
  });
  await Post.bulkCreate(data)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const seedUser = async () => {
  const users = require("../data/user.json");
  const data = users.map((element) => {
    element.createdAt = new Date();
    element.updatedAt = new Date();
    return element;
  });
  await User.bulkCreate(data)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const seedBookmark = async () => {
  const bookmarks = require("../data/bookmark.json");
  const data = bookmarks.map((element) => {
    element.createdAt = new Date();
    element.updatedAt = new Date();
    return element;
  });
  await Bookmark.bulkCreate(data)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const seedCustomer = async () => {
  const customers = require("../data/customer.json");
  const data = customers.map((element) => {
    element.createdAt = new Date();
    element.updatedAt = new Date();
    return element;
  });
  await Customer.bulkCreate(data)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  createUniqueEmail,
  createTestLogin,
  seedEntity,
  seedUser,
  seedBookmark,
  seedCustomer,
};
