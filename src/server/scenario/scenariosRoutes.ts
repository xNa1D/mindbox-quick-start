import { Request, Response, NextFunction, Router } from "express";

import startScenario from "./startScenario";
import checkToken from "../user/checkTocken";
import sendMessage from "./sendMessage";
import { operations } from "../../config";

import {
  StartScenarioBody,
  SuccessMessageParameters,
  ErrorMessageParameters,
} from "src/declarations";

const scenariosRoutes = Router();
scenariosRoutes.post(
  "/start",
  async (
    req: Request<{}, {}, StartScenarioBody>,
    res: Response,
    next: NextFunction
  ) => {
    let email: string = "";

    try {
      email = checkToken(req.cookies.token).email;
      res.sendStatus(200);

      const projectName = req.body.projectName;
      const scenario = req.body.scenario;
      const campaign = req.body.campaign;

      try {
        const scenarioResult = await startScenario(
          scenario.api,
          projectName,
          campaign
        );

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

          sendMessage<ErrorMessageParameters>({
            email,
            mailingParams: errorMessagePayload,
            operation: operations.messages.error,
          });
          sendMessage<ErrorMessageParameters>({
            email: "nikitin@mindbox.ru",
            mailingParams: errorMessagePayload,
            operation: operations.messages.error,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      res.status(403).send(error);
      next();
    }
  }
);

export default scenariosRoutes;
