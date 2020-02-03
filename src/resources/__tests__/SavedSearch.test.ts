import { Trello } from "../../index";

const TEST_ID = "d9a04f38b919f23b8cc7bf01";

describe("the SavedSearch resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single saved search", async () => {
    await trello
      .members("me")
      .savedSearches(TEST_ID)
      .getSavedSearch();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/me/savedSearches/${TEST_ID}`);
  });

  test("gets multiple saved searches", async () => {
    await trello
      .members("me")
      .savedSearches()
      .getSavedSearches();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/me/savedSearches`);
  });

  test("adds a new saved search", async () => {
    await trello
      .members("me")
      .savedSearches()
      .addSavedSearch({
        name: "Test",
        pos: "top",
        query: "@test",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/members/me/savedSearches`);
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("pos")).toBe("top");
    expect(result.url.searchParams.get("query")).toBe("@test");
  });

  test("updates a saved search", async () => {
    await trello
      .members("me")
      .savedSearches(TEST_ID)
      .updateSavedSearch({
        name: "Test",
        pos: "top",
        query: "@test",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/members/me/savedSearches/${TEST_ID}`);
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("pos")).toBe("top");
    expect(result.url.searchParams.get("query")).toBe("@test");
  });

  test("updates the name of a saved search", async () => {
    await trello
      .members("me")
      .savedSearches(TEST_ID)
      .updateName("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/members/me/savedSearches/${TEST_ID}/name`,
    );
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("updates the position of a saved search", async () => {
    await trello
      .members("me")
      .savedSearches(TEST_ID)
      .updatePosition(10);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/members/me/savedSearches/${TEST_ID}/pos`,
    );
    expect(result.url.searchParams.get("value")).toBe("10");
  });

  test("updates the query of a saved search", async () => {
    await trello
      .members("me")
      .savedSearches(TEST_ID)
      .updateQuery("@new");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/members/me/savedSearches/${TEST_ID}/query`,
    );
    expect(result.url.searchParams.get("value")).toBe("@new");
  });

  test("deletes a saved search", async () => {
    await trello
      .members("me")
      .savedSearches(TEST_ID)
      .deleteSavedSearch();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(`/1/members/me/savedSearches/${TEST_ID}`);
  });
});
