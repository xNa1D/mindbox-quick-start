import axios from "axios";
import { ScenarioResult } from "src/ScenarioResult";
import parseStepsInfo from "./parseStepsInfo";

import { Step, StartScenarioType } from "src/declarations";

type ResultErrorType = {
  errorMessage?: string;
  videoLink?: string;
};

type StartScenarioResult = {
  status: string;
  error?: ResultErrorType;
  steps: Step[];
};

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

  const prepareScenarioSettings = (ghType: string) => (api: string) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let token;
    let body;
    if (ghType === "old") {
      token = process.env.GH_TOKEN;
      body = { projectName, campaign };
    } else {
      token = process.env.GH_TOKEN_NEW;
      body = { projectName, campaign, adminPanelCookie };
    }

    return {
      options,
      url: `https://api.ghostinspector.com/v1/tests/${api}/execute/?apiKey=${token}`,
      body,
    };
  };

  const settingsForGh = prepareScenarioSettings(ghType);

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
