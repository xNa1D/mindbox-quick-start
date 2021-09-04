import axios from "../../__mocks__/axios";
import startScenario from "../../server/scenario/startScenario";
import mockScenarioResultError from "../../__mocks__/mockScenarioResultError.json";
import mockScenarioResultSuccess from "../../__mocks__/mockScenarioResultSuccess.json";
import mockScenarioResultPartlySuccess from "../../__mocks__/mockScenarioResultPartlySuccess.json";

const mockBody = {
  scenarioApiAddress: ["testApi"],
  projectName: "testProject",
  campaign: 1,
  ghType: "old" as "old"|"new",
};

const expectedSteps = [
  { name: "Вход на проект", status: null },
  { name: "ШД для импорта клиентов", status: true },
  { name: "ШД для создания клиентов администратором", status: false },
];

describe("checking returning object", () => {
  it("should return correct object with results", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: mockScenarioResultSuccess,
    });

    const res = await startScenario(mockBody);
    expect(res).toStrictEqual({
      error: {
        errorMessage: "",
        videoLink: "",
      },
      status: "SUCCESS",
      steps: expectedSteps,
    });
  });

  it("should return correct object with results", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: mockScenarioResultPartlySuccess,
    });

    const res = await startScenario(mockBody);
    expect(res).toStrictEqual({
      error: {
        errorMessage: "",
        videoLink: "",
      },
      status: "SUCCESS",
      steps: [
        { name: "Вход на проект", status: true },
        { name: "ШД для импорта клиентов", status: true },
        { name: "ШД для создания клиентов администратором", status: true },
      ],
    });
  });

  it("should return correct object with results if run 2 api calls", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: mockScenarioResultSuccess,
    });
    const mockBodyWith2apis = {
      ...mockBody,
      scenarioApiAddress: ["test1", "test2"]
    };
    const res = await startScenario(mockBodyWith2apis);
    expect(axios.post).toHaveBeenCalledTimes(2);
    expect(res).toStrictEqual({
      error: {
        errorMessage: "",
        videoLink: "",
      },
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
  expect(response.error.errorMessage).toBe("Internal error in Scenario Server");
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
  expect(response.error.errorMessage).toBe(
    "Test run reached 10 minute time limit and was stopped"
  );
});
