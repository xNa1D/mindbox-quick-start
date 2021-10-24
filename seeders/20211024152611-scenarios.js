"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Scenarios",
      [
        {
          id: "1",
          type: "ecommerce",
          name: "Интернет магазин: базовые операции",
          docs: "https://docs.google.com/document/d/1VoY1pre3ZqdBBuIxb4-1IIiZr5W-NkTUUrAimxeCfW4/edit",
          api: ["5ec6c26197e4531b3a9d9864", "607994e335da151e07a5afa6"],
          ghType: "old",
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("People", null, {});
  },
};
