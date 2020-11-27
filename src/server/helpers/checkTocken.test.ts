import checkTocken from "./checkTocken";
import generateAccessToken from "./generateAccessToken";
import { Request, Response, NextFunction } from "express";

describe("checkTocken", () => {
  it("should call next() function on valid token", () => {
    const token = generateAccessToken("nikitin@mindbox.ru");
    const result = checkTocken(token);
    expect(result.email).toBe("nikitin@mindbox.ru");
  });

  it("should call sendStatus() function on invalid token", () => {
    try {
      checkTocken("123");
    } catch (error) {
      expect(error.toString()).toBe("JsonWebTokenError: jwt malformed");
    }
  });
});
