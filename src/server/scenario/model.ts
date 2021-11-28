
import { Scenario, Step } from "src/declarations";

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
