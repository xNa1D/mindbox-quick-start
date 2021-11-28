import { DataTypes } from "sequelize";
import { Model } from "sequelize/types";

import { Scenario } from "src/declarations";
import { sequelize } from "./";

export const ScenarioModel = sequelize.define<Model<Scenario>>("Scenario", {
  type: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  docs: { type: DataTypes.STRING },
  api: { type: DataTypes.STRING, allowNull: false },
  ghType: { type: DataTypes.ENUM, allowNull: false, values: ["old", "new"] },
});

export const getAll = async () => {
  return await ScenarioModel.findAll();
};

export const addNew = async (scenario: Scenario) => {
  return await ScenarioModel.create(scenario);
};

export const update = async (scenario: Scenario) => {
  return ScenarioModel.update(scenario, {
    where: {
      type: scenario.type,
    },
  });
};
