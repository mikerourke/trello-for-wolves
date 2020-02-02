import { fetchFromApi } from "../fetchFromApi";

describe("the fetchFromApi method", () => {
  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("throws an error if the key is missing from the trelloConfig object", async () => {
    expect.assertions(1);

    try {
      await fetchFromApi({
        endpoint: "/test",
        trelloConfig: { token: "TEST" } as any,
        paramsByName: { filter: "all" },
      });
    } catch (err) {
      expect(err.message).toMatch(/You must provide a "key" to the/gi);
    }
  });

  test("throws an error if the token is missing from the trelloConfig object", async () => {
    expect.assertions(1);

    try {
      await fetchFromApi({
        endpoint: "/test",
        trelloConfig: { key: "TEST" } as any,
        paramsByName: { filter: "all" },
      });
    } catch (err) {
      expect(err.message).toMatch(/You must provide a "token" to the/gi);
    }
  });

  test("correctly builds the API url based on the query params", async () => {
    await fetchFromApi({
      endpoint: "/test",
      trelloConfig: global.trelloConfig,
      paramsByName: { filter: "all" },
    });
    const result = global.getLastFetchCall();

    expect(result.url.pathname).toBe("/1/test");
    expect(result.url.searchParams.get("filter")).toBe("all");
  });

  test("correctly builds the fetch trelloConfig based on the body", async () => {
    await fetchFromApi({
      endpoint: "/test",
      trelloConfig: global.trelloConfig,
      fetchConfig: {
        method: "GET",
        body: {
          fullName: "Test Person",
        } as any,
      },
    });
    const result = global.getLastFetchCall();

    expect(result.url.pathname).toBe("/1/test");
    expect(result.config.body).toBe(
      JSON.stringify({ fullName: "Test Person" }),
    );
  });

  test("retries the fetch call if the response returns a 429", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: false, status: 429 }),
    );
    global.fetch.mockImplementationOnce(() => Promise.resolve({ ok: true }));

    await fetchFromApi({
      endpoint: "/test",
      trelloConfig: { ...global.trelloConfig, backoffTime: 1 },
    });
    expect(global.fetch.mock.calls).toHaveLength(2);
  });

  test("throws an error if the response is not ok and status is not 429", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: false, status: 400, statusText: "Error" }),
    );

    expect.assertions(1);

    try {
      await fetchFromApi({
        endpoint: "/test",
        trelloConfig: global.trelloConfig,
      });
    } catch (err) {
      expect(err.message).toMatch(/Error/gi);
    }
  });

  test("throws an error if the max retry attempts are reached", async () => {
    global.fetch.mockImplementation(() => ({ ok: false, status: 429 }));

    expect.assertions(1);

    try {
      await fetchFromApi({
        endpoint: "/test",
        trelloConfig: {
          ...global.trelloConfig,
          backoffTime: 1,
          maxRetryAttempts: 5,
        },
      });
    } catch (err) {
      expect(err.message).toMatch(/Maximum retry attempts reached/gi);
    }
  });

  describe("when the query params contains a `file` key", () => {
    test("the API url is correctly built", async () => {
      await fetchFromApi({
        endpoint: "/test",
        trelloConfig: global.trelloConfig,
        paramsByName: {
          file: new File(["test"], "test"),
          name: "Test",
          mimeType: "text/plain",
        },
      });
      const result = global.getLastFetchCall();

      expect(result.url.pathname).toBe("/1/test");
      expect(result.url.searchParams.get("file")).toBeNull();
      expect(result.config.body.get("name")).toBe("Test");
      expect(result.config.body.get("mimeType")).toBe("text/plain");
    });

    test("the correct contents are added to the body", async () => {
      const testFile = new File(["test"], "test.txt");
      await fetchFromApi({
        endpoint: "/test",
        trelloConfig: global.trelloConfig,
        paramsByName: {
          file: testFile,
          name: "Test",
          mimeType: "text/plain",
        },
      });
      const result = global.getLastFetchCall();
      const body = result.config.body as FormData;

      expect(result.url.pathname).toBe("/1/test");
      expect(result.url.searchParams.get("file")).toBeNull();
      expect(body.get("file")).toEqual(testFile);
      expect(body.get("name")).toEqual("Test");
      expect(body.get("mimeType")).toEqual("text/plain");
    });
  });
});
