import SuccessMessage from "server/scenario/SuccessMessage";
import mockScenarioResult from "../../__mocks__/mockScenarioResult.json";

const mockResult = mockScenarioResult;

const mockScenario = {
  type: "ecommerce",
  name: "Стандартные операции для интернет магазина",
  docs:
    "https://docs.google.com/document/d/1VoY1pre3ZqdBBuIxb4-1IIiZr5W-NkTUUrAimxeCfW4/edit",
  api: ["5ec6c26197e4531b3a9d9864"],
};

const expectedSteps = [
  {
    name: "Вход на проект",
    status: null,
  },
  {
    name: "ШД для импорта клиентов",
    status: true,
  },
  {
    name:
      "ШД для создания клиентов администратором",
    status: false,
  },
];

it("should parse steps", () => {
  const message = new SuccessMessage(
    mockResult,
    "nikitin@mindbox.ru",
    mockScenario
  );

  expect(message.steps).toStrictEqual(expectedSteps);
});
