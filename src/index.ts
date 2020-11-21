import express from "express";
import * as bodyParser from "body-parser";
import coockieParser from "cookie-parser";
import * as dotenv from "dotenv";
import morgan from "morgan";

import userRoutes from "./routs/userRoutes";
import scenariosRoutes from "./routs/scenariosRoutes";
import pagesRoutes from "./routs/pagesRoutes";

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(coockieParser());
app.use(express.static("./src/static"));

app.use("/", pagesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/scenario", scenariosRoutes);

const port = process.env.PORT || 3000;

export const server = app.listen(port);
