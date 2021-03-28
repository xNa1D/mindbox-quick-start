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
      
      try {
        await startScenario(
          req.body.scenario.api,
          req.body.projectName,
          req.body.campaign
        );

        sendMessage.ok(req.body.projectName, req.body.scenario.name, email);
      } catch (error) {
        sendMessage.fail(req.body.projectName, req.body.scenario.name, email);
      }
    } catch (error) {
      res.status(403).send(error);
      next();
    }
  }
);

export default scenariosRoutes;
