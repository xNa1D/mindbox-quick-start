
import { Scenario, Step } from "src/declarations";

import { DataTypes } from "sequelize";
import { Model } from "sequelize/types";

import { sequelize } from "server/db/";


export type ResultErrorType = {
  errorMessage?: string;
  videoLink?: string;
};
export type StartScenarioResult = {
  status: string;
  error?: ResultErrorType;
  steps: Step[];
};

export type prepareScenarioSettingsArgs = {
  ghType: string;
  projectName: string;
  campaign: number;
  adminPanelCookie: string;
};

export type StartScenarioAndSendResultType = {
  email: string;
  projectName: string;
  scenario: Scenario;
  campaign: number;
  adminPanelCookie: string;
};

export type StartScenarioType = {
  scenarioApiAddress: string[];
  projectName: string;
  campaign: number;
  ghType: "old" | "new";
  adminPanelCookie: string;
};




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
