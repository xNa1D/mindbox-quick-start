import checkTocken from "../../server/user/checkTocken";
import generateAccessToken from "../../server/user/generateAccessToken";
import { Request, Response, NextFunction } from "express";

describe("checkTocken", () => {
  it("should call next() function on valid token", () => {
    const token = generateAccessToken({ email: "nikitin@mindbox.ru"});
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
