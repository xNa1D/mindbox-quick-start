import axios from "axios";
import { ScenarioResult } from "src/server/ghost-inspector/ScenarioResult";
import parseStepsInfo from "../ghost-inspector/utils/parseStepsInfo";

import { Step } from "src/declarations";
import { StartScenarioType } from "./model";

import { createSettings } from "../ghost-inspector/utils/createSettings";
import { StartScenarioResult, ResultErrorType } from "./model";
import { runScenario } from "../ghost-inspector";

const startScenario = async ({
  scenarioApiAddress,
  projectName,
  campaign,
  ghType,
  adminPanelCookie,
}: StartScenarioType): Promise<StartScenarioResult> => {
  let resultStatus: string;
  let resultError: ResultErrorType = {};
  let resultSteps: Step[] = [];

  const settingsForGh = createSettings({
    ghType,
    projectName,
    campaign,
    adminPanelCookie,
  });

  for await (const api of scenarioApiAddress) {
    try {
      const result = await runScenario(settingsForGh(api));

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
      //@ts-ignore
      resultError.errorMessage = error.message;
    }
  }
  return {
    status: resultStatus!,
    error: resultError,
    steps: resultSteps,
  };
};

export default startScenario;
