import sendMessage from "./sendMessage";
import { operations } from "../../config";
import startScenario from "./startScenario";

import {
  SuccessMessageParameters,
  ErrorMessageParameters,
  StartScenarioAndSendResultType,
  StartScenarioType,
} from "src/declarations";

const startScenarioAndSendResult = async ({
  email,
  projectName,
  scenario,
  campaign,
}: StartScenarioAndSendResultType) => {

  const scenarioData: StartScenarioType = {
    campaign,
    ghType: scenario.ghType,
    projectName,
    scenarioApiAddress: scenario.api,
  };

  const scenarioResult = await startScenario(scenarioData);


  if (scenarioResult.status === "SUCCESS") {
    sendMessage<SuccessMessageParameters>({
      email,
      mailingParams: {
        documentationLink: scenario.docs,
        projectName,
        steps: scenarioResult.steps,
        task: scenario.name,
      },
      operation: operations.messages.success,
    });
  } else {
    const errorMessagePayload: ErrorMessageParameters = {
      projectName,
      videoLink: scenarioResult.error.videoLink,
      errorMessage: scenarioResult.error.errorMessage,
      steps: scenarioResult.steps,
      task: scenario.name,
    };

    const usersToNotifyAboutError = [
      email,
      "nikitin@mindbox.ru",
      "moskalev@mindbox.ru",
    ];

    usersToNotifyAboutError.forEach((email) =>
      sendMessage<ErrorMessageParameters>({
        email,
        mailingParams: errorMessagePayload,
        operation: operations.messages.error,
      })
    );
  }
};

export default startScenarioAndSendResult;
