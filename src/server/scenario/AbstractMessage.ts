import axios from "axios";
import { ScenarioResult, StepsEntity } from "src/ScenarioResult";
import { Step, Scenario } from "src/declarations";

abstract class AbstractMessage<T> {
  steps: Step[];
  scenarioName: string = "";
  customParameters: T | undefined;
  operation: string;

  constructor(
    scenarioResult: ScenarioResult,
    scenario: Scenario,
    operation: string
  ) {
    this.steps = this.parseStepsInfo(scenarioResult.data.steps);
    this.scenarioName = scenario.name;
    this.operation = operation;
  }

  private parseStepsInfo(steps: StepsEntity[] | null) {
    if (steps?.length === 0) {
      return [];
    }
    const stepsObject: { [k: string]: any } = {};

    steps?.reduce((stepsObject, step) => {
      const rootId = step.extra?.rootSequence;

      if (rootId !== undefined) {
        if (stepsObject[rootId] === undefined) {
          stepsObject[rootId] = {
            name: step.notes
              ?.split("\n")[0]
              .replace("Imported from: Петр - ", "")
              .split("-")[1]
              .trim(),
            status: step.passing,
          };
        } else {
          if (stepsObject[rootId]["status"] === null) {
            if (step.passing === null) {
              stepsObject[rootId]["status"] = step.passing;
            } else {
              stepsObject[rootId]["status"] = step.passing;
            }
          } else {
            stepsObject[rootId]["status"] =
              stepsObject[rootId]["status"] && step.passing;
          }
        }
      }

      return stepsObject;
    }, stepsObject);

    return Object.values(stepsObject) as Step[];
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
