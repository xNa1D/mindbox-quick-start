import axios from "axios";
import { ScenarioResult  } from "src/ScenarioResult";
import { StepsEntity } from "src/ScenarioResult";
import parseStepsInfo from "./parseStepsInfo";

import { Step } from "src/declarations";

const startScenario = async (
  scenarioApiAddress: string[],
  projectName: string,
  campaign: number,
  ghType: "old" | "new"
) => {
  let resultStatus;
  let resultError = {
    errorMessage: "",
    videoLink: "",
  };

  let resultSteps: Step[] = [];
  let i = 0;

  const ghToken =
    ghType === "old" ? process.env.GH_TOKEN : process.env.GH_TOKEN_NEW;
  for await (const api of scenarioApiAddress) {
    try {
      const result = await axios.post<ScenarioResult>(
        `https://api.ghostinspector.com/v1/tests/${api}/execute/?apiKey=${ghToken}`,
        { projectName, campaign },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      resultSteps = [
        ...resultSteps,
        ...parseStepsInfo(result.data.data.steps || []),
      ];

      if (result.data.code !== "SUCCESS") {
        resultStatus = "ERROR";
        resultError.errorMessage = "Internal error in Scenario Server";
      } else if (!result.data.data.passing) {
        resultStatus = "ERROR";
        resultError.errorMessage = result.data.data.error?.details || "";
        resultError.videoLink = result.data.data.video?.url || "";
      } else {
        resultStatus = "SUCCESS";
      }
    } catch (error) {
      resultStatus = "ERROR";
      resultError.errorMessage = error;
    }
  }
  return {
    status: resultStatus,
    error: resultError,
    steps: resultSteps,
  };
};

export default startScenario;
