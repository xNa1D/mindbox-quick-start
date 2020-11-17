export default {
  get: jest.fn().mockRejectedValue(),
  post: jest.fn().mockRejectedValue(),
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
};
