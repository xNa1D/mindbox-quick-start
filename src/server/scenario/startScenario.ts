import axios from "axios";
import { ScenarioResult } from "src/ScenarioResult";
import parseStepsInfo from "./utils/parseStepsInfo";

import { Step } from "src/declarations";
import { StartScenarioType } from "./model";

import { createSettings } from "./utils/createSettings";
import { StartScenarioResult, ResultErrorType } from "./model";

const startScenario = async ({
  scenarioApiAddress,
  projectName,
  campaign,
  ghType,
  adminPanelCookie,
}: StartScenarioType): Promise<StartScenarioResult> => {
  let resultStatus: string;
  const resultError: ResultErrorType = {};
  let resultSteps: Step[] = [];

  const settingsForGh = createSettings({
    ghType,
    projectName,
    campaign,
    adminPanelCookie,
  });

  const runScenario = async (api: string) => {
    const scenarioSettings = settingsForGh(api);

    const result = await axios.post<ScenarioResult>(
      scenarioSettings.url,
      scenarioSettings.body,
      scenarioSettings.options
    );

    if (result.data.code !== "SUCCESS") {
      throw new Error("Internal error in Scenario Server");
    }
    return result.data.data;
  };

  for await (const api of scenarioApiAddress) {
    try {
      const result = await runScenario(api);

      resultSteps = [...resultSteps, ...parseStepsInfo(result.steps || [])];

      if (!result.passing) {
        resultStatus = "ERROR";
        resultError.errorMessage = result.error?.details;
        resultError.videoLink = result.video?.url;
      } else {
        resultStatus = "SUCCESS";
      }
    } catch (error) {
      resultStatus = "ERROR";
      if (error instanceof Error) {
        resultError.errorMessage = error.message;
      }
    }
  }
  return {
    status: resultStatus!,
    error: resultError,
    steps: resultSteps,
  };
};

export default startScenario;
