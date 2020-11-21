import { Request, Response, NextFunction, Router } from "express";
import path from "path";
import checkToken from "../helpers/checkTocken";

const pagesRoutes = Router();

pagesRoutes.get("/", (req: Request, res: Response) => {
  try {
    checkToken(req.cookies.token || "");

    res.redirect("/scenario");
  } catch (error) {
    console.log(error);

    res.sendFile(path.resolve(__dirname, "../static/login.html"));
  }
});

pagesRoutes.get("/registration", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../static/reg.html"));
});

pagesRoutes.get("/scenario", (req: Request, res: Response) => {
  try {
    checkToken(req.cookies.token || "");
    res.sendFile(path.resolve(__dirname, "../static/scenario.html"));
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

export default pagesRoutes;
