import { Trello } from "../../index";

const TEST_TOKEN_ID = "60024c859ab0c51945243414";
const TEST_WEBHOOK_ID = "dd7d4048bed6c23daebf1070";

describe("the Token resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single token", async () => {
    await trello
      .tokens(TEST_TOKEN_ID)
      .getToken({ fields: "all", webhooks: true });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/tokens/${TEST_TOKEN_ID}`);
    expect(result.url.searchParams.get("fields")).toBe("all");
    expect(result.url.searchParams.get("webhooks")).toBe("true");
  });

  test("gets multiple tokens", async () => {
    await trello
      .members("me")
      .tokens()
      .getTokens();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/me/tokens`);
  });

  test("gets the field value for a token", async () => {
    await trello.tokens(TEST_TOKEN_ID).getFieldValue("dateCreated");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/tokens/${TEST_TOKEN_ID}/dateCreated`);
  });

  test("deletes a token", async () => {
    await trello.tokens(TEST_TOKEN_ID).deleteToken();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(`/1/tokens/${TEST_TOKEN_ID}`);
  });

  test("gets the member for a token", async () => {
    await trello
      .tokens(TEST_TOKEN_ID)
      .member()
      .getMember();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/tokens/${TEST_TOKEN_ID}/member`);
  });

  test("gets the webhooks for a token", async () => {
    await trello
      .tokens(TEST_TOKEN_ID)
      .webhooks()
      .getWebhooks();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/tokens/${TEST_TOKEN_ID}/webhooks`);
  });

  test("adds a new webhook to a token", async () => {
    await trello
      .tokens(TEST_TOKEN_ID)
      .webhooks()
      .addWebhook({
        callbackURL: "/test",
        idModel: "abc",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/tokens/${TEST_TOKEN_ID}/webhooks`);
    expect(result.url.searchParams.get("callbackURL")).toBe("/test");
    expect(result.url.searchParams.get("idModel")).toBe("abc");
  });

  test("updates a webhook for a token", async () => {
    await trello
      .tokens(TEST_TOKEN_ID)
      .webhooks(TEST_WEBHOOK_ID)
      .updateWebhook({
        callbackURL: "/test",
        idModel: "abc",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/tokens/${TEST_TOKEN_ID}/webhooks/${TEST_WEBHOOK_ID}`,
    );
    expect(result.url.searchParams.get("callbackURL")).toBe("/test");
    expect(result.url.searchParams.get("idModel")).toBe("abc");
  });

  test("deletes a webhook for a token", async () => {
    await trello
      .tokens(TEST_TOKEN_ID)
      .webhooks(TEST_WEBHOOK_ID)
      .deleteWebhook();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/tokens/${TEST_TOKEN_ID}/webhooks/${TEST_WEBHOOK_ID}`,
    );
  });
});
