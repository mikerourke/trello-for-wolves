import { Trello } from "../../index";

const TEST_ATTACH_ID = "60024c859ab0c51945243414";
const TEST_CARD_ID = "d9a04f38b919f23b8cc7bf01";

describe("the Attachment resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("configures the fetch call for a single attachment", async () => {
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

  test("configures the fetch call for multiple attachments", async () => {
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

  // TODO: Validate that form data works.
  test("configures the fetch call to upload an attachment", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .attachments()
      .uploadAttachment({
        name: "TEST",
        file: new File(["test"], "test"),
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/attachments`);
  });

  test("configures the fetch call to delete an attachment", async () => {
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
