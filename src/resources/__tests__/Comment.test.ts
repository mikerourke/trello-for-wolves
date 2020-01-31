import { Trello } from "../../index";

const TEST_CARD_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_COMMENT_ID = "60024c859ab0c51945243414";

describe("the Comment resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single comment", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .comments(TEST_COMMENT_ID)
      .getComment();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/actions/${TEST_COMMENT_ID}`,
    );
  });

  test("gets multiple comments", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .comments()
      .getComments();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/actions`);
    expect(result.url.searchParams.get("filter")).toBe("commentCard");
  });

  test("adds a new comment", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .comments()
      .addComment("This is a comment");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/actions/comments`,
    );
    expect(result.url.searchParams.get("text")).toBe("This is a comment");
  });

  test("updates a comment", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .comments(TEST_COMMENT_ID)
      .updateComment("This is a different comment");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/actions/${TEST_COMMENT_ID}/comments`,
    );
    expect(result.url.searchParams.get("text")).toBe(
      "This is a different comment",
    );
  });

  test("updates a comment's text", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .comments(TEST_COMMENT_ID)
      .updateText("This is a different comment");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/actions/${TEST_COMMENT_ID}/text`,
    );
    expect(result.url.searchParams.get("value")).toBe(
      "This is a different comment",
    );
  });

  test("deletes a comment", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .comments(TEST_COMMENT_ID)
      .deleteComment();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/actions/${TEST_COMMENT_ID}/comments`,
    );
  });
});
