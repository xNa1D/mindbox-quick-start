import AbstractMessage from './AbstractMessage';
import { ScenarioResult, StepsEntity } from "src/ScenarioResult";
import { ErrorMessageParameters, Step, Scenario } from "src/declarations";

class SuccessMessage extends AbstractMessage<ErrorMessageParameters> {
  constructor(
    scenarioResult: ScenarioResult,
    operatoin: string,
    scenario: Scenario,
    projectName: string
  ) {
    super(scenarioResult, scenario, operatoin);
    this.customParameters = {
      errorMessage: scenarioResult.data.error?.details || "",
      videoLink: scenarioResult.data.video?.url || "",
      projectName,
      steps: this.steps,
      task: scenario.name,
    };
  }
}

export default SuccessMessage; 