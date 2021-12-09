import axios from "axios";

import {
  AuthRequestBody,
  RegistrationRequest,
  AuthByAdminPanelRequestBody,
} from "src/declarations";

const options = {
  headers: { "content-type": "application/json" },
};

export const loginUser = (user: AuthRequestBody, isLoginByAdmin: boolean) => {
  const authUrl = isLoginByAdmin ? "authByAdminPanel" : "auth";

  return axios.post(`/api/user/${authUrl}`, user, options);
};

export const loginUserByAdminPanel = (user: AuthByAdminPanelRequestBody) => {
  return axios.post("/api/user/authByAdminPanel", user, options);
};

export const checkToken = () => {
  return axios.get("/api/user/checkToken", options);
};
export const createUser = (user: RegistrationRequest) => {
  return axios.post("/api/user/reg", user, options);
};
