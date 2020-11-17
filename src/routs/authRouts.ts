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

const authRouts = () => {
  const router = Router();

  router.post("/auth", async (req: Request, res: Response) => {
    const user = new User(req.body.email, req.body.password);
    const isLoggedSuccessfully = await user.loginStuff();

    let accessToken: string;

    if (isLoggedSuccessfully) {
      accessToken = generateAccessToken(user.email);
      res.send(accessToken);
    } else {
      res.sendStatus(403);
    }
  });
};

export default authRouts;
