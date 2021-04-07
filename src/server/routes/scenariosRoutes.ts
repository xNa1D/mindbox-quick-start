import { Request, Response, NextFunction, Router } from "express";

import startScenario from "../models/Scenarios";
import checkToken from "../helpers/checkTocken";
import sendMessage from "../models/Message";

import { StartScenarioBody } from "src/declarations";

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
        const result = await startScenario(scenario.api, projectName, campaign);
        
        if (result.resultStatus.status === "SUCCESS") {
          sendMessage.ok(projectName, scenario.name, email);
        } else {
          sendMessage.fail(projectName, scenario.name, email);
          sendMessage.fail(projectName, scenario.name, "nikitin@mindbox.ru");
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
