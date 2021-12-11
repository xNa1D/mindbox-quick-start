import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import { ProvideAuth } from "src/client/processes/auth/useAuth";
// eslint-disable-next-line jest/no-mocks-import
import MockConsumer from "../../../__mocks__/MockConsumer";

import { loginUser, checkToken } from "src/client/shared/api/userRequests";

jest.mock("axios");
jest.mock("client/shared/api/userRequests");

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
  test("should call Login on click", async () => {
    customRender(<MockConsumer />, {});

    const submitBtn = screen.getByText("Login");
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(loginUser).toHaveBeenCalled();
  });

  test("should call checkToken on click", async () => {
    customRender(<MockConsumer />, {});

    const submitBtn = screen.getByText("Check");
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(checkToken).toHaveBeenCalled();
  });

  test("should render login errors on rejection", async () => {
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
  });

  test("should set login state to false on rejection", async () => {
    (loginUser as jest.Mock).mockRejectedValue({
      response: { status: 401, data: "Login Error" },
    });

    customRender(<MockConsumer />, {});

    const submitBtn = screen.getByText("Login");
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText(/^Auth:/).textContent).toBe("Auth: false");
  });

  test("should change login status on resolving", async () => {
    (loginUser as jest.Mock).mockResolvedValue({
      response: { status: 200, data: "Login Success" },
    });

    customRender(<MockConsumer />, {});

    const submitBtn = screen.getByText("Login");
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText(/^Auth:/).textContent).toBe("Auth: true");
  });
});
