import supertest from "supertest";
import axios from "axios";
import startScenario from "../server/scenario/Scenarios";
import sendMessage from "../server/scenario/Message";

import generateAccessToken from "../server/user/generateAccessToken";

import { server } from "../server/index";

import { StartScenarioBody, Scenario } from "src/declarations";

jest.mock("jest");
jest.mock("../server/scenario/Scenarios");
jest.mock("../server/scenario/Message");

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
  (startScenario as jest.Mock).mockResolvedValue({
    resultStatus: { status: "SUCCESS" },
    resultSteps: [
      {
        sequence: 0,
        condition: null,
        private: false,
        optional: false,
        passing: true,
        _id: "5fc4d2c996c72c136cd978f6",
        target: "#UserName",
        command: "click",
        value: "",
        variableName: "",
        extra: {
          source: {
            test: "5fb2689e89be016e9702904b",
            sequence: 0,
          },
          rootSequence: 0,
        },
        notes: "Imported from: Петр - Моб. приложение - Вход на проект\n",
        url: "https://megastroy.mindbox.ru/",
        dateExecuted: "2020-11-30T10:58:44.603Z",
      },
    ],
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
