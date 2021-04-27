import AbstractMessage from "./AbstractMessage";
import { ScenarioResult, StepsEntity } from "src/ScenarioResult";
import { SuccessMessageParameters, Step, Scenario } from "src/declarations";

type successMessage = {
  steps: Step[];
  operation: string;
  scenario: Scenario;
  projectName: string;
};
class SuccessMessage extends AbstractMessage<SuccessMessageParameters> {
  constructor({ steps, operation, scenario, projectName }: successMessage) {
    super({ steps, scenario, operation });
    this.customParameters = {
      documentationLink: scenario.docs,
      projectName,
      steps: this.steps,
      task: scenario.name,
    };
  }
}

export default SuccessMessage;
