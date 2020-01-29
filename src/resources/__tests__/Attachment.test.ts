import { Trello } from "../../index";

const TEST_CARD_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_ATTACH_ID = "60024c859ab0c51945243414";

describe("the Attachment resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single attachment", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .attachments(TEST_ATTACH_ID)
      .getAttachment();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/attachments/${TEST_ATTACH_ID}`,
    );
  });

  test("gets multiple attachments", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .attachments()
      .getAttachments({
        filter: "all",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/attachments`);
    expect(result.url.searchParams.get("filter")).toBe("all");
  });

  test("uploads an attachment", async () => {
    const testFile = new File(["test"], "test");
    await trello
      .cards(TEST_CARD_ID)
      .attachments()
      .uploadAttachment({
        name: "TEST",
        file: testFile,
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/attachments`);
    expect(result.config.body.get("file")).toEqual(testFile);
    expect(result.config.body.get("name")).toBe("TEST");
  });

  test("throws an error if the name param is longer than 256 characters", async () => {
    expect.assertions(1);

    try {
      await trello
        .cards(TEST_CARD_ID)
        .attachments()
        .uploadAttachment({
          name: "TEST".repeat(80),
        });
    } catch (err) {
      expect(err.message).toMatch(/cannot exceed 256/gi);
    }
  });

  test("throws an error if the mimeType param is longer than 256 characters", async () => {
    expect.assertions(1);

    try {
      await trello
        .cards(TEST_CARD_ID)
        .attachments()
        .uploadAttachment({
          mimeType: "TEST".repeat(80),
        });
    } catch (err) {
      expect(err.message).toMatch(/cannot exceed 256/gi);
    }
  });

  test("throws an error if the url param is invalid", async () => {
    expect.assertions(1);

    try {
      await trello
        .cards(TEST_CARD_ID)
        .attachments()
        .uploadAttachment({
          url: "TEST",
        });
    } catch (err) {
      expect(err.message).toMatch(/must start with/gi);
    }
  });

  test("deletes an attachment", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .attachments(TEST_ATTACH_ID)
      .deleteAttachment();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/attachments/${TEST_ATTACH_ID}`,
    );
  });
});
