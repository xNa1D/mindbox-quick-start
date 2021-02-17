const sendMessage = {
  ok: jest
    .fn()
    .mockImplementation(
      (projectName: string, taskName: string, email: string) => ""
    ),
  fail: jest
    .fn()
    .mockImplementation(
      (projectName: string, taskName: string, email: string) => ""
    ),
};

export default sendMessage;
