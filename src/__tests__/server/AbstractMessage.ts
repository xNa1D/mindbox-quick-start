import AbstractMessage from "server/scenario/AbstractMessage";
import mockScenarioResult from "../../__mocks__/mockScenarioResult.json";

const mockResult = mockScenarioResult;

const mockScenario = {
  type: "ecommerce",
  name: "Стандартные операции для интернет магазина",
  docs:
    "https://docs.google.com/document/d/1VoY1pre3ZqdBBuIxb4-1IIiZr5W-NkTUUrAimxeCfW4/edit",
  api: ["5ec6c26197e4531b3a9d9864"],
};

it("should parse steps", () => {
  const message = new AbstractMessage(
    mockResult,
    "nikitin@mindbox.ru",
    mockScenario
  );

  expect(message.steps).toStrictEqual([
    {
      name: "Стандартные операции для ИМ - Вход на проект",
      status: true,
    },
    {
      name: "Стандартные операции для ИМ - ШД для импорта клиентов",
      status: true,
    },
    {
      name:
        "Стандартные операции для ИМ - ШД для создания клиентов администратором",
      status: false,
    },
  ]);
});
