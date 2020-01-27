declare interface TestHelpers {
  trelloConfig: {
    key: string;
    token: string;
  };
  captureFetchMock: () => void;
  getLastFetchCall: () => {
    url: URL;
    config: {
      method: string;
      body: unknown;
    };
  };
  resetFetchMocks: VoidFunction;
}

declare interface Global extends TestHelpers {
  fetch: Mock & {
    mockCall: VoidFunction;
    mockReject: (body: unknown) => Mock;
    resetMocks: VoidFunction;
  };
}

declare const global: Global;
