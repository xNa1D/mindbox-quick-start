import AbstractMessage from './AbstractMessage';
import { ScenarioResult, StepsEntity } from "src/ScenarioResult";
import { MessageParameters, Step, Scenario } from "src/declarations";

class SuccessMessage extends AbstractMessage {
  documentationLink: string = "";
  constructor(scenarioResponse: ScenarioResult, email: string, scenario: Scenario) {
    super(scenarioResponse, email, scenario);
    this.documentationLink = scenario.docs;
  }
}

export default SuccessMessage; 