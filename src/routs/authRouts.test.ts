import supertest from "supertest";
import axios from "../../__mocks__/axios";

import { server } from "../index";

describe("authRouts", () => {
  let agent: any;

  beforeAll(() => {
    agent = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  it("should return access tocken", async () => {
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

    const res = await agent.post("/api/user/auth").send({
      email: "nikitin@mindbox.ru",
      password: "123",
    });

    expect(res.text).toBe(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pa2l0aW5AbWluZGJveC5ydSIsImlhdCI6MTYwNTY0Mjk3NywiZXhwIjoxNjA1NzI5Mzc3fQ.F_bmraq3PRsVIZMhGgnGjuemP8_JDLP5QaJS9MXnik4"
    );
  });

  it("should return 403 when login fail", async () => {
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
  });
});
