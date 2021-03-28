import supertest from "supertest";
import axios from "../__mocks__/axios";
import startScenario from "../server/models/Scenarios";
import sendMessage from "../server/models/Message";

import generateAccessToken from "../server/helpers/generateAccessToken";

import { server } from "../server/index";

import { StartScenarioBody, Scenario } from "src/declarations";

// import scenarios from "src/data";

let agent: any;

const mockScenario: Scenario = {
  type: "mockType",
  name: "Мок запуска сценария",
  api: "mockAddress",
  docs: "mockDocs",
};

const mockApiBody: StartScenarioBody = {
  scenario: mockScenario,
  projectName: "testProject",
  campaign: 1,
};

jest.mock("../server/models/Scenarios");
jest.mock("../server/models/Message");

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
        .send(mockApiBody);

      expect(res.status).toBe(200);
    });

    it("should return 403 if token incorrect", async () => {
      const res = await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=123`])
        .send(mockApiBody);

      expect(res.status).toBe(403);
    });
  });

  describe("scenartio variant calls", () => {
    it("should call startScenario with passed data", async () => {
      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=${token}`])
        .send(mockApiBody);

      expect(startScenario).toHaveBeenCalled();
    });
  });

  describe("notification sending", () => {
    it("should send OK message when all is ok", async () => {
      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=${token}`])
        .send(mockApiBody);

      expect(sendMessage.ok).toHaveBeenCalled();
    });

    it("should NOT send OK message when all is not ok bun token expired", async () => {
      (startScenario as jest.Mock).mockRejectedValue({
        status: 503,
      });

      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=123`])
        .send(mockApiBody);

      expect(sendMessage.ok).not.toHaveBeenCalled();
    });

    it("should NOT send FAIL message when all is not ok bun token expired", async () => {
      (startScenario as jest.Mock).mockRejectedValue({
        status: 503,
      });
      try {
        const res = await agent
          .post("/api/scenario/start")
          .set("Cookie", [`token=123`])
          .send(mockApiBody);
      } catch (error) {
        console.log(error);
      }

      expect(sendMessage.fail).not.toHaveBeenCalled();
    });

    it("should send FAIL message when all is not ok", async () => {
      (startScenario as jest.Mock).mockRejectedValue({
        status: 503,
      });

      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=${token}`])
        .send(mockApiBody);

      expect(sendMessage.fail).toHaveBeenCalled();
    });
  });
});
