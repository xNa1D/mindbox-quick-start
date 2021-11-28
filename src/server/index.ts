import { app } from "./app";

const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  console.log(`Server start on http://localhost:${port}`);
});
