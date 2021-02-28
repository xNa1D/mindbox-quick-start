import axios from "axios";

import { AuthRequestBody } from "src/declarations";

export const loginUser = (user: AuthRequestBody) => {
  return axios.post("/api/user/auth", user, {
    headers: { "content-type": "application/json" },
  });
};
export const checkToken = (token: string) => {
  return axios.post("/api/user/auth", token, {
    headers: { "content-type": "application/json" },
  });
};


