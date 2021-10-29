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

export const getAllScenarios = async () => await ScenarioModel.findAll();

export const addNewScenario = async (scenario: Scenario) =>
  await ScenarioModel.create(scenario);

export const updateScenario = async (scenario: Scenario) =>
  ScenarioModel.update(scenario, {
    where: {
      type: scenario.type,
    },
  });
