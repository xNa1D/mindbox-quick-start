import axios from "axios";
import { ScenarioResult } from "src/ScenarioResult";

const startScenario = async (
  scenarioApiAddress: string,
  projectName: string,
  campaign: number
) => {
  const result = await axios.post<ScenarioResult>(
    scenarioApiAddress,
    { projectName, campaign },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (result.data.code !== "SUCCESS") {
    throw new Error("Internal error in Scenario Server");
  } else if (!result.data.data.passing) {
     throw new Error(result.data.data.error?.details);
  } else {
    return true;
  }
};

export default startScenario;
