import express from "express";
import * as bodyParser from "body-parser";

import * as dotenv from "dotenv";

import authRouts from "./routs/authRouts";

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(express.static("static"));

app.use("/api/user", authRouts);

const port = process.env.PORT || 3000;

export const server = app.listen(port);
