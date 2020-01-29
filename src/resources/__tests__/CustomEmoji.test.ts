import { Trello } from "../../index";

const TEST_ID = "60024c859ab0c51945243414";

describe("the CustomEmoji resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single custom emoji", async () => {
    await trello
      .members("me")
      .customEmojis(TEST_ID)
      .getCustomEmoji({ fields: "all" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/me/customEmoji/${TEST_ID}`);
    expect(result.url.searchParams.get("fields")).toBe("all");
  });

  test("gets multiple custom emojis", async () => {
    await trello
      .members("me")
      .customEmojis()
      .getCustomEmojis({ filter: "all" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/me/customEmoji`);
    expect(result.url.searchParams.get("filter")).toBe("all");
  });

  test("uploads a custom emoji", async () => {
    const testFile = new File(["test"], "test");
    await trello
      .members("me")
      .customEmojis()
      .uploadCustomEmoji({ file: testFile, name: "Test" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/members/me/customEmoji`);
    expect(result.config.body.get("file")).toEqual(testFile);
    expect(result.config.body.get("name")).toEqual("Test");
  });
});
