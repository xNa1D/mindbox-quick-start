export const loginUser = jest
  .fn()
  .mockResolvedValue({ status: 200, data: "token" });
export const checkToken = jest
  .fn()
  .mockResolvedValue({ status: 200, data: "token" });
export const createUser = jest
  .fn()
  .mockResolvedValue({ status: 200, data: "user created" });
