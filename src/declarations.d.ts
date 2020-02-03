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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body: any;
    };
  };
  resetFetchMocks: VoidFunction;
}

declare interface Global extends TestHelpers {
  fetch: Mock;
}

declare const global: Global;
