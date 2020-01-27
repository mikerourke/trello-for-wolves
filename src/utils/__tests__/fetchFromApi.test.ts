import { fetchFromApi } from "../fetchFromApi";

describe("the fetchFromApi method", () => {
  afterEach(() => {
    global.resetFetchMocks();
  });

  test("correctly builds the API url based on the query params", async () => {
    global.captureFetchMock();
    await fetchFromApi({
      endpoint: "/test",
      method: "GET",
      config: global.trelloConfig,
      queryParamsByName: { filter: "all" },
    });
    const result = global.getLastFetchCall();

    expect(result.url.pathname).toBe("/1/test");
    expect(result.url.searchParams.get("filter")).toBe("all");
  });

  test("correctly builds the fetch config based on the body", async () => {
    global.captureFetchMock();
    await fetchFromApi({
      endpoint: "/test",
      method: "GET",
      config: global.trelloConfig,
      body: {
        fullName: "Test Person",
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
      method: "GET",
      config: { ...global.trelloConfig, backoffTime: 1 },
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
        method: "GET",
        config: global.trelloConfig,
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
        method: "GET",
        config: { ...global.trelloConfig, backoffTime: 1, maxRetryAttempts: 5 },
      });
    } catch (err) {
      expect(err.message).toMatch(/Maximum retry attempts reached/gi);
    }
  });

  describe("when the query params contains a `file` key", () => {
    test("the API url is correctly built", async () => {
      global.captureFetchMock();
      await fetchFromApi({
        endpoint: "/test",
        method: "GET",
        config: global.trelloConfig,
        queryParamsByName: {
          file: new File(["test"], "test"),
          name: "Test",
          mimeType: "text/plain",
        },
      });
      const result = global.getLastFetchCall();

      expect(result.url.pathname).toBe("/1/test");
      expect(result.url.searchParams.get("file")).toBeNull();
      expect(result.url.searchParams.get("name")).toBeNull();
      expect(result.url.searchParams.get("mimeType")).toBeNull();
    });

    test("the correct contents are added to the body", async () => {
      global.captureFetchMock();
      const testFile = new File(["test"], "test");
      await fetchFromApi({
        endpoint: "/test",
        method: "GET",
        config: global.trelloConfig,
        queryParamsByName: {
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
