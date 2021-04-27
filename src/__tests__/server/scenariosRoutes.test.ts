import supertest from "supertest";
import startScenario from "src/server/scenario/startScenario";
import sendMessage from "src/server/scenario/Message";

import generateAccessToken from "src/server/user/generateAccessToken";
import mockScenarioResult from "../../__mocks__/mockScenarioResult.json";

import { server } from "src/server/index";

import { StartScenarioBody, Scenario } from "src/declarations";

jest.mock("jest");
jest.mock("src/server/scenario/startScenario");
jest.mock("src/server/scenario/Message");

// import scenarios from "src/data";

let agent: any;

const mockScenario: Scenario = {
  type: "mockType",
  name: "Мок запуска сценария",
  api: ["mockAddress"],
  docs: "mockDocs",
};

const mockApiBody: StartScenarioBody = {
  scenario: mockScenario,
  projectName: "testProject",
  campaign: 1,
};

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
  (startScenario as jest.Mock).mockResolvedValue(mockScenarioResult);

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
       (startScenario as jest.Mock).mockResolvedValue({
         resultStatus: { status: "ERROR" },
         resultSteps: [],
       });

      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=${token}`])
        .send(mockApiBody);

      expect(sendMessage.fail).toHaveBeenCalled();
    });
  });
});
