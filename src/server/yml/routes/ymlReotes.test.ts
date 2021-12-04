import supertest from "supertest";
import { app } from "src/server/app";
import { generateAccessToken } from "server/auth/";

import sendYmlToMindbox from "src/server/yml/sendYmlToMindbox";
import { YmlRequestType } from "./ymlRoutes";


jest.mock("src/server/yml/sendYmlToMindbox");
jest.mock("server/db/init.ts");

let agent: any;

beforeAll(() => {
  agent = supertest(app);
});

afterEach(() => {
  jest.clearAllMocks();
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

const hugeYml = Array(501).map((_, index) => ({
  areaExternalId: `myareaExternalId-${index}`,
  name: "awesomeFeed",
  url: "url",
}));

const mockHugeYml = {
  ...mockYmlData,
  links: hugeYml,
};
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

  it("when pass 501+ yml, should return validation error", async () => {
    const res = await agent
      .post("/api/yml/start")
      .set("Cookie", [`token=${mockUserAuthToken}`])
      .send(mockHugeYml);

    expect(res.status).toBe(403);
    expect(res.text).toBe("Maximum 500 Yml");
  });

  it("When auth is failed, should return 403", async () => {
    const res = await agent
      .post("/api/yml/start")
      .set("Cookie", [`token=12345`])
      .send(mockYmlData);

    expect(res.status).toBe(403);
  });
});
