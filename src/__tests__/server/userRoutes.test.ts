import supertest from "supertest";
import axios from "../../__mocks__/axios";
import dotnev from 'dotenv'

import generateAccessToken from "../../server/user/generateAccessToken";
import checkTocken from "../../server/user/checkTocken";

import { server } from "../../server/index";

let agent: any;

const mockUser = {
  login: "testUser",
  password: "testPassword",
  projectName: "testProject"
};

const mockAdminToken = ".ASPXAUTH=MyAwesomeAuthCookie"

const mockAdminAuthSuccessResponse = {
  status: 200,
  headers: {
    "cache-control": "private",
    "content-type": "application/json; charset=utf-8",
    "set-cookie": [
      `${mockAdminToken}; path=/; HttpOnly; SameSite=Lax; Secure`
    ],
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

beforeAll(() => {
  agent = supertest(server);
});

afterAll(() => {
  server.close();
});


describe("/reg", () => {
  it("should return 200^ if stuff exist", async () => {
    axios.post = jest
      .fn()
      .mockResolvedValueOnce({
        status: 200,
        data: {
          status: "Success",
          customer: {
            processingStatus: "Found",
          },
        },
      })
      .mockResolvedValueOnce({
        status: 200,
        data: {
          status: "Success",
        },
      });

    const res = await agent.post("/api/user/reg").send({
      email: "nikitin@mindbox.ru",
      password: "123",
    });

    expect(res.status).toBe(200);
  });

  it("should return 403^ if stuff exist", async () => {
    axios.post = jest
      .fn()
      .mockResolvedValueOnce({
        status: 200,
        data: {
          status: "Success",
          customer: {
            processingStatus: "NotFound",
          },
        },
      })
      .mockResolvedValueOnce({
        status: 200,
        data: {
          status: "Success",
        },
      });

    const res = await agent.post("/api/user/reg").send({
      email: "nikitin@mindbox.ru",
      password: "123",
    });

    expect(res.status).toBe(403);
  });

  it("should return 503 if api return error", async () => {
    axios.post = jest.fn().mockRejectedValue({
      status: 500,
      data: "Rejected",
    });
    let res;

    try {
      res = await agent.post("/api/user/reg").send({
        email: "nikitin@mindbox.ru",
        password: "123",
      });
    } catch (error) {
      expect(res.status).toBe(503);
    }
  });
  it("should return 503 if mindbox return not success", async () => {
    axios.post = jest.fn().mockRejectedValue({
      status: 200,
      data: {
        status: "InternalServerError",
      },
    });
    let res;

    try {
      res = await agent.post("/api/user/reg").send({
        email: "nikitin@mindbox.ru",
        password: "123",
      });
    } catch (error) {
      expect(res.status).toBe(503);
    }
  });
});

describe("/authByAdminPanel", () => {
  it('should return valid JWT if auth OK', async () => {
    axios.post = jest.fn().mockResolvedValue(mockAdminAuthSuccessResponse);

    
    const res = await agent.post("/api/user/authByAdminPanel").send({
      email: mockUser.login,
      password: mockUser.password,
      project: mockUser.projectName
    });
    
    const token = generateAccessToken({
      email: mockUser.login,
      project: mockUser.projectName,
      tokenFromAdminPanel: mockAdminToken,
    });

    expect(res.text).toBe(token);
  });
  it('should return error text if auth Failed', async () => {
    axios.post = jest.fn().mockResolvedValue(mockAdminAuthErrorResponse);

    
    const res = await agent.post("/api/user/authByAdminPanel").send({
      email: mockUser.login,
      password: mockUser.password,
      project: mockUser.projectName
    });
    

    expect(res.status).toBe(503);
    expect(res.text).toBe(
      `Error: ${mockAdminAuthErrorResponse.data.validationSummary.globalMessages}`
    );
  });
});
