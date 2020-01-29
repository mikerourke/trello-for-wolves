import { Trello } from "../../index";

const TEST_CARD_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_STICKER_ID = "60024c859ab0c51945243414";

describe("the Sticker resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single sticker", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .stickers(TEST_STICKER_ID)
      .getSticker();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/stickers/${TEST_STICKER_ID}`,
    );
  });

  test("gets multiple stickers", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .stickers()
      .getStickers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/stickers`);
  });

  test("gets nested stickers", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .stickers()
      .getNestedStickers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}`);
    expect(result.url.searchParams.get("stickers")).toBe("all");
  });

  test("adds a sticker to a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .stickers()
      .addSticker({
        image: "taco-cool",
        top: 0,
        left: 0,
        zIndex: 1,
        rotate: 90,
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/stickers`);
    expect(result.url.searchParams.get("image")).toBe("taco-cool");
    expect(result.url.searchParams.get("top")).toBe("0");
    expect(result.url.searchParams.get("left")).toBe("0");
    expect(result.url.searchParams.get("zIndex")).toBe("1");
    expect(result.url.searchParams.get("rotate")).toBe("90");
  });

  test("uploads a custom sticker", async () => {
    const testFile = new File(["test"], "test");
    await trello
      .members("me")
      .customStickers()
      .uploadCustomSticker(testFile);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/members/me/customStickers`);
    expect(result.config.body.get("file")).toEqual(testFile);
  });

  test("updates an existing sticker", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .stickers(TEST_STICKER_ID)
      .updateSticker({ left: 10 });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/stickers/${TEST_STICKER_ID}`,
    );
    expect(result.url.searchParams.get("left")).toBe("10");
  });

  test("removes a sticker from a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .stickers(TEST_STICKER_ID)
      .removeSticker();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/stickers/${TEST_STICKER_ID}`,
    );
  });

  test("deletes a custom sticker", async () => {
    await trello
      .members("me")
      .customStickers(TEST_STICKER_ID)
      .deleteCustomSticker();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/members/me/customStickers/${TEST_STICKER_ID}`,
    );
  });
});
