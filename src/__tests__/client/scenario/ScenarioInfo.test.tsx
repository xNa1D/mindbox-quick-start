import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import ScenarioInfo from "src/client/scenario/ScenarioInfo";
import getScenarioDescription from "src/client/scenario/getScenarioDescription";

jest.mock("axios");
jest.mock("client/scenario/getScenarioDescription");

const customRender = async (
  ui: any,
  { providerProps, ...renderOptions }: any = {}
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

const mockScenario = {
  documentationLink: "myAwesomeLink",
  scenarioType: "myAwesomeScenario",
};

test("should render info from gist", async () => {
  (getScenarioDescription as jest.Mock).mockRejectedValue("Описание сценария");

  customRender(
    <ScenarioInfo
      documentationLink={mockScenario.documentationLink}
      scenarioType={mockScenario.scenarioType}
    />
  );

  await delay(500);

  expect(screen.getByText("Описание сценария")).toBeInTheDocument();
  expect(screen.getByText("Заготовка под ТЗ")).toBeInTheDocument();
});

test("should not render button if link is empty", async () => {
  customRender(
    <ScenarioInfo
      documentationLink=""
      scenarioType={mockScenario.scenarioType}
    />
  );

  await delay(500);

  expect(screen.queryByText("Заготовка под ТЗ")).not.toBeInTheDocument();
});
