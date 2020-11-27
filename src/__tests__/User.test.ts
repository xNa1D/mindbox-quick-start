import axios from "../../__mocks__/axios";
import User from "../server/models/User";

const user = new User("nikitin@mindbox.ru");

describe("makeNewPassword", () => {
  it("should return string", () => {
    expect(user.makeNewPassword()).not.toBeNull();
  });
});

describe("isStuffExistInMindbox", () => {
  it("should return true if stuff exist", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        status: "Success",
        customer: {
          processingStatus: "Found",
        },
      },
    });

    expect(await user.isStuffExistInMindbox()).toBeTruthy();
  });

  it("should return false if stuff not exist", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        status: "Success",
        customer: {
          processingStatus: "NotFound",
        },
      },
    });

    expect(await user.isStuffExistInMindbox()).not.toBeTruthy();
  });

  it("should throw error when mindbox fail", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 500,
      data: {
        status: "InternalServerError",
        errorMessage: "Внутрення ошибка сервера",
        errorId: "111-111",
        httpStatusCode: 500,
      },
    });

    try {
      await user.isStuffExistInMindbox();
    } catch (error) {
      expect(error).toBe("Mindbox internal Error");
    }
  });
});

describe("loginStuff", () => {
  it("should return true if login successfull", async () => {
    const userForLogin = new User("nikitin@mindbox.ru", "123");

    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        status: "Success",
        customer: {
          processingStatus: "AuthenticationSucceeded",
        },
      },
    });

    expect(await userForLogin.loginStuff()).toBeTruthy();
  });
  it("should return true if login not successfull", async () => {
    const userForLogin = new User("nikitin@mindbox.ru", "123");

    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        status: "Success",
        customer: {
          processingStatus: "AuthenticationFailed",
        },
      },
    });

    expect(await userForLogin.loginStuff()).not.toBeTruthy();
  });
});

describe("registrStuff", () => {
  it("should make request ", async () => {
    const userForRegistration = new User("nikitin@mindbox.ru", "123");

    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        status: "Success",
      },
    });
    await userForRegistration.registrStuff();
    expect(axios.post).toHaveBeenCalled();
  });
});
