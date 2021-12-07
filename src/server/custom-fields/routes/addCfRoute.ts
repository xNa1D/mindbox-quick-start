import { Request, Response, Router } from "express";

import { authMiddleware } from "../../auth";
import { runAndNotify } from "../runAndNotify";
import { CustomFieldObject } from "..";

const addingCfRoutes = Router();

addingCfRoutes.post(
  "/start",
  authMiddleware,
  async (
    req: Request<unknown, unknown, { cfs: CustomFieldObject[] }>,
    res: Response
  ) => {
    try {
      runAndNotify(req.body.cfs, res.locals.user);

      res.sendStatus(200);
    } catch (error) {
      res
        .status(403)
        .send("Ошибка запуска. Перезагрузите страницу и попробуйте еще раз");
    }
  }
);

export default addingCfRoutes;
