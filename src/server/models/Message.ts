import axios from "axios";
import { ScenarioNames } from "src/declarations";
import { taskNameHuman } from 'src/config';

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
