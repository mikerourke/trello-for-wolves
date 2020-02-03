import Mock = jest.Mock;

global.fetch = jest.fn() as Mock;

global.trelloConfig = {
  key: "KEY",
  token: "TOKEN",
};

global.captureFetchMock = (): void => {
  global.fetch.mockImplementation((url: string, config: unknown) => ({
    url,
    config,
    ok: true,
  }));
};

global.getLastFetchCall = () => {
  const mockCalls = global.fetch.mock.calls;
  const lastCall = mockCalls[mockCalls.length - 1];
  if (lastCall && lastCall[0]) {
    return {
      url: new URL(lastCall[0]),
      config: lastCall[1],
    };
  }

  return {
    url: new URL("/"),
    config: {},
  };
};

global.resetFetchMocks = (): void => {
  global.fetch.mockReset();
};
