import axios from "axios";
import startScenario from "src/client/shared/api/sendYmlData";
import { YmlRequestType } from "src/client/yml/entities/form";

jest.mock("axios");


const mockBody: YmlRequestType = {
  links: [
    {
      name: "myName",
      url: "myLink",
      areaExternalId: "myArea",
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
