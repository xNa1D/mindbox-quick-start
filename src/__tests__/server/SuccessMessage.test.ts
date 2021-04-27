import SuccessMessage from "src/server/scenario/messages/SuccessMessage";
import axios from "src/__mocks__/axios";

jest.mock("jest");

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

it("should invoke operation properly", () => {
  const message = new SuccessMessage({
    steps: expectedSteps,
    operation: "testOperation",
    scenario: mockScenario,
    projectName: "testProject",
  });

  message.sendMessage("test@mindbox.ru");

  expect(axios.post).toHaveBeenCalledWith(
    "https://api.mindbox.ru/v3/operations/async",
    {
      customer: { email: "test@mindbox.ru" },
      emailMailing: {
        customParameters: {
          documentationLink:
            "https://docs.google.com/document/d/1VoY1pre3ZqdBBuIxb4-1IIiZr5W-NkTUUrAimxeCfW4/edit",
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
