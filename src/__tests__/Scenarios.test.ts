import axios from "../__mocks__/axios";
import scenarios from "../server/models/Scenarios";

describe("ecommerce", () => {
  it("should return 200 if resolve", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
    });

    const res = await scenarios.ecommerce("test", 1);
    expect(res.status).toBe(200);
  });

  it("should trrow on network error", async () => {
    axios.post = jest.fn().mockRejectedValue({
      status: 500,
    });

    try {
      await scenarios.ecommerce("test", 1);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});

describe("loyaltyOffline", () => {
  it("should return 200 if resolve", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
    });

    const res = await scenarios.loyaltyOffline("test", 1);

    expect(res.status).toBe(200);
  });

  it("should trrow on network error", async () => {
    axios.post = jest.fn().mockRejectedValue({
      status: 500,
    });

    try {
      await scenarios.loyaltyOffline("test", 1);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});

describe("loyaltyOnline", () => {
  it("should return 200 if resolve", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
    });

    const res = await scenarios.loyaltyOnline("test", 1);

    expect(res.status).toBe(200);
  });

  it("should trrow on network error", async () => {
    axios.post = jest.fn().mockRejectedValue({
      status: 500,
    });

    try {
      await scenarios.loyaltyOnline("test", 1);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});

describe("mobilePush", () => {
  it("should return 200 if resolve", async () => {
    axios.post = jest.fn().mockResolvedValue({
      status: 200,
    });

    const res = await scenarios.mobilePush("test", 1);

    expect(res.status).toBe(200);
  });

  it("should trrow on network error", async () => {
    axios.post = jest.fn().mockRejectedValue({
      status: 500,
    });

    try {
      await scenarios.mobilePush("test", 1);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
