import { StartScenarioType } from "../../scenario/model";
import { createSettings } from "./createSettings";

describe("createSettings", () => {
  const oldScenarioMock: StartScenarioType = {
    scenarioApiAddress: ["testApi"],
    projectName: "testProject",
    campaign: 1,
    ghType: "old",
    adminPanelCookie: "myAwesomeCookie",
  };

  const newScenarioMock: StartScenarioType = {
    ...oldScenarioMock,
    ghType: "new",
  };

  process.env = {
    GH_TOKEN: "oldToken",
    GH_TOKEN_NEW: "newToken",
  };

  test("When scenario is OLD, should return settings for old", async () => {
    const configForApi = createSettings(oldScenarioMock);

    expect(configForApi("testApi")).toStrictEqual({
      options: { headers: { "Content-Type": "application/json" } },
      url: "https://api.ghostinspector.com/v1/tests/testApi/execute/?apiKey=oldToken",
      body: { projectName: "testProject", campaign: 1 },
    });
  });

  test("When scenario is New, should return settings for New", async () => {
    const configForApi = createSettings(newScenarioMock);

    expect(configForApi("testApi")).toStrictEqual({
      options: { headers: { "Content-Type": "application/json" } },
      url: "https://api.ghostinspector.com/v1/tests/testApi/execute/?apiKey=newToken",
      body: {
        projectName: "testProject",
        campaign: 1,
        adminPanelCookie: "myAwesomeCookie",
      },
    });
  });
});
