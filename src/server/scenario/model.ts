import { Scenario, Step } from "src/declarations";

import { DataTypes } from "sequelize";
import { Model } from "sequelize/types";

import { sequelize } from "../db";

export type commonGhostInspectorFields = {
  projectName: string;
  adminPanelCookie: string;
};

export type prepareScenarioSettingsArgs = {
  ghType?: string;
  campaign: number;
} & commonGhostInspectorFields;

export type StartScenarioAndSendResultType = {
  email: string;
  scenario: Scenario;
  campaign: number;
} & commonGhostInspectorFields;

export type StartScenarioType = {
  scenarioApiAddress: string[];
  campaign: number;
  ghType: "old" | "new";
} & commonGhostInspectorFields;

export type ResultErrorType = {
  errorMessage?: string;
  videoLink?: string;
};
export type StartScenarioResult = {
  status: string;
  error?: ResultErrorType;
  steps: Step[];
};

export const ScenarioModel = sequelize.define("Scenario", {
  type: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  docs: { type: DataTypes.STRING },
  api: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue("api"));
    },
    set(value) {
      this.setDataValue("api", JSON.stringify(value));
    },
  },
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
