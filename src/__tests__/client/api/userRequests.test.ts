import { checkToken, loginUserByAdminPanel } from "client/api/userRequests";

import { AuthByAdminPanelRequestBody } from "src/declarations";

import axios from "src/__mocks__/axios";

const MockAuthBody: AuthByAdminPanelRequestBody = {
  login: "auth@me.please",
  password: "superStrongPsw",
  project: "awesomeProject",
};

describe("checkToken", () => {
  test("should call api with passed params", async () => {
    await checkToken();
    expect(axios.get).toBeCalledWith("/api/user/checkToken", {
      headers: { "content-type": "application/json" },
    });
  });
});

describe("loginUserByAdminPanel", () => {
  test("should call api with passed params", async () => {
    await loginUserByAdminPanel(MockAuthBody);
    expect(axios.post).toBeCalledWith(
      "/api/user/authByAdminPanel",
      MockAuthBody,
      {
        headers: { "content-type": "application/json" },
      }
    );
  });
});
