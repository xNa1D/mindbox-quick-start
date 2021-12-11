import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

import startScenario from "src/client/shared/api/scenarioRequests";
import ScenarioComponent from "src/client/pages/scenario/ScenarioComponent";

import { getAllScenarios } from "src/client/pages/scenario/getAllScenarios";

jest.mock("client/api/scenarioRequests");
jest.mock("src/client/scenario/getAllScenarios");

(getAllScenarios as jest.Mock).mockResolvedValue([
  {
    type: "ecommerce",
    name: "Интернет магазин: базовые операции",
    docs: "https://docs.google.com/document/d/1VoY1pre3ZqdBBuIxb4-1IIiZr5W-NkTUUrAimxeCfW4/edit",
    api: ["5ec6c26197e4531b3a9d9864", "607994e335da151e07a5afa6"],
    ghType: "old",
  },
  {
    type: "mobilePush",
    name: "Мобильное приложение: базовые операции",
    docs: "https://docs.google.com/document/d/1glcthFoGqwcj1hzAt8PG4Y6YO_Sw6MlUmhiOj2cPa1o/edit",
    api: ["5fb2689f89be016e97029052", "6134b7bc6fbaac15baf8c9b6"],
    ghType: "old",
  },
  {
    type: "loyaltyOnline",
    name: "Программа лояльности: онлайн на сайте",
    docs: "https://docs.google.com/document/d/13XJIqU1CSv5yaTFeAFu7J1L94edaMAQNQAAwHJxqAOc/edit",
    api: ["5ed5315fe1d6aa3e73eeac22", "6134b10278fff919767c256d"],
    ghType: "old",
  },
]);

describe("Scenario rendering", () => {
  test("should render 2 inputs and selector", async () => {
    await act(async () => {
      render(<ScenarioComponent />);
    });

    const campaignNumberField = screen.getByLabelText("Номер кампании");
    const taskNameField = screen.getByLabelText("Какие операции заводить");
    const emailForNotification = screen.getByLabelText("Email для оповещений");

    expect(campaignNumberField).toBeInTheDocument();
    expect(taskNameField).toBeInTheDocument();
    expect(emailForNotification).toBeInTheDocument();
  });
});

describe("Scenario calls", () => {
  test("should call API with chosen options", async () => {
    await act(async () => {
      render(<ScenarioComponent />);
    });

    const campaignNumberField = screen.getByLabelText("Номер кампании");
    const taskNameField = screen.getByLabelText("Какие операции заводить");
    const emailForNotification = screen.getByLabelText("Email для оповещений");

    const submitBtn = screen.getByText("Запустить");

    await act(async () => {
      fireEvent.input(campaignNumberField, { target: { value: "12" } });
    });
    await act(async () => {
      fireEvent.change(taskNameField, { target: { value: "loyaltyOnline" } });
    });
    await act(async () => {
      fireEvent.change(emailForNotification, {
        target: { value: "test@me.more" },
      });
    });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(startScenario).toHaveBeenCalledWith({
      campaign: 12,
      projectName: "",
      scenario: {
        api: ["5ed5315fe1d6aa3e73eeac22", "6134b10278fff919767c256d"],
        docs: "https://docs.google.com/document/d/13XJIqU1CSv5yaTFeAFu7J1L94edaMAQNQAAwHJxqAOc/edit",
        name: "Программа лояльности: онлайн на сайте",
        type: "loyaltyOnline",
        ghType: "old",
      },
      emailForNotification: "test@me.more",
    });
  });

  test("should call API with chosen options", async () => {
    await act(async () => {
      render(<ScenarioComponent />);
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Запустить"));
    });

    expect(screen.getByText("Автозаведение запущено")).toBeInTheDocument();
  });

  test("should render error message on not AUTH error", async () => {
    const rejectedApiCall = startScenario as jest.Mock;
    rejectedApiCall.mockRejectedValue({
      response: { status: 503, data: "Server error" },
    });
    await act(async () => {
      render(<ScenarioComponent />);
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Запустить"));
    });

    expect(screen.getByText("Server error")).toBeInTheDocument();
  });

  test("should redirect to login page on AUTH error", async () => {
    (startScenario as jest.Mock).mockRejectedValue({
      response: { status: 403, data: "Forbidden" },
    });
    const history = createMemoryHistory();

    await act(async () => {
      render(
        <MemoryRouter>
          <ScenarioComponent />
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Запустить"));
    });

    expect(history.location.pathname).toBe("/");
  });
});
