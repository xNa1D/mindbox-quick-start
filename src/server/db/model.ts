const { DataTypes } = require("sequelize");
import { sequelize } from ".";

export const Scenario = sequelize.define("Scenario", {
  type: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  docs: { type: DataTypes.STRING },
  api: { type: DataTypes.ENUM, allowNull: false },
  ghType: { type: DataTypes.STRING },
});

// {
//     type: "ecommerce",
//     name: "Интернет магазин: базовые операции",
//     docs: "https://docs.google.com/document/d/1VoY1pre3ZqdBBuIxb4-1IIiZr5W-NkTUUrAimxeCfW4/edit",
//     api: ["5ec6c26197e4531b3a9d9864", "607994e335da151e07a5afa6"],
//     ghType: "old",
//   }
