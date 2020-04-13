import { Trello } from "../../index";

const TEST_BOARD_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_BOARD_STAR_ID = "dd7d4048bed6c23daebf1070";

describe("the BoardStar resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single board star", async () => {
    await trello
      .boards(TEST_BOARD_ID)
      .boardStars(TEST_BOARD_STAR_ID)
      .getBoardStar();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/boardStars/${TEST_BOARD_STAR_ID}`,
    );
  });

  test("gets multiple board stars", async () => {
    await trello
      .boards(TEST_BOARD_ID)
      .boardStars()
      .getBoardStars({ filter: "mine" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/boardStars`);
    expect(result.url.searchParams.get("filter")).toBe("mine");
  });

  test("adds a board star", async () => {
    await trello
      .members("me")
      .boardStars()
      .addBoardStar({ idBoard: TEST_BOARD_ID, pos: "bottom" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/members/me/boardStars`);
    expect(result.url.searchParams.get("idBoard")).toBe(TEST_BOARD_ID);
    expect(result.url.searchParams.get("pos")).toBe("bottom");
  });

  test("updates a board star", async () => {
    await trello
      .members("me")
      .boardStars(TEST_BOARD_STAR_ID)
      .updateBoardStar({ pos: "top" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/members/me/boardStars/${TEST_BOARD_STAR_ID}`,
    );
    expect(result.url.searchParams.get("pos")).toBe("top");
  });

  test("moves a board star to a board", async () => {
    await trello
      .members("me")
      .boardStars(TEST_BOARD_STAR_ID)
      .moveToBoard(TEST_BOARD_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/members/me/boardStars/${TEST_BOARD_STAR_ID}/idBoard`,
    );
    expect(result.url.searchParams.get("value")).toBe(TEST_BOARD_ID);
  });

  test("updates the position of a board star", async () => {
    await trello
      .members("me")
      .boardStars(TEST_BOARD_STAR_ID)
      .updatePosition(10);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/members/me/boardStars/${TEST_BOARD_STAR_ID}/pos`,
    );
    expect(result.url.searchParams.get("value")).toBe("10");
  });

  test("deletes the board star", async () => {
    await trello.members("me").boardStars(TEST_BOARD_STAR_ID).deleteBoardStar();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/members/me/boardStars/${TEST_BOARD_STAR_ID}`,
    );
  });
});
