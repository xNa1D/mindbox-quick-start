import axios from "axios";
import { StartScenarioBody } from "src/declarations";

const startScenario = async (
  scenarioApiAddress: string,
  projectName: string,
  campaign: number
) =>
  await axios.post(
    scenarioApiAddress,
    { projectName, campaign },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export default startScenario;
