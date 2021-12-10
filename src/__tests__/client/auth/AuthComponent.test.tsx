import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import { ProvideAuth } from "client/auth/useAuth";
import AuthComponent from "client/auth/AuthComponent";

import { checkToken } from "src/client/shared/api/userRequests";

jest.mock("axios");
jest.mock("client/api/userRequests");

beforeEach(() => {
  jest.clearAllMocks();
});

const customRender = async (
  ui: any,
  { providerProps, ...renderOptions }: any = {}
) => {
  return await act(async () => {
    render(
      <MemoryRouter>
        <ProvideAuth {...providerProps}>{ui}</ProvideAuth>
      </MemoryRouter>,
      renderOptions
    );
  });
};

beforeEach(() => {
  jest.clearAllMocks();
});

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

describe("check rendering", () => {
  test("should render status bar", () => {
    customRender(<AuthComponent />);

    const statusBar = screen.getByText("Статус подключения к Mindbox:");
    expect(statusBar).toBeInTheDocument();
  });
  test("should render that you have to login", () => {
    customRender(<AuthComponent />);

    const statusBar = screen.getByText("Нужно авторизоваться");
    expect(statusBar).toBeInTheDocument();
  });

  test("should render that you are logged in", async () => {
    (checkToken as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: "myProject",
    });
    customRender(<AuthComponent />);

    await delay(500);

    const statusBar = screen.getByText("Авторизован в myProject.mindbox.ru");
    const changeProjectBtn = screen.getByText("Сменить проект");

    expect(statusBar).toBeInTheDocument();
    expect(changeProjectBtn).toBeInTheDocument();
  });
});

describe("toggling auth panel", () => {
  test("should hide auth panel on click if not logged in", async () => {
    customRender(<AuthComponent />);
    await delay(500);
    const statusBar = screen.getByText("Нужно авторизоваться");
    await act(async () => {
      fireEvent.click(statusBar);
    });
    await delay(600);
    const projectField = screen.queryByText("Системное имя проекта");
    expect(projectField).not.toBeInTheDocument();
  });

  test("should show auth panel on click if logged in", async () => {
    (checkToken as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: "myProject",
    });

    await delay(500);
    customRender(<AuthComponent />);
    await delay(500);
    const statusBar = screen.getByText("Авторизован в myProject.mindbox.ru");
    await act(async () => {
      fireEvent.click(statusBar);
    });
    await delay(600);
    const projectField = screen.queryByText("Системное имя проекта");
    expect(projectField).toBeInTheDocument();
  });
});

describe("clearing auth info", () => {
  test("should render not logged in status on click button for changing project", async () => {
    (checkToken as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: "myProject",
    });

    customRender(<AuthComponent />);
    await delay(500);
    const changeProjectBtn = screen.getByText("Сменить проект");
    await act(async () => {
      fireEvent.click(changeProjectBtn);
    });
    await delay(600);
    const projectField = screen.getByText("Системное имя проекта");
    expect(projectField).toBeInTheDocument();
  });
});
