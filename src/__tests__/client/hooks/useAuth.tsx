import React, { ReactComponentElement, ReactElement } from "react";
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
import MockConsumer from "../../../__mocks__/MockConsumer";

import { loginUser, checkToken } from "client/script/api/userRequests";
// import { User, AuthUserResponse } from "src/declarations";

jest.mock("axios");
jest.mock("client/script/api/userRequests");

const customRender = (ui: any, { providerProps, ...renderOptions }: any) => {
  return render(
    <ProvideAuth {...providerProps}>{ui}</ProvideAuth>,
    renderOptions
  );
};

test("MockConsumer shows default value", () => {
  render(<MockConsumer />);
  expect(screen.getByText(/^Auth:/).textContent).toBe("Auth: false");
});

describe("MockConsumer api calls", () => {
  test(" should call Login on click", async (done) => {
    customRender(<MockConsumer />, {});

    const submitBtn = screen.getByText("Login");
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(loginUser).toHaveBeenCalled();
    done();
  });

  test(" should call checkToken on click", async (done) => {
    customRender(<MockConsumer />, {});

    const submitBtn = screen.getByText("Check");
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(checkToken).toHaveBeenCalled();
    done();
  });

  test(" should render login errors on rejection", async (done) => {
    const mockedLogin = loginUser as jest.Mock;
    mockedLogin.mockRejectedValue({ status: 401, data: "Login Error" });

    customRender(<MockConsumer />, {});

    const submitBtn = screen.getByText("Login");
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText(/^Errors:/).textContent).toBe(
      "Errors: Login Error"
    );
    done();
  });

  test(" should set login state to false on rejection", async (done) => {
    const mockedLogin = loginUser as jest.Mock;
    mockedLogin.mockRejectedValue({ status: 401, data: "Login Error" });

    customRender(<MockConsumer />, {});

    const submitBtn = screen.getByText("Login");
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText(/^Auth:/).textContent).toBe("Auth: false");
    done();
  });

  test(" should change login status on resolving", async (done) => {
    const mockedLogin = loginUser as jest.Mock;
    mockedLogin.mockResolvedValue({status: 200, data: "Login Success"});

    customRender(<MockConsumer />, {});

    const submitBtn = screen.getByText("Login");
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText(/^Auth:/).textContent).toBe("Auth: true");
    done();
  });
});
