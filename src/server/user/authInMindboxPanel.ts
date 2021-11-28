import axios from "axios";

type authenticateByAdminPanelArgs = {
  project: string;
  email: string;
  password: string;
};

const checkMindboxAuth = (response: any) => {
  if (response.data.validationSummary?.globalMessages) {
    throw new Error(response.data.validationSummary?.globalMessages);
  }
  return true;
};

const getMindboxTokenFromResponse = (response: any) =>
  response.headers["set-cookie"][0].split(";")[0];

export const authenticateByAdminPanel = async ({
  project,
  email,
  password,
}: authenticateByAdminPanelArgs) => {
  try {
    const response = await axios.post(
      `https://${project}.mindbox.ru/authenticateByUserNameAndPassword`,
      {
        pageState: "login",
        previousPageState: "login",
        confirmationCodeSeconds: 30,
        userName: email,
        password: password,
        validationSummary: null,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );    

    checkMindboxAuth(response);

    return getMindboxTokenFromResponse(response);
  } catch (error) {
    throw error;
  }
};
