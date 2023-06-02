"use strict";
const { hashPassword } = require("../helper/encryption");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = require("../data/customer.json");
    user.forEach((element) => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
      element.password = hashPassword(element.password);
    });
    await queryInterface.bulkInsert("Customers", user, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Customers", null, {});
  },
};
