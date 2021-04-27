import { Request, Response, NextFunction, Router } from "express";

import startScenario from "./startScenario";
import checkToken from "../user/checkTocken";
import SuccessMessage from "./messages/SuccessMessage";
import ErrorMessage from "./messages/ErrorMessage";
import { operations } from "src/data";

import { StartScenarioBody, Step } from "src/declarations";

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
          const successMessage = new SuccessMessage(
            scenarioResult.steps,
            operations.messages.success,
            scenario,
            projectName
          );
          
          successMessage.sendMessage(email);
        } else {
          const errorMessage = new ErrorMessage(
            scenarioResult.steps,
            operations.messages.error,
            scenario,
            projectName,
            scenarioResult.error.videoLink,
            scenarioResult.error.errorMessage,
          );
          errorMessage.sendMessage(email);
          errorMessage.sendMessage("nikitin@mindbox.ru");
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
