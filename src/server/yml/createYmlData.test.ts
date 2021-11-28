import { AuthParams, Link, Settings } from "src/declarations";
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

test("should return settings without auth", () => {
  const ymlData = createYmlData([mockLinks], mockSettings);

  expect(ymlData).toStrictEqual([resultYml]);
});

test("should return settings with auth", () => {
  const ymlData = createYmlData([mockLinks], mockSettings, mockAuth);

  expect(ymlData).toStrictEqual([resultYmlWithAuth]);
});
