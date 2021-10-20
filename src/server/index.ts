import express from "express";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import path from "path";

import userRoutes from "./user/userRoutes";
import scenariosRoutes from "./scenario/scenariosRoutes";
import ymlRoute from "./yml/ymlRoutes";
import { initDb } from "./db";

initDb();

const app = express();

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

const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  console.log(`Server start on http://localhost:${port}`);
});
