import { Trello } from "../../index";

const TEST_BOARD_BG_ID = "d9a04f38b919f23b8cc7bf01";

describe("the Board Background resource", () => {
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
});
