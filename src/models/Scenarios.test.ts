import axios from "../../__mocks__/axios";
import {
  createBasicEcommersOperations,
  createLoayltyOfflineOperations,
  createLoayltyOnlineOperations,
  createMobilePushOperations,
} from "./Scenarios";

axios.post = jest.fn().mockResolvedValue({
  status: 200,
});

describe("all scenarios", () => {
  it("should make requst for ecom scenario", async () => {
    await createBasicEcommersOperations("test");
    expect(axios.post).toHaveBeenCalled();
  });
  it("should make requst for loyalty online scenario", async () => {
    await createLoayltyOnlineOperations("test", 1);
    expect(axios.post).toHaveBeenCalled();
  });
  it("should make requst for loyalty offline scenario", async () => {
    await createLoayltyOfflineOperations("test", 1);
    expect(axios.post).toHaveBeenCalled();
  });
  it("should make requst for mobile push scenario", async () => {
    await createMobilePushOperations("test", 1);
    expect(axios.post).toHaveBeenCalled();
  });
});
