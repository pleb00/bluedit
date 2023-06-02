const { Customer, Post, User, Bookmark } = require("../models/index");

const clearTestRegister = async () => {
  await Customer.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

const clearPosts = async () => {
  await Post.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

const clearUser = async () => {
  await User.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

const clearBookmarks = async () => {
  await Bookmark.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = { clearTestRegister, clearPosts, clearUser, clearBookmarks };
