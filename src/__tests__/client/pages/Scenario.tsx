import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

import useAuth, { ProvideAuth } from "client/script/hooks/useAuth";
import Main from "src/client/script/pages/Main";

import startScenario from "client/script/api/scenarioRequests";

jest.mock("axios");
jest.mock("client/script/api/scenarioRequests");

describe("Scenario rendering", () => {
  test("should render inputs and selector", () => {
    render(<Main />);

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
      fireEvent.change(emailForNotification, { target: { value: "test@me.more" } });
    });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(startScenario).toHaveBeenCalledWith({
      campaign: 12,
      projectName: "",
      scenario: {
        api: ["5ed5315fe1d6aa3e73eeac22"],
        docs: "https://docs.google.com/document/d/13XJIqU1CSv5yaTFeAFu7J1L94edaMAQNQAAwHJxqAOc/edit",
        name: "Операции для ПЛ на сайте",
        type: "loyaltyOnline",
      },
      emailForNotification: "test@me.more"
    });
  });

  test("should render successMessage", async () => {
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
