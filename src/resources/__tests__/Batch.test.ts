import { Trello } from "../../index";

const TEST_PARENT_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_CHILD_ID = "dd7d4048bed6c23daebf1070";

describe("the Batch resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("makes batch requests with no commas in requests", async () => {
    const urls = [`/boards/${TEST_PARENT_ID}`, `/cards/${TEST_CHILD_ID}`];
    await trello.batch().makeRequests(urls);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe("/1/batch");
    expect(result.url.searchParams.get("urls")).toBe(urls.join(","));
  });

  test("makes batch requests with commas in requests", async () => {
    const requestUrls = [
      `/boards/${TEST_PARENT_ID}/test=Other,Thing`,
      `/cards/${TEST_CHILD_ID}`,
    ];
    await trello.batch().makeRequests(requestUrls);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe("/1/batch");
    expect(result.url.searchParams.toString()).toMatch(/Other%2CThing/gi);
  });
});
