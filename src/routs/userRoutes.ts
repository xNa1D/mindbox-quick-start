import { Request, Response, NextFunction, Router } from "express";

import User from "../models/User";
import generateAccessToken from "../helpers/generateAccessToken";

const userRoutes = Router();
userRoutes.post("/auth", async (req: Request, res: Response) => {
  const user = new User(req.body.email, req.body.password);
  const isLoggedSuccessfully = await user.loginStuff();

  let accessToken: string;
  try {
    if (isLoggedSuccessfully) {
      accessToken = generateAccessToken(user.email);
      res.send(accessToken);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);

    res.sendStatus(503);
  }
});

userRoutes.post("/reg", async (req: Request, res: Response) => {
  const user = new User(req.body.email, req.body.password);
  try {
    const isUserExist = await user.isStuffExistInMindbox();
    if (isUserExist) {
      await user.registrStuff();
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(503);
  }
});

export default userRoutes;
