import { checkToken } from ".";
import generateAccessToken from "./generateAccessToken";

const token = generateAccessToken({
  email: "nikitin@mindbox.ru",
  project: "myProject",
  tokenFromAdminPanel: "myToken",
});

describe("checkTocken", () => {
  it("When JWT is valid, should return decoded user", () => {
    const result = checkToken(token);

    expect(result.email).toBe("nikitin@mindbox.ru");
  });

  it("When JWT is incorrect, should throw error", () => {
    let message;

    try {
      checkToken("123");
    } catch (error) {
      if (error instanceof Error) {
        message = error.toString();
      }
    } finally {
      expect(message).toBe("JsonWebTokenError: jwt malformed");
    }
  });
});
