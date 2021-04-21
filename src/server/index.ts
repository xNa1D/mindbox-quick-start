import express from "express";
import * as bodyParser from "body-parser";
import coockieParser from "cookie-parser";
import * as dotenv from "dotenv";
import morgan from "morgan";
import path from "path";

import userRoutes from "./user/userRoutes";
import scenariosRoutes from "./scenario/scenariosRoutes";

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use(coockieParser());

// app.use("/", pagesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/scenario", scenariosRoutes);

app.use(express.static(path.resolve(__dirname, "../client")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../client", "index.html"))
);

const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  console.log(`Server start on http://localhost:${port}`);
});
