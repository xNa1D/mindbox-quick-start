import { prepareScenarioSettingsArgs } from "../startScenario";

export const createSettings = ({
  ghType, projectName, campaign, adminPanelCookie,
}: prepareScenarioSettingsArgs) => (api: string) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let token;
  let body;
  if (ghType === "old") {
    token = process.env.GH_TOKEN;
    body = { projectName, campaign };
  } else {
    token = process.env.GH_TOKEN_NEW;
    body = { projectName, campaign, adminPanelCookie };
  }

  return {
    options,
    url: `https://api.ghostinspector.com/v1/tests/${api}/execute/?apiKey=${token}`,
    body,
  };
};
