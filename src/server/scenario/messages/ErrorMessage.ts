import AbstractMessage from './AbstractMessage';
import { ScenarioResult, StepsEntity } from "src/ScenarioResult";
import { ErrorMessageParameters, Step, Scenario } from "src/declarations";

class SuccessMessage extends AbstractMessage<ErrorMessageParameters> {
  constructor(
    steps: StepsEntity[],
    videoLink: string,
    errorMessage: string,
    operation: string,
    scenario: Scenario,
    projectName: string
  ) {
    super(steps, scenario, operation);
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