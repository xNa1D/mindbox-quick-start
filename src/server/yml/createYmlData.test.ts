import { AuthParams, Link, Settings } from "./routes/ymlRoutes";
import { createYmlData } from "./createYmlData";
import { YmlImportSetting } from ".";

const mockLinks: Link = {
  url: "linkToFeed",
  name: "awesomeName",
  areaExternalId: "areaId",
};

const mockSettings: Settings = {
  brand: "myBrand",
  externalSystem: "mySystem",
  launchPeriod: 2,
};

const mockAuth: AuthParams = {
  password: "myPassword",
  username: "iAm",
};

const resultYml: YmlImportSetting = {
  area: {
    externalId: mockLinks.areaExternalId,
  },
  name: mockLinks.name,
  url: mockLinks.url,
  brandSystemName: mockSettings.brand,
  externalSystemSystemName: mockSettings.externalSystem,
  launchPeriod: mockSettings.launchPeriod.toString(),
  password: null,
  username: null,
};
const resultYmlWithAuth: YmlImportSetting = {
  area: {
    externalId: mockLinks.areaExternalId,
  },
  name: mockLinks.name,
  url: mockLinks.url,
  brandSystemName: mockSettings.brand,
  externalSystemSystemName: mockSettings.externalSystem,
  launchPeriod: mockSettings.launchPeriod.toString(),
  password: mockAuth.password,
  username: mockAuth.username,
};

describe("createYmlData", () => {
  test("When auth is not set, should return settings without auth === null", () => {
    const ymlData = createYmlData([mockLinks], mockSettings);

    expect(ymlData).toStrictEqual([resultYml]);
  });

  test("When auth is set, should return settings with auth", () => {
    const ymlData = createYmlData([mockLinks], mockSettings, mockAuth);

    expect(ymlData).toStrictEqual([resultYmlWithAuth]);
  });

  test("When passing 500+ links, should throw validation error ", () => {
    const tooManyLinks = Array(501).map(() => mockLinks);

    try {
      createYmlData(tooManyLinks, mockSettings, mockAuth);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Maximum 500 Yml");
      }
    }
  });
});
