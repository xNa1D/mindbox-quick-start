import checkTocken from "./checkTocken";
import generateAccessToken from "../user/generateAccessToken";
import { Request, Response, NextFunction } from "express";

const token = generateAccessToken({
  email: "nikitin@mindbox.ru",
  project: "myProject",
  tokenFromAdminPanel: "myToken",
});

describe("checkTocken", () => {
  it("When JWT is valid, should return decoded user", () => {
    const result = checkTocken(token);
    expect(result.email).toBe("nikitin@mindbox.ru");
  });

  it("When JWT is incorrect, should throw error", () => {
    try {
      checkTocken("123");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.toString()).toBe("JsonWebTokenError: jwt malformed");
      }
    }
  });
});
