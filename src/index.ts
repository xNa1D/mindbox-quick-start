import express = require("express");

import authRouts from "./routs/authRouts";

const app = express();

app.use(express.json());
app.use(express.static("static"));

app.use("/api/user", authRouts);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server is running on http://localhos:${port}`)
);
