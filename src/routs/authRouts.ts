import { Request, Response, NextFunction, Router } from "express";

import User from "../models/User";
import generateAccessToken from "../helpers/generateAccessToken";

declare namespace myExpress {
  interface Request {
    body: {
      email: string;
      password: string;
    };
  }

  interface Response {
    body: {
      isLoggedIn: boolean;
      token: string;
    };
  }
}

const authRouter = Router();
authRouter.post("/auth", async (req: Request, res: Response) => {
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

export default authRouter;
