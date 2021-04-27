import ErrorMessage from "src/server/scenario/messages/ErrorMessage";
import axios from "src/__mocks__/axios";
import mockScenarioResult from "../../__mocks__/mockScenarioResult.json";

jest.mock("jest");

const mockResult = mockScenarioResult;

const mockScenario = {
  type: "ecommerce",
  name: "Стандартные операции для интернет магазина",
  docs:
    "https://docs.google.com/document/d/1VoY1pre3ZqdBBuIxb4-1IIiZr5W-NkTUUrAimxeCfW4/edit",
  api: ["5ec6c26197e4531b3a9d9864"],
};

const expectedSteps = [
  { name: "Вход на проект", status: null },
  { name: "ШД для импорта клиентов", status: true },
  { name: "ШД для создания клиентов администратором", status: false },
];

it("should parse steps", () => {
  const message = new ErrorMessage(
    mockResult.data.steps,
    mockResult.data.video.url,
    mockResult.data.error.details,
    "testOperation",
    mockScenario,
    "testProject"
  );

  expect(message.steps).toStrictEqual(expectedSteps);
});

it("should invoke operation properly", () => {
  const message = new ErrorMessage(
    mockResult.data.steps,
    mockResult.data.video.url,
    mockResult.data.error.details,
    "testOperation",
    mockScenario,
    "testProject"
  );

  message.sendMessage("test@mindbox.ru");

  expect(axios.post).toHaveBeenCalledWith(
    "https://api.mindbox.ru/v3/operations/async",
    {
      customer: { email: "test@mindbox.ru" },
      emailMailing: {
        customParameters: {
          videoLink:
            "https://ghostinspector-prod.s3.amazonaws.com/videos/a6306a8a-059a-4fda-a1ae-74c973d362b4.mp4",
          errorMessage: "Test run reached 10 minute time limit and was stopped",
          projectName: "testProject",
          steps: [
            { name: "Вход на проект", status: null },
            { name: "ШД для импорта клиентов", status: true },
            { name: "ШД для создания клиентов администратором", status: false },
          ],
          task: "Стандартные операции для интернет магазина",
        },
      },
    },
    {
      headers: {
        Accept: "application/json",
        Authorization: 'Mindbox secretKey="undefined"',
        "Content-Type": "application/json; charset=utf-8",
      },
      params: { endpointId: undefined, operation: "testOperation" },
    }
  );
});
