import axios from "axios";
import { ScenarioResult } from "src/ScenarioResult";
import { StepsEntity } from "src/ScenarioResult";

const startScenario = async (
  scenarioApiAddress: string[],
  projectName: string,
  campaign: number
) => {
  let resultStatus;
  let resultError = {
    errorMessage: "",
    videoLink: "",
  };
  let resultSteps: StepsEntity[] = [];

  for (const api of scenarioApiAddress) {
    try {
      const result = await axios.post<ScenarioResult>(
        `https://api.ghostinspector.com/v1/tests/${api}/execute/?apiKey=777edc3b47a553359340c186dca0a1923bc51c77`,
        { projectName, campaign },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      resultSteps = [...resultSteps, ...(result.data.data.steps || [])];

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
      resultError.errorMessage = error.toString();
    }
  }
  return {
    status: resultStatus,
    error: resultError, 
    steps: resultSteps,
  };
};

export default startScenario;
