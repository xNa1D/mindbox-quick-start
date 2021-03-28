import axios from "../__mocks__/axios";
import startScenario from "../server/models/Scenarios";

const mockBody = {
  scenarioApiAddress: "testApi",
  projectName: "testProject",
  campaign: 1,
};

describe("startScenario", () => {
  it("should return 200 if resolve", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
    });

    const res = await startScenario(
      mockBody.scenarioApiAddress,
      mockBody.projectName,
      mockBody.campaign
    );
    expect(res.status).toBe(200);
  });

  it("should trrow on network error", async () => {
    axios.post = jest.fn().mockRejectedValue({
      status: 500,
    });

    try {
      await await startScenario(
        mockBody.scenarioApiAddress,
        mockBody.projectName,
        mockBody.campaign
      );
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
