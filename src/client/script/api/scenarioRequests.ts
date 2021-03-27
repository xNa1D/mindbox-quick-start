import axios from "axios";

import { ScenarioRequestBody, ScenarioNames } from "src/declarations";

const startScenario = async (requestBody: ScenarioRequestBody) =>
  await axios.post("/api/scenario/start", requestBody, {
    headers: { "content-type": "application/json" },
  });

export default startScenario;
