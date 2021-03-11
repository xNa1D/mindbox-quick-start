import axios from "axios";
import { ScenarioNames } from "src/declarations";

type taskNameHuman = { [K in ScenarioNames]: string };

const taskNameHuman: taskNameHuman = {
  ecommerce: "Стандартные операции для интернет магазина",
  loyaltyOffline: "Операции для ПЛ на кассе",
  loyaltyOnline: "Операции для ПЛ на сайте",
  mobilePush: "Стандратная интеграция мобильного приложения",
};

const sendMessage = {
  ok: (projectName: string, taskName: ScenarioNames, email: string) =>
    axios.post(
      `https://api.mindbox.ru/v3/operations/async?endpointId=${process.env.ENDPOINT}&operation=QuickStart.SendSuccessStatus`,
      {
        customer: {
          email: email,
        },
        emailMailing: {
          customParameters: {
            Task: taskNameHuman[taskName],
            TaskProjectName: projectName,
            StandardNotificationParameters: {
              ProjectName: "",
            },
            ExportTask: {
              ResultUrl: "",
            },
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          Authorization: `Mindbox secretKey="${process.env.SECRET_KEY}"`,
        },
      }
    ),
  fail: (projectName: string, taskName: ScenarioNames, email: string) =>
    axios.post(
      `https://api.mindbox.ru/v3/operations/async?endpointId=${process.env.ENDPOINT}&operation=QuickStart.SendErrorStatus`,
      {
        customer: {
          email: email,
        },
        emailMailing: {
          customParameters: {
            Task: taskNameHuman[taskName],
            TaskProjectName: projectName,
            StandardNotificationParameters: {
              ProjectName: "",
            },
            ExportTask: {
              ResultUrl: "",
            },
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          Authorization: `Mindbox secretKey="${process.env.SECRET_KEY}"`,
        },
      }
    ),
};

export default sendMessage;
