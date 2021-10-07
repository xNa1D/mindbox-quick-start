import axios from "src/__mocks__/axios";

import startScenario from "client/api/sendYmlData";

import { YmlRequestType } from "src/declarations";

const mockBody: YmlRequestType = {
  links: [
    {
      name: "myName",
      url: "myLink",
      externalId: "myArea",
    },
  ],
  settings: {
    brand: "myBrand",
    externalSystem: "mySystem",
    launchPeriod: 2,
  },
};

test("should call api with passed params", async () => {
  await startScenario(mockBody);
  expect(axios.post).toBeCalledWith("/api/yml/start", mockBody, {
    headers: { "content-type": "application/json" },
  });
});
