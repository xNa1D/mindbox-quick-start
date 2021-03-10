import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import '@testing-library/jest-dom';
import axios from "axios";

import Login from "client/script/pages/Login";
import { MemoryRouter } from "react-router-dom";

import {loginUser} from 'client/script/api/userRequests';
// import { User, AuthUserResponse } from "src/declarations";


jest.mock("axios");
jest.mock("client/script/api/userRequests");

loginUser
describe("Test render of form", () => {
  // const mockedAuthUser = (user: User) => {};
  test("should login input be in the doc", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginInput = screen.getByLabelText("Логин");
    expect(loginInput).toBeInTheDocument();
  });

  test("should password input be in the doc", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const passwordInput = screen.getByLabelText("Пароль");
    expect(passwordInput).toBeInTheDocument();
  });
});

describe("Form submit", () => {
  it("should call passed function", async () => {

    render(
      <MemoryRouter>
      <Login />
    </MemoryRouter>
    );

    const submitBtn = screen.getByText("Отправить");
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(authUser).toBeCalled();
  });

  // it("should render rejected value", async () => {
  //   const authUser = jest.fn().mockRejectedValue("Network Error");

  //   render(
  //     <Login
  //       authUser={(user: User) => {
  //         authUser();
  //       }}
  //     />
  //   );

  //   const submitBtn = screen.getByText("Отправить");
  //   await act(async () => {
  //     fireEvent.click(submitBtn);
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText("Ошибка авторизации")).toBeInTheDocument();
  //   });
  // });
});
