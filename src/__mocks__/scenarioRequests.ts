const startScenario = jest
  .fn()
  .mockResolvedValue({ response: { status: 200, data: "" } });

export default startScenario;
