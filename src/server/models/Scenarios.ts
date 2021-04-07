import axios from "axios";
import { ScenarioResult } from "src/ScenarioResult";
import { StepsEntity } from "src/ScenarioResult";

const startScenario = async (
  scenarioApiAddress: string[],
  projectName: string,
  campaign: number
) => {
  let resultStatus = {
    status: "",
    errorMessage: "",
  };
  let resultSteps: StepsEntity[] = [];

  for (const api of scenarioApiAddress) {
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
      resultStatus.status = "ERROR";
      resultStatus.errorMessage = "Internal error in Scenario Server";
    } else if (!result.data.data.passing) {
      resultStatus.status = "ERROR";
      resultStatus.errorMessage = result.data.data.error?.details || "";
    } else {
      resultStatus.status = "SUCCESS";
    }
  }
  return {
    resultStatus,
    resultSteps,
  };
};

export default startScenario;
