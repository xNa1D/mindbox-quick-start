import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import ScenarioInfo from "src/client/pages/scenario/ScenarioInfo";
import getScenarioDescription from "src/client/pages/scenario/getScenarioDescription";
import { Scenario } from "src/declarations";

jest.mock("axios");
jest.mock("client/scenario/getScenarioDescription");

const customRender = async (
  ui: any,
  { renderOptions }: any = {}
) => {
  return await act(async () => {
    render(ui, renderOptions);
  });
};

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const mockScenario: Scenario = {
  api: ["awesomeApi"],
  docs: "awesomeDocs",
  ghType: "new",
  name: "awesomeName",
  type: "testType",
};

test("should render info from gist", async () => {
  (getScenarioDescription as jest.Mock).mockRejectedValue("Описание сценария");

  customRender(<ScenarioInfo scenario={mockScenario} />);

  await delay(500);

  expect(screen.getByText("Описание сценария")).toBeInTheDocument();
  expect(screen.getByText("Заготовка под ТЗ")).toBeInTheDocument();
});

test("should not render button if link is empty", async () => {
  customRender(
    <ScenarioInfo
      scenario={{
        api: ["awesomeApi"],
        docs: "",
        ghType: "new",
        name: "awesomeName",
        type: "testType",
      }}
    />
  );

  await delay(500);

  expect(screen.queryByText("Заготовка под ТЗ")).not.toBeInTheDocument();
});
