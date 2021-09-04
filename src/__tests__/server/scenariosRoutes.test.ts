import supertest from "supertest";
import startScenario from "src/server/scenario/startScenario";
import sendMessage from "src/server/scenario/sendMessage";

import generateAccessToken from "src/server/user/generateAccessToken";
import mockScenarioResultSuccess from "../../__mocks__/mockScenarioResultSuccess.json";
import mockScenarioResultError from "../../__mocks__/mockScenarioResultError.json";

import { server } from "src/server/index";

import { StartScenarioBody, Scenario } from "src/declarations";

jest.mock("jest");
jest.mock("src/server/scenario/startScenario");
jest.mock("src/server/scenario/sendMessage");

// import scenarios from "src/data";

let agent: any;

const mockScenario: Scenario = {
  type: "mockType",
  name: "Мок запуска сценария",
  api: ["mockAddress"],
  docs: "mockDocs",
  ghType: "old"
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
  emailForNotification: "test@me.please"
};

// const mockErrorMessageInstance = (ErrorMessage as jest.Mock).mock.instances[0];
// const sendErrorMessage = mockErrorMessageInstance.sendMessage;

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  // (SuccessMessage as jest.Mock).mockClear();
  // (ErrorMessage as jest.Mock).mockClear();
});

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
  (startScenario as jest.Mock).mockResolvedValue(mockSuccessResponse);

  const token = generateAccessToken({ email: "nikitin@mindbox.ru" });
  const tokenFromAdminPanel = generateAccessToken({
    email: "nikitin@mindbox.ru",
    project: "test",
    tokenFromAdminPanel: "testToken",
  });

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

      expect(sendMessage).toHaveBeenCalled();
    });

    it("should NOT send OK message when all is not ok bun token expired", async () => {
      (startScenario as jest.Mock).mockRejectedValue({
        status: 503,
      });

      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=123`])
        .send(mockApiBody);

      expect(sendMessage).not.toHaveBeenCalled();
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

      expect(sendMessage).not.toHaveBeenCalled();
    });

    it("should send FAIL message when all is not ok", async () => {
      (startScenario as jest.Mock).mockResolvedValue(mockErrorResponse);

      await agent
        .post("/api/scenario/start")
        .set("Cookie", [`token=${token}`])
        .send(mockApiBody);

      expect(sendMessage).toHaveBeenCalled();
    });
  });
});

