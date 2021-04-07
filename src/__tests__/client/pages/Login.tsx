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
import Login from "client/script/pages/Login";

import { loginUser } from "client/script/api/userRequests";
// import { User, AuthUserResponse } from "src/declarations";

jest.mock("axios");
jest.mock("client/script/api/userRequests");

const customRender = async (ui: any, { providerProps, ...renderOptions }: any) => {
  return await act(async () => {
    render(
      <MemoryRouter>
        <ProvideAuth {...providerProps}>{ui}</ProvideAuth>
      </MemoryRouter>,
      renderOptions
    );
  });
};

describe("Test render of form", () => {
  // const mockedAuthUser = (user: User) => {};
  test("should login input be in the doc", () => {
    customRender(<Login />, {});

    const loginInput = screen.getByLabelText("Логин");
    expect(loginInput).toBeInTheDocument();
  });

  test("should password input be in the doc", () => {
    customRender(<Login />, {});

    const passwordInput = screen.getByLabelText("Пароль");
    expect(passwordInput).toBeInTheDocument();
  });
});

describe("Form submit", () => {
  it("should call passed function", async () => {
    customRender(<Login />, {});

    const login = screen.getByLabelText("Логин");
    const password = screen.getByLabelText("Пароль");
    const submitBtn = screen.getByText("Войти");

    await act(async () => {
      fireEvent.input(login, { target: { value: "nikitin@mindbox.ru" } });
    });
    await act(async () => {
      fireEvent.input(password, { target: { value: "123" } });
    });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(loginUser).toHaveBeenLastCalledWith({
      email: "nikitin@mindbox.ru",
      password: "123",
    });
  });

  it("should render rejected value", async () => {
    (loginUser as jest.Mock).mockRejectedValue({
      response: { status: 401, data: "LoginError" },
    });

    customRender(<Login />, {});

    const submitBtn = screen.getByText("Войти");
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    const error = screen.getByText("Ошибка входа");

    expect(error).toBeInTheDocument();
  });
});
