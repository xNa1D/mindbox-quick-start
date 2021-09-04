import sendMessage from "./sendMessage";
import { operations } from "../../config";
import startScenario from "./startScenario";

import {
  StartScenarioBody,
  SuccessMessageParameters,
  ErrorMessageParameters,
  JwtUser,
  Scenario,
} from "src/declarations";

const startScenarioAndSendResult = async ({
  user,
  projectName,
  scenario,
  campaign,
}: params) => {
  const scenarioResult = await startScenario(
    scenario.api,
    projectName,
    campaign
  );

  if (scenarioResult.status === "SUCCESS") {
    sendMessage<SuccessMessageParameters>({
      email: user.email,
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
      user.email,
      "nikitin@mindbox.ru",
      "moskalev@mindbox.ru",
    ];

    usersToNotifyAboutError.forEach((user) =>
      sendMessage<ErrorMessageParameters>({
        email: user,
        mailingParams: errorMessagePayload,
        operation: operations.messages.error,
      })
    );
  }
};

export default startScenarioAndSendResult;
