import { Trello } from "../../index";

const TEST_ID = "d9a04f38b919f23b8cc7bf01";

describe("the Search resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("performs a general search with the specified query", async () => {
    await trello.search().performSearch({
      query: "test",
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe("/1/search");
    expect(result.url.searchParams.get("query")).toBe("test");
  });

  test("performs a search for members with the specified query and params", async () => {
    await trello.search().searchMembers({
      query: "test",
      limit: 10,
      idBoard: TEST_ID,
      idOrganization: TEST_ID,
      onlyOrgMembers: true,
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe("/1/search/members");
    expect(result.url.searchParams.get("query")).toBe("test");
    expect(result.url.searchParams.get("limit")).toBe("10");
    expect(result.url.searchParams.get("idBoard")).toBe(TEST_ID);
    expect(result.url.searchParams.get("idOrganization")).toBe(TEST_ID);
    expect(result.url.searchParams.get("onlyOrgMembers")).toBe("true");
  });
});
