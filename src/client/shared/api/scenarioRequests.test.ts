import startScenario from "src/client/shared/api/scenarioRequests";

import { StartScenarioBody } from "src/declarations";

import axios from "axios";

jest.mock("axios");

const mockScenarioBody: StartScenarioBody = {
  campaign: 1,
  emailForNotification: "call@me.pleas",
  projectName: "myAwesomeProject",
  scenario: {
    api: ["myBestApi"],
    docs: "bestDocsEver",
    ghType: "new",
    name: "myBestTest",
    type: "myBestTest",
  },
};

describe("startScenario", () => {
  test("should call api with passed params", async () => {
    await startScenario(mockScenarioBody);
    expect(axios.post).toBeCalledWith("/api/scenario/start", mockScenarioBody, {
      headers: { "content-type": "application/json" },
    });
  });
});
