import supertest from "supertest";
import { app } from "src/server/app";
import generateAccessToken from "src/server/user/generateAccessToken";

import sendYmlToMindbox from "src/server/yml/sendYmlToMindbox";
import { YmlRequestType } from "src/declarations";

jest.mock("src/server/yml/sendYmlToMindbox");
jest.mock("sequelize", () => {
  const mSequelize = {
    authenticate: jest.fn(),
    define: jest.fn(),
  };
  const actualSequelize = jest.requireActual("sequelize");
  return {
    Sequelize: jest.fn(() => mSequelize),
    DataTypes: actualSequelize.DataTypes,
  };
});

let agent: any;
let server: any;


beforeAll(() => {
  server = app.listen(9990);
  agent = supertest(server);
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  server.close();
});

const mockUserAuthToken = generateAccessToken({
  email: "nikitin@mindbox.ru",
  project: "myPoject",
  tokenFromAdminPanel: "myToken",
});

const mockYmlData: YmlRequestType = {
  links: [
    {
      areaExternalId: "myareaExternalId",
      name: "awesomeFeed",
      url: "url",
    },
  ],
  settings: {
    brand: "awesomeBrand",
    externalSystem: "awesomeExtSys",
    launchPeriod: 2,
  },
};

describe("send invalid auth token", () => {
  it("should return 403 and status", async () => {
    const res = await agent
      .post("/api/yml/start")
      .set("Cookie", [`token=12345`])
      .send(mockYmlData);

    expect(res.status).toBe(403);
  });
});

describe("send valid yml data with valid user token", () => {
  it("should call 'sendYmlToMindbox' with correct params", async () => {
    const res = await agent
      .post("/api/yml/start")
      .set("Cookie", [`token=${mockUserAuthToken}`])
      .send(mockYmlData);

    expect(sendYmlToMindbox).toHaveBeenCalledWith(
      [
        {
          area: { externalId: "myareaExternalId" },
          brandSystemName: "awesomeBrand",
          externalSystemSystemName: "awesomeExtSys",
          launchPeriod: "2",
          name: "awesomeFeed",
          password: null,
          url: "url",
          username: null,
        },
      ],
      "myPoject",
      "myToken"
    );
  });
  it("should return 200 and status", async () => {
    const res = await agent
      .post("/api/yml/start")
      .set("Cookie", [`token=${mockUserAuthToken}`])
      .send(mockYmlData);

    expect(res.status).toBe(200);
    expect(res.text).toBe("Настройки фидов отправлены");
  });
});
