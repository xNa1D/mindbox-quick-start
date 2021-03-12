import axios from "axios";

import { ScenarioRequestBody, ScenarioNames } from "src/declarations";

const startScenario = jest.fn().mockResolvedValue({status: 200, data: ""});

export default startScenario;
