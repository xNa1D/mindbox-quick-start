import { Request, Response, NextFunction, Router } from "express";

import checkToken from "../user/checkTocken";
import startScenarioAndSendResult from "./startScenarioAndSendResult";

import { StartScenarioBody, JwtUser } from "src/declarations";

const scenariosRoutes = Router();
scenariosRoutes.post(
  "/start",
  async (
    req: Request<{}, {}, StartScenarioBody>,
    res: Response,
    next: NextFunction
  ) => {
    let user: JwtUser;
    try {
      user = checkToken(req.cookies.token);
      // jwt is OK. will start scenario async
      res.sendStatus(200);

      const projectName = user.project || "";
      const scenario = req.body.scenario;
      const campaign = req.body.campaign;
      const email = req.body.emailForNotification; 

      await startScenarioAndSendResult({
        email,
        projectName,
        scenario,
        campaign,
        adminPanelCookie: user.tokenFromAdminPanel || ""
      });
    } catch (error) {
      res
        .status(403)
        .send("Ошибка запуска. Перезагрузите страницу и попробуйте еще раз");
      next();
    }
  }
);

export default scenariosRoutes;
