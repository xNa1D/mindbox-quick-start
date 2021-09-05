import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
  prettyDOM,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

import useAuth, { ProvideAuth } from "client/auth/useAuth";
import MockConsumer from "../../../__mocks__/MockConsumer";

import { loginUser, checkToken } from "src/client/api/userRequests";

jest.mock("axios");
jest.mock("client/script/api/userRequests");

beforeEach(() => {
  (loginUser as jest.Mock).mockResolvedValue({
    response: { status: 200, data: "ok" },
  });
  (checkToken as jest.Mock).mockResolvedValue({
    response: { status: 200, data: "ok" },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("universal-cookie", () => {
  const mCookie = {
    set: jest.fn(),
    get: jest.fn(),
  };
  return jest.fn(() => mCookie);
});

const customRender = (ui: any, { providerProps, ...renderOptions }: any) => {
  return render(
    <MemoryRouter>
      <ProvideAuth {...providerProps}>{ui}</ProvideAuth>
    </MemoryRouter>,
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
    (loginUser as jest.Mock).mockRejectedValue({
      response: { status: 401, data: "Login Error" },
    });

    customRender(<MockConsumer />, {});
    await act(async () => {
      fireEvent.click(screen.getByText("Login"));
    });
    expect(screen.getByText(/^Errors:/).textContent).toBe(
      "Errors: Login Error"
    );
    done();
  });

  test(" should set login state to false on rejection", async (done) => {
    (loginUser as jest.Mock).mockRejectedValue({
      response: { status: 401, data: "Login Error" },
    });

    customRender(<MockConsumer />, {});

    const submitBtn = screen.getByText("Login");
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText(/^Auth:/).textContent).toBe("Auth: false");
    done();
  });

  test(" should change login status on resolving", async (done) => {
    (loginUser as jest.Mock).mockResolvedValue({
      response: { status: 200, data: "Login Success" },
    });

    customRender(<MockConsumer />, {});

    const submitBtn = screen.getByText("Login");
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText(/^Auth:/).textContent).toBe("Auth: true");
    done();
  });
});
