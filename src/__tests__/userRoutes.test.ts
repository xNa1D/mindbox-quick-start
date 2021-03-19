import supertest from "supertest";
import axios from "../__mocks__/axios";

import generateAccessToken from "../server/helpers/generateAccessToken";

import { server } from "../server/index";

let agent: any;

beforeAll(() => {
  agent = supertest(server);
});

afterAll(() => {
  server.close();
});
describe("/auth", () => {
  it("should return access tocken", async (done) => {
    jest.setTimeout(30000);
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        status: "Success",
        customer: {
          processingStatus: "AuthenticationSucceeded",
        },
      },
    });

    const token = generateAccessToken("nikitin@mindbox.ru");

    const res = await agent.post("/api/user/auth").send({
      email: "nikitin@mindbox.ru",
      password: "123",
    });

    expect(res.text).toBe(token);
    done();
  });

  it("should return 403 when login fail", async (done) => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        status: "Success",
        customer: {
          processingStatus: "AuthenticationFailed",
        },
      },
    });

    const res = await agent.post("/api/user/auth").send({
      email: "nikitin@mindbox.ru",
      password: "123",
    });

    expect(res.status).toBe(403);
    done();
  });
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
