import { Request, Response, Router } from "express";
import axios from "axios";

import { authMiddleware, generateAccessToken } from "server/auth";

import { AuthRequestBody } from "src/declarations";
import { authenticateByAdminPanel } from "./authInMindboxPanel";

const userRoutes = Router();

userRoutes.post(
  "/auth",
  async (req: Request<{}, {}, AuthRequestBody>, res: Response) => {
    res.send(200);
  }
);

userRoutes.post(
  "/authByAdminPanel",
  async (req: Request<{}, string, AuthRequestBody>, res: Response) => {
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

userRoutes.get("/checkToken", authMiddleware);

export default userRoutes;
