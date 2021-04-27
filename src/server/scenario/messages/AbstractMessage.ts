import axios from "axios";

import { Step, Scenario } from "src/declarations";

abstract class AbstractMessage<T> {
  steps: Step[];
  scenarioName: string = "";
  customParameters: T | undefined;
  operation: string;

  constructor(steps: Step[], scenario: Scenario, operation: string) {
    this.steps = steps;
    this.scenarioName = scenario.name;
    this.operation = operation;
  }

  async sendMessage(email: string) {
    return await axios.post(
      `https://api.mindbox.ru/v3/operations/async`,
      {
        customer: {
          email: email,
        },
        emailMailing: {
          customParameters: this.customParameters,
        },
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          Authorization: `Mindbox secretKey="${process.env.SECRET_KEY}"`,
        },
        params: {
          endpointId: process.env.ENDPOINT,
          operation: this.operation,
        },
      }
    );
  }
}

export default AbstractMessage;
