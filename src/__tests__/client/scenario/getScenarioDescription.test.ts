import axios from "src/__mocks__/axios";
import getScenarioDescription from "client/scenario/getScenarioDescription";
import mockSuccessGistAnswer from "src/__mocks__/mockSuccessGistAnswer.json";

const mockFileName = "AwesomeFile";

describe("get scenario info", () => {
  test("should return valid MD", async () => {
    axios.get = jest
      .fn()
      .mockResolvedValue({ status: 200, data: mockSuccessGistAnswer });

    const answer = await getScenarioDescription(mockFileName);
    
    expect(answer).toBe(mockSuccessGistAnswer.files["AwesomeFile.md"].content);
  });
  test("should return valid MD", async () => {
    axios.get = jest
      .fn()
      .mockResolvedValue({ status: 200, data: mockSuccessGistAnswer });

    const answer = await getScenarioDescription("fakeFile");
    
    expect(answer).toBe(undefined);

  });
});
