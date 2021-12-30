import supertest from "supertest";
import axios from "axios";

import { generateAccessToken } from "server/auth";
import { app } from "server/app";

let agent: any;

beforeAll(() => {
  agent = supertest(app);
});

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("../db/init.ts");

const mockUser = {
  login: "testUser",
  password: "testPassword",
  projectName: "testProject",
};

const mockAdminToken = ".ASPXAUTH=MyAwesomeAuthCookie";

const mockAdminAuthSuccessResponse = {
  status: 200,
  headers: {
    "cache-control": "private",
    "content-type": "application/json; charset=utf-8",
    "set-cookie": [`${mockAdminToken}; path=/; HttpOnly; SameSite=Lax; Secure`],
  },
  data: {
    userName: mockUser.login,
    password: mockUser.password,
    mobilePhone: null,
    confirmationCode: null,
    pageState: "confirmed",
    previousPageState: "login",
    validationSummary: {},
  },
};
const mockAdminAuthErrorResponse = {
  status: 200,
  headers: {
    "cache-control": "private",
    "content-type": "application/json; charset=utf-8",
  },
  data: {
    userName: mockUser.login,
    password: mockUser.password,
    mobilePhone: null,
    confirmationCode: null,
    pageState: "login",
    previousPageState: "login",
    validationSummary: {
      globalMessages: "Вход заблокирован до 15.05.2021 19:21:43",
    },
  },
};

const API_URL = "/api/user/authByAdminPanel";

describe("/authByAdminPanel", () => {
  it("when Mindbox auth OK, should return JWT token", async () => {
    axios.post = jest.fn().mockResolvedValue(mockAdminAuthSuccessResponse);

    const res = await agent.post(API_URL).send({
      email: mockUser.login,
      password: mockUser.password,
      project: mockUser.projectName,
    });

    const token = generateAccessToken({
      email: mockUser.login,
      project: mockUser.projectName,
      tokenFromAdminPanel: mockAdminToken,
    });

    expect(res.text).toBe(token);
  });

  it("when Mindbox auth error, should return error text", async () => {
    axios.post = jest.fn().mockResolvedValue(mockAdminAuthErrorResponse);

    const res = await agent.post(API_URL).send({
      email: mockUser.login,
      password: mockUser.password,
      project: mockUser.projectName,
    });

    expect(res.status).toBe(503);
    expect(res.text).toBe(
      `Error: ${mockAdminAuthErrorResponse.data.validationSummary.globalMessages}`
    );
  });
});
