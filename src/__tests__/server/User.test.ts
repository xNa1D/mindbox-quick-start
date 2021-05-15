import axios from "../../__mocks__/axios";
import User from "../../server/user/User";

const user = new User("nikitin@mindbox.ru");

const mockAuthSuccessResponse = {
  status: 200,
  headers: {
    "cache-control": "private",
    "content-type": "application/json; charset=utf-8",
    "set-cookie": [
      ".ASPXAUTH=MyAwesomeAuthCookie; path=/; HttpOnly; SameSite=Lax; Secure",
    ],
  },
  data: {
    userName: "testUser",
    password: "myPassword",
    mobilePhone: null,
    confirmationCode: null,
    pageState: "confirmed",
    previousPageState: "login",
    validationSummary: {},
  },
};
const mockAuthErrorResponse = {
  status: 200,
  headers: {
    "cache-control": "private",
    "content-type": "application/json; charset=utf-8",
  },
  data: {
    userName: "testUser",
    password: "myPassword",
    mobilePhone: null,
    confirmationCode: null,
    pageState: "login",
    previousPageState: "login",
    validationSummary: {
      globalMessages: "Вход заблокирован до 15.05.2021 19:21:43",
    },
  },
};

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

describe("authenticateByAdminPanel", () => {
  const userForRegistration = new User("nikitin@mindbox.ru", "123");
  it("should return auth token if auth ok", async () => {
    axios.post = jest.fn().mockResolvedValue(mockAuthSuccessResponse);
    const token = await userForRegistration.authenticateByAdminPanel("test");
    expect(token).toBe(".ASPXAUTH=MyAwesomeAuthCookie");
  });

  it("should throw error if auth failed", async () => {
    axios.post = jest.fn().mockResolvedValue(mockAuthErrorResponse);
    try {
      await userForRegistration.authenticateByAdminPanel("test");
    } catch (error) {
      expect(error.toString()).toBe("Error: Вход заблокирован до 15.05.2021 19:21:43");
    }
  });
});
