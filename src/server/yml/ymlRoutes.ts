import { Request, Response, Router } from "express";

import { authMiddleware, checkToken } from "server/auth";

import sendYmlToMindbox from "./sendYmlToMindbox";
import { createYmlData } from "./createYmlData";
import { YmlRequestType } from "src/declarations";

const ymlRoute = Router();

ymlRoute.post(
  "/start",
  authMiddleware,
  async (req: Request<{}, {}, YmlRequestType>, res: Response) => {
    try {
      const { project, tokenFromAdminPanel } = res.locals.user;
      const { links, settings, authParams } = req.body;

      await sendYmlToMindbox(
        createYmlData(links, settings, authParams),
        project,
        tokenFromAdminPanel
      );

      res.status(200).send("Настройки фидов отправлены");
    } catch (error) {
      res
        .status(403)
        .send("Ошибка отправки фидов. Проверьте авторизацию в проекте");
    }
  }
);

export default ymlRoute;
