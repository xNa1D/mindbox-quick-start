import axios from "axios";
import getScenarioDescription from "src/client/pages/scenario/getScenarioDescription";

jest.mock("axios");

const mockFileName = "AwesomeFile";

const validFile = {
  files: {
    "AwesomeFile.md": {
      content: "Супер прекрасное описание теста",
    },
  },
};

describe("getScenarioDescription", () => {
  test("When getting valid file, should return MD with content", async () => {
    axios.get = jest.fn().mockResolvedValue({ status: 200, data: validFile });

    const answer = await getScenarioDescription(mockFileName);

    expect(answer).toBe(validFile.files["AwesomeFile.md"].content);
  });
  test("When getting non-existent file, should return undefined", async () => {
    axios.get = jest.fn().mockResolvedValue({ status: 200, data: validFile });

    const answer = await getScenarioDescription("fakeFile");

    expect(answer).toBe(undefined);
  });
});
