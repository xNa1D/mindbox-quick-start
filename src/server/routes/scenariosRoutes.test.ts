import supertest from "supertest";
import axios from "../../__mocks__/axios";
import scenarios from "../models/Scenarios";
import sendMessage from "../models/Message";

import generateAccessToken from "../helpers/generateAccessToken";

import { server } from "../index";

import { ScenarioRequestBody, Scenarios } from "../index.d";

let agent: any;

jest.mock("../models/Scenarios");
jest.mock("../models/Message");

afterEach(() => {
  jest.clearAllMocks();
});

beforeAll(() => {
  agent = supertest(server);
});

afterAll(() => {
  server.close();
});

describe("/scenario", () => {
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

  describe("access ticket", () => {
    it("should return 200 if token correct", async () => {
      const res = await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=${token}`])
        .send({
          taskName: "ecommerce",
        });

      expect(res.status).toBe(200);
    });

    it("should return 403 if token incorrect", async () => {
      const res = await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=123`])
        .send({
          taskName: "ecommerce",
        });

      expect(res.status).toBe(403);
    });
  });

  describe("scenartio variant calls", () => {
    it("should call createBasicEcommersOperations ", async () => {
      const body: ScenarioRequestBody = {
        taskName: "ecommerce",
        projectName: "test",
        campaingNumber: 1,
      };

      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=${token}`])
        .send(body);

      expect(scenarios.ecommerce).toHaveBeenCalled();
    });

    it("should call  loaylty-online  ", async () => {
      const body: ScenarioRequestBody = {
        taskName: "loyaltyOnline",
        projectName: "test",
        campaingNumber: 1,
      };

      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=${token}`])
        .send(body);

      expect(scenarios.loyaltyOnline).toHaveBeenCalled();
    });

    it("should call  loaylty-offline  ", async () => {
      const body: ScenarioRequestBody = {
        taskName: "loyaltyOfline",
        projectName: "test",
        campaingNumber: 1,
      };

      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=${token}`])
        .send(body);

      expect(scenarios.loyaltyOfline).toHaveBeenCalled();
    });

    it("should call  mobile psuh  ", async () => {
      const body: ScenarioRequestBody = {
        taskName: "mobilePush",
        projectName: "test",
        campaingNumber: 1,
      };

      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=${token}`])
        .send(body);

      expect(scenarios.mobilePush).toHaveBeenCalled();
    });
  });

  describe("notification sending", () => {
    it("should send OK message when all is ok", async () => {
      const body: ScenarioRequestBody = {
        taskName: "ecommerce",
        projectName: "test",
        campaingNumber: 1,
      };

      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=${token}`])
        .send(body);
      expect(sendMessage.ok).toHaveBeenCalled();
    });

    it("should NOT send OK message when all is not ok bun token expired", async () => {
      scenarios.ecommerce = jest.fn().mockRejectedValue({
        status: 503,
      });

      const body: ScenarioRequestBody = {
        taskName: "ecommerce",
        projectName: "test",
        campaingNumber: 1,
      };

      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=123`])
        .send(body);

      expect(sendMessage.ok).not.toHaveBeenCalled();
    });

    it("should NOT send FAIL message when all is not ok bun token expired", async () => {
      scenarios.ecommerce = jest.fn().mockRejectedValue({
        status: 503,
      });

      const body: ScenarioRequestBody = {
        taskName: "ecommerce",
        projectName: "test",
        campaingNumber: 1,
      };

      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=123`])
        .send(body);

      expect(sendMessage.fail).not.toHaveBeenCalled();
    });

    it("should send FAIL message when all is not ok", async () => {
      scenarios.ecommerce = jest.fn().mockRejectedValue({
        status: 503,
      });

      const body: ScenarioRequestBody = {
        taskName: "ecommerce",
        projectName: "test",
        campaingNumber: 1,
      };

      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=${token}`])
        .send(body);

      expect(sendMessage.fail).toHaveBeenCalled();
    });
  });
});
