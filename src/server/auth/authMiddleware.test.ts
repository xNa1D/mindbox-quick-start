import { authMiddleware } from ".";
import { Request, Response, NextFunction } from "express";
import generateAccessToken from "./generateAccessToken";

const mockRequestWithValidJWT = {
  cookies: {
    token: generateAccessToken({
      email: "test@me.io",
      project: "test",
      tokenFromAdminPanel: "testToken",
    }),
  },
} as Request;

const mockRequestWithInValidJWT = {
  cookies: {
    token: "123",
  },
} as Request;

const mockResponse = {
  sendStatus: jest.fn(),
  locals: {}
} as unknown as Response;

const mockNextFn = jest.fn() as NextFunction;

describe("authMiddleware", () => {
  test("When JWT is correct, should call next()", () => {
    authMiddleware(mockRequestWithValidJWT, mockResponse, mockNextFn);

    expect(mockNextFn).toBeCalled();
  });

    test("When JWT is incorrect, should call sendStatus() with 403", () => {
      authMiddleware(mockRequestWithInValidJWT, mockResponse, mockNextFn);

      expect(mockResponse.sendStatus).toBeCalledWith(403);
    });
});
