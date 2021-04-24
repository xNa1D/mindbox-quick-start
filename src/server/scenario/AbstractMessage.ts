import axios from "axios";
import { ScenarioResult, StepsEntity } from "src/ScenarioResult";
import { MessageParameters, Step, Scenario } from "src/declarations";

class AbstractMessage {
  email: string;
  steps: Step[] | undefined;
  scenarioName: string = "";

  constructor(
    scenarioResponse: ScenarioResult,
    email: string,
    scenario: Scenario
  ) {
    this.email = email;
    this.steps = this.parseStepsInfo(scenarioResponse.data.steps);
    this.scenarioName = scenario.name;
  }

  private parseStepsInfo(steps: StepsEntity[] | null) {
    if (steps?.length === 0) {
      return;
    }
    const stepsObject: { [k: string]: any } = {};

    steps?.reduce((stepsObject, step) => {
      const rootId = step.extra?.rootSequence;

      if (rootId !== undefined) {
        if (stepsObject[rootId] === undefined) {
          stepsObject[rootId] = {
            name: step.notes
              ?.split("\n")[0]
              .replace("Imported from: Петр - ", ""),
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
            stepsObject[rootId]["status"] = stepsObject[rootId]["status"] &&  step.passing;
          }
        }
      }

      return stepsObject;
    }, stepsObject);

    return Object.values(stepsObject) as Step[];
  }

  async sendMessage(email: string, customParameters: MessageParameters) {
    return await axios.post(
      `https://api.mindbox.ru/v3/operations/async?endpointId=${process.env.ENDPOINT}&operation=QuickStart.SendSuccessStatus`,
      {
        customer: {
          email: email,
        },
        emailMailing: {
          customParameters,
        },
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          Authorization: `Mindbox secretKey="${process.env.SECRET_KEY}"`,
        },
      }
    );
  }
}

export default AbstractMessage;
