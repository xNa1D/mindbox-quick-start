import supertest from "supertest";
import startScenario from "src/server/scenario/startScenario";
import sendMessage from "src/server/scenario/sendMessage";

import generateAccessToken from "src/server/user/generateAccessToken";
import mockScenarioResultSuccess from "../../__mocks__/mockScenarioResultSuccess.json";
import mockScenarioResultError from "../../__mocks__/mockScenarioResultError.json";

import { getAllScenarios } from "./scenarioController";

import { app } from "src/server/app";

import { StartScenarioBody, Scenario } from "src/declarations";

jest.mock("../db/init.ts");
jest.mock("src/server/scenario/startScenario");
jest.mock("src/server/scenario/sendMessage");

let agent: any;

beforeAll(() => {
  agent = supertest(app);
});

afterEach(() => {
  jest.clearAllMocks();
});

const mockScenario: Scenario = {
  type: "mockType",
  name: "Мок запуска сценария",
  api: ["mockAddress"],
  docs: "mockDocs",
  ghType: "old",
};

const mockSteps = [
  { name: "Вход на проект", status: null },
  { name: "ШД для импорта клиентов", status: true },
  { name: "ШД для создания клиентов администратором", status: false },
];

const mockSuccessResponse = {
  error: {
    errorMessage: "",
    videoLink: "",
  },
  status: "SUCCESS",
  steps: mockSteps,
};

const mockErrorResponse = {
  error: {
    errorMessage: "Test run reached 10 minute time limit and was stopped",
    videoLink:
      "https://ghostinspector-prod.s3.amazonaws.com/videos/a6306a8a-059a-4fda-a1ae-74c973d362b4.mp4",
  },
  status: "ERROR",
  steps: mockSteps,
};

const mockApiBody: StartScenarioBody = {
  scenario: mockScenario,
  projectName: "testProject",
  campaign: 1,
  emailForNotification: "test@me.please",
};

jest.mock("./scenarioController.ts");

// const mockErrorMessageInstance = (ErrorMessage as jest.Mock).mock.instances[0];
// const sendErrorMessage = mockErrorMessageInstance.sendMessage;

jest.setTimeout(30000);

const token = generateAccessToken({
  email: "nikitin@mindbox.ru",
  project: "myPoject",
  tokenFromAdminPanel: "myToken",
});

const tokenFromAdminPanel = generateAccessToken({
  email: "nikitin@mindbox.ru",
  project: "test",
  tokenFromAdminPanel: "testToken",
});

describe("/scenario", () => {
  describe("POST to /api/scenario/start ", () => {
    describe("Checking status of response", () => {
      (startScenario as jest.Mock).mockResolvedValue(mockSuccessResponse);
      it("When passing correct JWT, should return 200", async () => {
        const res = await agent
          .post("/api/scenario/start")
          .set("Cookie", [`token=${token}`])
          .send(mockApiBody);

        expect(res.status).toBe(200);
      });

      it("When passing incorrect JWT, should return 403", async () => {
        const res = await agent
          .post("/api/scenario/start")
          .set("Cookie", [`token=123`])
          .send(mockApiBody);

        expect(res.status).toBe(403);
      });
    });

    describe("startScenario", () => {
      (startScenario as jest.Mock).mockResolvedValue(mockSuccessResponse);
      it("When JWT and data is OK, should call startScenario with passed data", async () => {
        await agent
          .post("/api/scenario/start")
          .set("Cookie", [`token=${token}`])
          .send(mockApiBody);

        expect(startScenario).toHaveBeenCalled();
      });
    });

    describe("sendMessage", () => {
      (startScenario as jest.Mock).mockResolvedValue(mockSuccessResponse);
      it("When scenario started, should send message", async () => {
        await agent
          .post("/api/scenario/start")
          .set("Cookie", [`token=${token}`])
          .send(mockApiBody);

        expect(sendMessage).toHaveBeenCalled();
      });

      it("When JWT is incorrect, should NOT send OK", async () => {
        (startScenario as jest.Mock).mockRejectedValueOnce({
          status: 503,
        });

        await agent
          .post("/api/scenario/start")
          .set("Cookie", [`token=123`])
          .send(mockApiBody);

        expect(sendMessage).not.toHaveBeenCalled();
      });

      it("When JWT is incorrect should NOT send FAIL message", async () => {
        (startScenario as jest.Mock).mockRejectedValueOnce({
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

        expect(sendMessage).not.toHaveBeenCalled();
      });
    });
  });

  describe("GET to /api/scenario/ ", () => {
    (getAllScenarios as jest.Mock).mockResolvedValue([mockScenario]);
    it("Should return array of scenarios", async () => {
      const res = await agent.get("/api/scenario/");

      expect(JSON.parse(res.text)).toStrictEqual([mockScenario]);
    });
  });
  describe("POST to /api/scenario/start ", () => {});
});