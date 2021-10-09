import axios, { AxiosResponse } from "axios";
import sendYmlToMindbox, {
  YmlImportSetting,
} from "src/server/yml/sendYmlToMindbox";

const mockYmlSettings: YmlImportSetting = {
  area: { areaExternalId: "areaId" },
  name: "awesomeName",
  url: "linkToFeed",
  brandSystemName: "myBrand",
  externalSystemSystemName: "mySystem",
  launchPeriod: "2",
  password: "myPassword",
  username: "iAm",
};

const mockProject = "myProject";
const mockToken = "myToken";

test("should send correct settings", () => {
  const mockResponse: AxiosResponse = {
    status: 200,
    data: {
      Action: 3,
      Content: null,
      RedirectUrl: null,
      Data: null,
    },
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    statusText: "OK",
    config: {},
  };

  const mockAxios = axios.post as jest.Mock;
  mockAxios.mockResolvedValue(mockResponse);

  sendYmlToMindbox([mockYmlSettings], mockProject, mockToken);

  expect(mockAxios.mock.calls[0][0]).toBe(
    "https://myProject.mindbox.ru/products/import/yml/save"
  );
  expect(mockAxios.mock.calls[0][2]).toStrictEqual({
    headers: { Cookie: "myToken" },
  });
});


test("should throw auth exeption if answer content type === html", async () => {
  const mockResponse: AxiosResponse = {
    status: 200,
    data: {
      Action: 3,
      Content: null,
      RedirectUrl: null,
      Data: null,
    },
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
    statusText: "OK",
    config: {},
  };
    const mockAxios = axios.post as jest.Mock;
    mockAxios.mockResolvedValue(mockResponse);

try {
  
  await sendYmlToMindbox([mockYmlSettings], mockProject, mockToken);
} catch (error) {
  if (error instanceof Error) {
     expect(error.message).toBe("Mindbox error");
  }
 
}




  
});
