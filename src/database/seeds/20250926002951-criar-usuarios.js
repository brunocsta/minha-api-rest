"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          nome: "Caetano",
          email: "caetano@gmail.com",
          password_hash: await bcrypt.hash("123456", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "Caetano 2",
          email: "caetano2@gmail.com",
          password_hash: await bcrypt.hash("654321", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "Caetano 3",
          email: "caetano3@gmail.com",
          password_hash: await bcrypt.hash("789012", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down() {},
};
