import AbstractMessage from "./AbstractMessage";
import { ScenarioResult, StepsEntity } from "src/ScenarioResult";
import { ErrorMessageParameters, Step, Scenario } from "src/declarations";

type errorMessage = {
  steps: Step[];
  operation: string;
  scenario: Scenario;
  projectName: string;
  videoLink: string;
  errorMessage: string;
};
class SuccessMessage extends AbstractMessage<ErrorMessageParameters> {
  constructor({
    steps,
    operation,
    scenario,
    projectName,
    videoLink,
    errorMessage,
  }: errorMessage) {
    super({ steps, scenario, operation });
    this.customParameters = {
      errorMessage,
      videoLink,
      projectName,
      steps: this.steps,
      task: scenario.name,
    };
  }
}

export default SuccessMessage;
