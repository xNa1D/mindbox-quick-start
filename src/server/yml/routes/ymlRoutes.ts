import { Request, Response, Router } from "express";

import { authMiddleware } from "../../auth";

import sendYmlToMindbox from "../sendYmlToMindbox";
import { createYmlData } from "../createYmlData";

type Url = string;
type AreaId = string;
type Name = string;

export type YmlRequestType = {
  links: Link[];
  settings: Settings;
  authParams?: AuthParams;
};

export type Link = { url: Url; name: Name; areaExternalId?: AreaId };

export type AuthParams = {
  password: string;
  username: string;
};

export type Settings = {
  brand: string;
  externalSystem: string;
  launchPeriod: number;
};

const ymlRoute = Router();

ymlRoute.post(
  "/start",
  authMiddleware,
  async (req: Request<unknown, unknown, YmlRequestType>, res: Response) => {
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
