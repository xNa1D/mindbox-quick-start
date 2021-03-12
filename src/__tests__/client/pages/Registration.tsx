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
import { MemoryRouter, Redirect } from "react-router-dom";
import { createMemoryHistory } from 'history'

import useAuth, { ProvideAuth } from "client/script/hooks/useAuth";
import Registration from "client/script/pages/Registration";

import { createUser } from "client/script/api/userRequests";
// import { User, AuthUserResponse } from "src/declarations";

jest.mock("axios");
jest.mock("client/script/api/userRequests");

const customRender = (ui: any, { providerProps, ...renderOptions }: any) => {
  return render(
    <ProvideAuth {...providerProps}>{ui}</ProvideAuth>,
    renderOptions
  );
};

describe("Registration render", () => {
  test("should render input for email", () => {
    render(<Registration />);

    const field = screen.getByLabelText("Логин");
    expect(field).toBeInTheDocument();
  });
});

describe("Registration form", () => {
  test("should call API method on submit", async () => {
    customRender(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>,
      {}
    );

    const field = screen.getByLabelText("Логин");
    const submitBtn = screen.getByText("Регистрация");

    await act(async () => {
      fireEvent.input(field, { target: { value: "nikitin@mindbox.ru" } });
    });
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(createUser).toHaveBeenCalledWith({ email: "nikitin" });
  });

  test('should render success message on OK', async () => {
    customRender(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>,
      {}
    );

    const field = screen.getByLabelText("Логин");
    const submitBtn = screen.getByText("Регистрация");

    await act(async () => {
      fireEvent.input(field, { target: { value: "nikitin@mindbox.ru" } });
    });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    const successMessage = screen.getByText("Зарегистрирован!");

    expect(successMessage).toBeInTheDocument();

  });

  test('should render error message on Error', async () => {
    const mockedCall = createUser as jest.Mock;
    mockedCall.mockRejectedValue({status: 400, data: 'Error'})
    customRender(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>,
      {}
    );

    const field = screen.getByLabelText("Логин");
    const submitBtn = screen.getByText("Регистрация");

    await act(async () => {
      fireEvent.input(field, { target: { value: "nikitin@mindbox.ru" } });
    });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    const errorMessage = screen.getByText("Ошибка регистрации");

    expect(errorMessage).toBeInTheDocument();
  });

  test('should redirect on Ok', async () => {

    const history = createMemoryHistory(); 

    customRender(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>,
      {}
    );

    const field = screen.getByLabelText("Логин");
    const submitBtn = screen.getByText("Регистрация");
 
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    jest.useFakeTimers()
    jest.runAllTimers();


    expect(history.location.pathname).toBe('/');

  });
  
});
