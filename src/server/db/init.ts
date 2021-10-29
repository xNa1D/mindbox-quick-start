import path from "path";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "../../../data/database.sqlite"),
});

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    sequelize.sync({ alter: true });

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
