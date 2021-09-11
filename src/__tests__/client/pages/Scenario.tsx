import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

import Main from "src/client/Main";

import startScenario from "src/client/api/scenarioRequests";

jest.mock("axios");
jest.mock("client/api/scenarioRequests");

describe("Scenario rendering", () => {
  test("should render 2 inputs and selector", async () => {
    await act(async () => {
      render(<Main />);
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
    render(<Main />);

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
    render(<Main />);

    const submitBtn = screen.getByText("Запустить");

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    const successMessage = screen.getByText("Автозаведение запущено");

    expect(successMessage).toBeInTheDocument();
  });

  test("should render error message on not AUTH error", async () => {
    const rejectedApiCall = startScenario as jest.Mock;
    rejectedApiCall.mockRejectedValue({
      response: { status: 503, data: "Server error" },
    });
    render(<Main />);

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

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Запустить"));
    });

    expect(history.location.pathname).toBe("/");
  });
});
