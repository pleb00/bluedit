"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bookmark = require("../data/bookmark.json");
    bookmark.forEach((element) => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Bookmarks", bookmark, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookmarks", null, {});
  },
};
