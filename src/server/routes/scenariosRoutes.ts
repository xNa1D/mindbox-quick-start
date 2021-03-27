import { Request, Response, NextFunction, Router } from "express";

import scenarios from "../models/Scenarios";
import checkToken from "../helpers/checkTocken";
import sendMessage from "../models/Message";

import { ScenarioRequestBody } from "src/declarations";

const scenariosRoutes = Router();
scenariosRoutes.post(
  "/start",
  async (
    req: Request<{}, {}, ScenarioRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    let email: string | undefined;
    let scenarioResult;

    try {
      try {
        email = checkToken(req.cookies.token).email;
      } catch (error) {
        res.status(403).send(error);
      }

      res.sendStatus(200);

      const scenario = scenarios[req.body.taskName];
      await scenario(req.body.projectName, req.body.campaingNumber);

      if (email) {
        sendMessage.ok(req.body.projectName, req.body.taskName, email);
      }
    } catch (error) {
      if (email) {
        sendMessage.fail(req.body.projectName, req.body.taskName, email);
      }
    }
  }
);

export default scenariosRoutes;
