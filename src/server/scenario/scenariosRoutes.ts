import { Request, Response, NextFunction, Router } from "express";

import checkToken from "../user/checkTocken";
import startScenarioAndSendResult from "./startScenarioAndSendResult";

import { StartScenarioBody, JwtUser } from "src/declarations";

import { config } from "../../config";
import { addNewScenario, getAllScenarios, updateScenario } from "./scenarioController";

const scenariosRoutes = Router();

scenariosRoutes.get("/", async (req, res) => {
  try {
    const allScenarios = await getAllScenarios();
    res.json(allScenarios);
  } catch (error) {
    res.status(500).send(error);
  }
});

scenariosRoutes.post("/add", async (req, res) => {
  if (req.body.secret !== config.SECRET_FOR_ADDING_SCENARIO) {
    res.status(403).send("Invalid secret");
  }
  try {
    await addNewScenario(req.body.scenario);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

scenariosRoutes.post("/update", async (req, res) => {
  if (req.body.secret !== config.SECRET_FOR_ADDING_SCENARIO) {
    res.status(403).send("Invalid secret");
  }
  try {
    await updateScenario(req.body.scenario);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

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
        adminPanelCookie: user.tokenFromAdminPanel || "",
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
