import { Request, Response, NextFunction, Router } from "express";

import startScenario from "./startScenario";
import checkToken  from "../user/checkTocken";
import sendMessage from "./sendMessage";
import { operations } from "../../config";

import {
  StartScenarioBody,
  SuccessMessageParameters,
  ErrorMessageParameters,
  JwtUser
} from "src/declarations";

const scenariosRoutes = Router();
scenariosRoutes.post(
  "/start",
  async (
    req: Request<{}, {}, StartScenarioBody>,
    res: Response,
    next: NextFunction
  ) => {
    let user:JwtUser; 
    try {
      user = checkToken(req.cookies.token);
      res.sendStatus(200);

      const projectName = user.project || "";
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

          sendMessage<ErrorMessageParameters>({
            email: user.email,
            mailingParams: errorMessagePayload,
            operation: operations.messages.error,
          });
          sendMessage<ErrorMessageParameters>({
            email: "nikitin@mindbox.ru",
            mailingParams: errorMessagePayload,
            operation: operations.messages.error,
          });
          sendMessage<ErrorMessageParameters>({
            email: "moskalev@mindbox.ru",
            mailingParams: errorMessagePayload,
            operation: operations.messages.error,
          });
        }
      } catch (error) {
        throw error;
      }
    } catch (error) {
      res.status(403).send(error);
      next();
    }
  }
);

export default scenariosRoutes;
