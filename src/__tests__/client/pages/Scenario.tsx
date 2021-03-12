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

import useAuth, { ProvideAuth } from "client/script/hooks/useAuth";
import Scenario from "client/script/pages/Scenario";

import startScenario from "client/script/api/scenarioRequests";

// import { User, AuthUserResponse } from "src/declarations";

jest.mock("axios");
jest.mock("client/script/api/scenarioRequests");

describe("Scenario rendering", () => {
  test("should render 2 inputs and selector", () => {
    render(<Scenario />);

    const projectNameField = screen.getByLabelText("Системное имя проекта");
    const campaingNumberField = screen.getByLabelText("Номер кампании");
    const taskNameField = screen.getByLabelText("Какие операции заводить");

    expect(projectNameField).toBeInTheDocument();
    expect(campaingNumberField).toBeInTheDocument();
    expect(taskNameField).toBeInTheDocument();
  });
});

describe("Scenario calls", () => {
  test("should call API with chosen options", async () => {
    render(<Scenario />);

    const projectNameField = screen.getByLabelText("Системное имя проекта");
    const campaingNumberField = screen.getByLabelText("Номер кампании");
    const taskNameField = screen.getByLabelText("Какие операции заводить");

    const submitBtn = screen.getByText("Запустить");

    await act(async () => {
      fireEvent.input(projectNameField, {
        target: { value: "test.mindbox.ru" },
      });
    });
    await act(async () => {
      fireEvent.input(campaingNumberField, { target: { value: "12" } });
    });
    await act(async () => {
      fireEvent.change(taskNameField, { target: { value: "loyaltyOnline" } });
    });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(startScenario).toHaveBeenCalledWith({
      campaingNumber: 12,
      projectName: "test",
      taskName: "loyaltyOnline",
    });
  });

  test("should call API with chosen options", async () => {
    render(<Scenario />);

    const submitBtn = screen.getByText("Запустить");

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    const successMessage = screen.getByText("Автозаведение запущено");

    expect(successMessage).toBeInTheDocument();
  });
});
