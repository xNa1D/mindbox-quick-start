import axios from "../../__mocks__/axios";
import startScenario from "../../server/scenario/startScenario";

const mockBody = {
  scenarioApiAddress: ["testApi"],
  projectName: "testProject",
  campaign: 1,
};

describe("startScenario", () => {
  it("should return 200 if resolve", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        code: "SUCCESS",
        data: {
          passing: true
        }
      },
    });

    const res = await startScenario(
      mockBody.scenarioApiAddress,
      mockBody.projectName,
      mockBody.campaign
    );
    expect(res).toStrictEqual({
      resultStatus: { errorMessage: "", status: "SUCCESS" },
      resultSteps: [],
    });
  });

  it("should throw on network error", async () => {
    axios.post = jest.fn().mockRejectedValue({
      status: 500,
    });

    try {
      await startScenario(
        mockBody.scenarioApiAddress,
        mockBody.projectName,
        mockBody.campaign
      );
    } catch (error) {
      expect(error).toBeTruthy();
    }
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
    try {
      await startScenario(
        mockBody.scenarioApiAddress,
        mockBody.projectName,
        mockBody.campaign
      );
    } catch (error) {
      expect(error.toString()).toBe("Error: Internal error in Scenario Server");
    }
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
    try {
      await startScenario(
        mockBody.scenarioApiAddress,
        mockBody.projectName,
        mockBody.campaign
      );
    } catch (error) {
      expect(error.toString()).toBe(
        "Error: Test run reached 10 minute time limit and was stopped"
      );
    }
  });
});
