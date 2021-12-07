import { Request, Response, Router } from "express";

import { authMiddleware } from "../../auth";
import handleScenarioStart from "../startScenarioAndSendResult";

import { StartScenarioBody } from "src/declarations";

import { config } from "../../../config";
import {
  addNewScenario,
  getAllScenarios,
  updateScenario,
} from "../scenarioController";

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
  authMiddleware,
  async (req: Request<{}, {}, StartScenarioBody>, res: Response) => {
    try {
      handleScenarioStart({
        email: req.body.emailForNotification,
        projectName: res.locals.user.project,
        scenario: req.body.scenario,
        campaign: req.body.campaign,
        adminPanelCookie: res.locals.user.tokenFromAdminPanel,
      });

      res.sendStatus(200);
    } catch (error) {
      res
        .status(403)
        .send("Ошибка запуска. Перезагрузите страницу и попробуйте еще раз");
    }
  }
);

export default scenariosRoutes;
