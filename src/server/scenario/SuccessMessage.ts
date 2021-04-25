import AbstractMessage from './AbstractMessage';
import { ScenarioResult, StepsEntity } from "src/ScenarioResult";
import { SuccessMessageParameters, Step, Scenario } from "src/declarations";

class SuccessMessage extends AbstractMessage<SuccessMessageParameters> {
  documentationLink: string = "";
  constructor(
    scenarioResult: ScenarioResult,
    operatoin: string,
    scenario: Scenario,
    projectName: string
  ) {
    super(scenarioResult, scenario, operatoin);
    this.documentationLink = scenario.docs;
    this.customParameters = {
      documentationLink: scenario.docs,
      projectName,
      steps: this.steps,
      task: scenario.name,
    };
  }
}

export default SuccessMessage; 