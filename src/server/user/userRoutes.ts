import { Request, Response, Router } from "express";
import axios from "axios";

import { authMiddleware, generateAccessToken } from "../auth";

import { AuthRequestBody } from "src/declarations";
import { authenticateByAdminPanel } from "./authInMindboxPanel";

const userRoutes = Router();

userRoutes.post(
  "/authByAdminPanel",
  async (req: Request<unknown, string, AuthRequestBody>, res: Response) => {
    try {
      const { email, password, project } = req.body;

      const mindboxAuthToken = await authenticateByAdminPanel({
        email,
        password,
        project,
      });

      const accessToken = generateAccessToken({
        email: req.body.email,
        project: req.body.project,
        tokenFromAdminPanel: mindboxAuthToken,
      });

      res.send(accessToken);
    } catch (error) {
      let errorText;

      if (axios.isAxiosError(error)) {
        errorText = error.response?.data || error.toString();
      }

      res.status(503).send(errorText);
    }
  }
);

userRoutes.get(
  "/checkToken",
  authMiddleware,
  async (req: Request, res: Response) => {
    res.send(res.locals.user.project);
  }
);

export default userRoutes;
