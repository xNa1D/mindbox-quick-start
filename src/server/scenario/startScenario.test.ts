import axios from "axios";

import startScenario from "./startScenario";

import { Step } from "src/declarations";
import { parseStepsInfo } from "../ghost-inspector/utils/parseStepsInfo";
import { StartScenarioType } from "./model";

const mockBody: StartScenarioType = {
  scenarioApiAddress: ["testApi"],
  projectName: "testProject",
  campaign: 1,
  ghType: "old" as "old" | "new",
  adminPanelCookie: "myAwesomeCookie",
};

jest.mock("../ghost-inspector/utils/parseStepsInfo.ts");

const expectedSteps: Step[] = [
  { name: "Вход на проект", status: null },
  { name: "ШД для импорта клиентов", status: true },
  { name: "ШД для создания клиентов администратором", status: false },
];

const mockSuccessResult = {
  status: 200,
  data: {
    code: "SUCCESS",
    data: {
      passing: true,
    },
  },
};

(parseStepsInfo as jest.Mock).mockReturnValue(expectedSteps);

describe("startScenario", () => {
  it("When execution ends OK, should return object with SUCCESS results with proper steps", async () => {
    axios.post = jest.fn().mockResolvedValue(mockSuccessResult);

    const res = await startScenario(mockBody);
    expect(res).toStrictEqual({
      error: {},
      status: "SUCCESS",
      steps: expectedSteps,
    });
  });

  it("When scenario has 2 api calls, should start 2 scenarios and return status with steps of both", async () => {
    axios.post = jest.fn().mockResolvedValue(mockSuccessResult);

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

  it("When network error occurs, should return error status", async () => {
    axios.post = jest.fn().mockRejectedValue({
      status: 500,
    });

    const response = await startScenario(mockBody);

    expect(response.status).toBe("ERROR");
  });

  it("When ghost inspector return error, should return error message", async () => {
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

  it("When scenario execution fails, should return error detail", async () => {
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
});