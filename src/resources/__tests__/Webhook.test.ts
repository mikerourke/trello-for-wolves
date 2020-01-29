import { Trello } from "../../index";

const TEST_WEBHOOK_ID = "60024c859ab0c51945243414";

describe("the Webhook resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single webhook", async () => {
    await trello.webhooks(TEST_WEBHOOK_ID).getWebhook();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/webhooks/${TEST_WEBHOOK_ID}`);
  });

  test("gets a webhook field value", async () => {
    await trello.webhooks(TEST_WEBHOOK_ID).getFieldValue("callbackURL");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/webhooks/${TEST_WEBHOOK_ID}/callbackURL`,
    );
  });

  test("gets multiple webhooks", async () => {
    await trello.webhooks().getWebhooks();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/webhooks`);
  });

  test("adds a new webhook", async () => {
    await trello.webhooks().addWebhook({
      callbackURL: "/test",
      idModel: "abc",
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/webhooks`);
    expect(result.url.searchParams.get("callbackURL")).toBe("/test");
    expect(result.url.searchParams.get("idModel")).toBe("abc");
  });

  test("updates a webhook", async () => {
    await trello.webhooks(TEST_WEBHOOK_ID).updateWebhook({
      description: "Test",
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/webhooks/${TEST_WEBHOOK_ID}`);
    expect(result.url.searchParams.get("description")).toBe("Test");
  });

  test("deletes a webhook", async () => {
    await trello.webhooks(TEST_WEBHOOK_ID).deleteWebhook();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(`/1/webhooks/${TEST_WEBHOOK_ID}`);
  });
});
