import parseStepsInfo from "../ghost-inspector/utils/parseStepsInfo";

import { Step } from "src/declarations";
import { StartScenarioType } from "./model";

import { createSettings } from "../ghost-inspector/utils/createSettings";
import { StartScenarioResult, ResultErrorType } from "./model";
import { runOneTask } from "../ghost-inspector";

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

  for await (const api of scenarioApiAddress) {
    try {
      const result = await runOneTask(settingsForGh(api));

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
