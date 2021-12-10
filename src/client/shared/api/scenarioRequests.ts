import axios from "axios";

import { StartScenarioBody } from "src/declarations";

const startScenario = async (requestBody: StartScenarioBody) =>
  await axios.post("/api/scenario/start", requestBody, {
    headers: { "content-type": "application/json" },
  });

export default startScenario;
