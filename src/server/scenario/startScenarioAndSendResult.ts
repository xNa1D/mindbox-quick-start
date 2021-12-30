import { sendMessage } from "../notification";
import { operations } from "../../config";
import startScenario from "./startScenario";

import { StartScenarioType, StartScenarioAndSendResultType } from "./model";

import {
  SuccessMessageParameters,
  ErrorMessageParameters,
} from "src/declarations";

const handleScenarioStart = async ({
  email,
  projectName,
  scenario,
  campaign,
  adminPanelCookie,
}: StartScenarioAndSendResultType) => {
  const scenarioData: StartScenarioType = {
    campaign,
    ghType: scenario.ghType,
    projectName,
    scenarioApiAddress: scenario.api,
    adminPanelCookie,
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
      videoLink: (scenarioResult.error?.videoLink as string) || "",
      errorMessage: (scenarioResult.error?.errorMessage as string) || "",
      steps: scenarioResult.steps,
      task: scenario.name,
    };

    const usersToNotifyAboutError = [
      email,
      "nikitin@mindbox.ru",
      "moskalev@mindbox.ru",
    ];

    usersToNotifyAboutError.forEach(email =>
      sendMessage<ErrorMessageParameters>({
        email,
        mailingParams: errorMessagePayload,
        operation: operations.messages.error,
      })
    );
  }
};

export default handleScenarioStart;
