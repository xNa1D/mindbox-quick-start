import { DataTypes } from "sequelize";
import { Model } from "sequelize/types";

import { Scenario } from "src/declarations";
import { sequelize } from "./";

export const ScenarioModel = sequelize.define<Model<Scenario>>("Scenario", {
  type: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  docs: { type: DataTypes.STRING },
  api: { type: DataTypes.ENUM, allowNull: false, values: ["old", "new"] },
  ghType: { type: DataTypes.STRING },
});

// {
//     type: "ecommerce",
//     name: "Интернет магазин: базовые операции",
//     docs: "https://docs.google.com/document/d/1VoY1pre3ZqdBBuIxb4-1IIiZr5W-NkTUUrAimxeCfW4/edit",
//     api: ["5ec6c26197e4531b3a9d9864", "607994e335da151e07a5afa6"],
//     ghType: "old",
//   }
