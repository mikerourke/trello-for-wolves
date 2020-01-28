import { Trello } from "../../index";

const TEST_BOARD_BG_ID = "d9a04f38b919f23b8cc7bf01";

describe("the BoardBackground resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single board background", async () => {
    await trello
      .members("me")
      .boardBackgrounds(TEST_BOARD_BG_ID)
      .getBoardBackground();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/me/boardBackgrounds/${TEST_BOARD_BG_ID}`,
    );
  });

  test("gets multiple board backgrounds", async () => {
    await trello
      .members("me")
      .boardBackgrounds()
      .getBoardBackgrounds({ filter: "custom" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/me/boardBackgrounds`);
    expect(result.url.searchParams.get("filter")).toBe("custom");
  });

  test("uploads a board background", async () => {
    const testFile = new File(["test"], "Test");
    await trello
      .members("me")
      .boardBackgrounds()
      .uploadBoardBackground(testFile);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/members/me/boardBackgrounds`);
    expect(result.config.body.get("file")).toEqual(testFile);
  });

  test("updates a board background", async () => {
    await trello
      .members("me")
      .boardBackgrounds(TEST_BOARD_BG_ID)
      .updateBoardBackground({
        brightness: "dark",
        tile: true,
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/members/me/boardBackgrounds/${TEST_BOARD_BG_ID}`,
    );
    expect(result.url.searchParams.get("brightness")).toBe("dark");
    expect(result.url.searchParams.get("tile")).toBe("true");
  });

  test("deletes the board background", async () => {
    await trello
      .members("me")
      .boardBackgrounds(TEST_BOARD_BG_ID)
      .deleteBoardBackground();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/members/me/boardBackgrounds/${TEST_BOARD_BG_ID}`,
    );
  });
});
