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

export const getAll = async () => {
  try {
    const scenarios = await ScenarioModel.findAll();
    return scenarios;
  } catch (error) {
    console.log(error);
  }
};

export const addNew = async (scenario: Scenario) => {
  try {
    const foundScenario = await ScenarioModel.create(scenario);
    return foundScenario;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (scenario: Scenario) => {
  try {
    return ScenarioModel.update(scenario, {
      where: {
        type: scenario.type,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
