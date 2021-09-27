import { Request, Response, Router } from "express";

import checkToken from "../user/checkTocken";

import sendYmlToMindbox from "./sendYmlToMindbox";
import createYmlData from "./createYmlData";
import { YmlRequestType } from "src/declarations";



const ymlRoute = Router();
ymlRoute.post(
  "/start",
  async (req: Request<{}, {}, YmlRequestType>, res: Response) => {
    try {
      const user = checkToken(req.cookies.token);

      const { project, tokenFromAdminPanel } = user;
      const { links, settings, authParams } = req.body;

      const ymlData = createYmlData(links, settings, authParams);
      await sendYmlToMindbox(ymlData, project, tokenFromAdminPanel);

      res.status(200).send("Настройки фидов отправлены");
    } catch (error) {
      console.log(error);
      
      res.status(403).send(
        "Ошибка отправки фидов. Проверьте авторизацию в проекте"
      );
    }
  }
);

export default ymlRoute;
