import axios from "axios";

const sendMessage = {
  ok: (projectName: string, taskName: string, email: string) =>
    axios.post(
      `https://api.mindbox.ru/v3/operations/async?endpointId=${process.env.ENDPOINT}&operation=QuickStart.SendSuccessStatus`,
      {
        customer: {
          email: email,
        },
        emailMailing: {
          customParameters: {
            Task: taskName,
            TaskProjectName: projectName,
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
  fail: (projectName: string, taskName: string, email: string) =>
    axios.post(
      `https://api.mindbox.ru/v3/operations/async?endpointId=${process.env.ENDPOINT}&operation=QuickStart.SendErrorStatus`,
      {
        customer: {
          email: email,
        },
        emailMailing: {
          customParameters: {
            Task: taskName,
            TaskProjectName: projectName,
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
