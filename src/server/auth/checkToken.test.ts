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
    try {
      checkToken("123");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.toString()).toBe("JsonWebTokenError: jwt malformed");
      }
    }
  });
});
