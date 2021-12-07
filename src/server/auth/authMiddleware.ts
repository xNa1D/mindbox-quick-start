import { Request, Response, NextFunction, Router } from "express";

import { checkToken } from ".";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = checkToken(req.cookies.token);
    res.locals.user = user;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};
