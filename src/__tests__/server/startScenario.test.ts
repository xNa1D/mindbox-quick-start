import axios from "../../__mocks__/axios";
import startScenario from "../../server/scenario/startScenario";
import mockScenarioResultError from "../../__mocks__/mockScenarioResultError.json";
import mockScenarioResultSuccess from "../../__mocks__/mockScenarioResultSuccess.json";
import mockScenarioResultPartlySuccess from "../../__mocks__/mockScenarioResultPartlySuccess.json";
import { StartScenarioType, Step } from "src/declarations";

const mockBody: StartScenarioType = {
  scenarioApiAddress: ["testApi"],
  projectName: "testProject",
  campaign: 1,
  ghType: "old" as "old" | "new",
  adminPanelCookie: "myAwesomeCookie",
};

const expectedSteps: Step[] = [
  { name: "Вход на проект", status: null },
  { name: "ШД для импорта клиентов", status: true },
  { name: "ШД для создания клиентов администратором", status: false },
];

describe("start scenario and", () => {
  it("should return object with SUCCESS results and partly failed steps", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: mockScenarioResultSuccess,
    });

    const res = await startScenario(mockBody);
    expect(res).toStrictEqual({
      error: {},
      status: "SUCCESS",
      steps: expectedSteps,
    });
  });

  it("should return object with SUCCESS results and all done steps", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: mockScenarioResultPartlySuccess,
    });

    const res = await startScenario(mockBody);
    expect(res).toStrictEqual({
      error: {},
      status: "SUCCESS",
      steps: [
        { name: "Вход на проект", status: true },
        { name: "ШД для импорта клиентов", status: true },
        { name: "ШД для создания клиентов администратором", status: true },
      ],
    });
  });

  it("should start 2 scenarios and return status with both steps", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: mockScenarioResultSuccess,
    });
    const mockBodyWith2apis = {
      ...mockBody,
      scenarioApiAddress: ["test1", "test2"],
    };
    const res = await startScenario(mockBodyWith2apis);
    expect(axios.post).toHaveBeenCalledTimes(2);
    expect(res).toStrictEqual({
      error: {},
      status: "SUCCESS",
      steps: [...expectedSteps, ...expectedSteps],
    });
  });

  it("should return correct object with error result", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: mockScenarioResultError,
    });

    const res = await startScenario(mockBody);

    expect(res).toStrictEqual({
      error: {
        errorMessage: "Test run reached 10 minute time limit and was stopped",
        videoLink:
          "https://ghostinspector-prod.s3.amazonaws.com/videos/a6306a8a-059a-4fda-a1ae-74c973d362b4.mp4",
      },
      status: "ERROR",
      steps: [...expectedSteps],
    });
  });
});

it("should throw on network error", async () => {
  axios.post = jest.fn().mockRejectedValue({
    status: 500,
  });

  const response = await startScenario(mockBody);

  expect(response.status).toBe("ERROR");
});

it("should throw internal error of code not SUCCESS", async () => {
  axios.post = jest.fn().mockResolvedValue({
    status: 200,
    data: {
      code: "ERROR",
      data: {
        passing: true,
      },
    },
  });
  const response = await startScenario(mockBody);
  expect(response.error?.errorMessage).toBe(
    "Internal error in Scenario Server"
  );
});

it("should throw internal error of code not SUCCESS", async () => {
  axios.post = jest.fn().mockResolvedValue({
    status: 200,
    data: {
      code: "SUCCESS",
      data: {
        passing: false,
        error: {
          details: "Test run reached 10 minute time limit and was stopped",
        },
      },
    },
  });

  const response = await startScenario(mockBody);
  expect(response.error?.errorMessage).toBe(
    "Test run reached 10 minute time limit and was stopped"
  );
});

describe("create different settings of scenario ", () => {
  const oldScenarioMock: StartScenarioType = {
    scenarioApiAddress: ["testApi"],
    projectName: "testProject",
    campaign: 1,
    ghType: "old",
    adminPanelCookie: "myAwesomeCookie",
  };
  const newScenarioMock: StartScenarioType = {
    scenarioApiAddress: ["testApi"],
    projectName: "testProject",
    campaign: 1,
    ghType: "new",
    adminPanelCookie: "myAwesomeCookie",
  };

  process.env = {
    GH_TOKEN: "oldToken",
    GH_TOKEN_NEW: "newToken",
  };

  test("should call OLD api", async () => {
    axios.post = jest.fn();

    await startScenario(oldScenarioMock);
    expect(axios.post).toHaveBeenCalledWith(
      "https://api.ghostinspector.com/v1/tests/testApi/execute/?apiKey=oldToken",
      {
        campaign: 1,
        projectName: "testProject",
      },
      { headers: { "Content-Type": "application/json" } }
    );
  });

  test("should call NEW GH api", async () => {
    axios.post = jest.fn();

    await startScenario(newScenarioMock);
    expect(axios.post).toHaveBeenCalledWith(
      "https://api.ghostinspector.com/v1/tests/testApi/execute/?apiKey=newToken",
      {
        adminPanelCookie: "myAwesomeCookie",
        campaign: 1,
        projectName: "testProject",
      },
      { headers: { "Content-Type": "application/json" } }
    );
  });
});
