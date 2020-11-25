import sendMessage from "./Message";
import axios from "../../../__mocks__/axios";

describe("ok message", () => {
  it("should call request with right arguments", () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        status: "Success",
      },
    });

    sendMessage.ok("test", "test", "test@mindbox.ru");

    expect(axios.post.mock.calls[0][1]).toEqual({
      customer: {
        email: "test@mindbox.ru",
      },
      emailMailing: {
        customParameters: {
          Task: "test",
          TaskProjectName: "test",
        },
      },
    });
  });

  it("should throw on error", () => {
    axios.post = jest.fn().mockRejectedValue({
      status: 503,
      data: {
        status: "InternalServerError",
      },
    });

    try {
      sendMessage.ok("test", "test", "test@mindbox.ru");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
describe("fail message", () => {
  it("should call request with right arguments", () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        status: "Success",
      },
    });

    sendMessage.fail("test", "test", "test@mindbox.ru");

    expect(axios.post.mock.calls[0][1]).toEqual({
      customer: {
        email: "test@mindbox.ru",
      },
      emailMailing: {
        customParameters: {
          Task: "test",
          TaskProjectName: "test",
        },
      },
    });
  });

  it("should throw on error", () => {
    axios.post = jest.fn().mockRejectedValue({
      status: 503,
      data: {
        status: "InternalServerError",
      },
    });

    try {
      sendMessage.fail("test", "test", "test@mindbox.ru");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
