import express from "express";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import path from "path";

import userRoutes from "./user/userRoutes";
import scenariosRoutes from "./scenario/routes/scenariosRoutes";
import ymlRoute from "./yml/routes/ymlRoutes";
import { initDb } from "./db";

initDb();

export const app = express();

dotenv.config();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

// app.use("/", pagesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/scenario", scenariosRoutes);
app.use("/api/yml", ymlRoute);

app.use(express.static(path.resolve(__dirname, "../client")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../client", "index.html"))
);

process.on("unhandledRejection", error => {
  // Will print "unhandledRejection err is not defined"
  console.log("unhandledRejection", error);
});

process.on("uncaughtException", err => {
  console.error("There was an uncaught error", err);
  // process.exit(1); //mandatory (as per the Node.js docs)
});
