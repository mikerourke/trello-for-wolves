import Mock = jest.Mock;

const globalFetch = jest.fn() as Mock;

Object.assign(globalFetch, {
  mockCall(): Mock {
    return globalFetch.mockImplementation((url: string, config: unknown) => ({
      url,
      config,
      ok: true,
    }));
  },
  mockReject(body: unknown): Mock {
    return globalFetch.mockImplementation(() =>
      Promise.reject({ body, ok: false }),
    );
  },
  resetMocks(): void {
    globalFetch.mockReset();
  },
});

// @ts-ignore
global.fetch = globalFetch;

global.trelloConfig = {
  key: "KEY",
  token: "TOKEN",
};

global.captureFetchMock = (): void => {
  global.fetch.mockCall();
};

global.getLastFetchCall = () => {
  const mockCalls = global.fetch.mock.calls;
  const lastCall = mockCalls[mockCalls.length - 1];
  if (lastCall[0]) {
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
