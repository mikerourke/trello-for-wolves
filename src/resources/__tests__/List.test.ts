import { Trello } from "../../index";

const TEST_BOARD_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_LIST_ID = "d9a04f38b919f23b8cc7bf01";

describe("the List resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single list", async () => {
    await trello.lists(TEST_LIST_ID).getList();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/lists/${TEST_LIST_ID}`);
  });

  test("gets multiple lists", async () => {
    await trello
      .boards(TEST_BOARD_ID)
      .lists()
      .getLists();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/lists`);
  });

  test("gets nested lists", async () => {
    await trello
      .boards(TEST_BOARD_ID)
      .lists()
      .getNestedLists({ lists: "all" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}`);
    expect(result.url.searchParams.get("lists")).toBe("all");
  });

  test("gets filtered lists", async () => {
    await trello
      .boards(TEST_BOARD_ID)
      .lists()
      .getListsFilteredBy("closed");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/lists/closed`);
  });

  test("gets the field value for a list", async () => {
    await trello
      .boards(TEST_BOARD_ID)
      .lists(TEST_LIST_ID)
      .getFieldValue("closed");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/lists/${TEST_LIST_ID}/closed`,
    );
  });

  test("throws an error if the idBoard isn't present when adding a list", async () => {
    expect.assertions(1);

    try {
      await trello.lists().addList({
        name: "Test",
      });
    } catch (err) {
      expect(err.message).toMatch(/must specify the "idBoard"/);
    }
  });

  test("adds a new list", async () => {
    await trello.lists().addList({
      name: "Test",
      idBoard: TEST_BOARD_ID,
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/lists`);
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("idBoard")).toBe(TEST_BOARD_ID);
  });

  test("adds a new list from a board", async () => {
    await trello
      .boards(TEST_BOARD_ID)
      .lists()
      .addList({
        name: "Test",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/lists`);
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("idBoard")).toBe(TEST_BOARD_ID);
  });

  test("updates a list", async () => {
    await trello.lists(TEST_LIST_ID).updateList({
      name: "Test",
      closed: false,
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/lists/${TEST_LIST_ID}`);
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("closed")).toBe("false");
  });

  test("updates the closed status of a list", async () => {
    await trello.lists(TEST_LIST_ID).updateClosedStatus(false);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/lists/${TEST_LIST_ID}/closed`);
    expect(result.url.searchParams.get("value")).toBe("false");
  });

  test("moves the list to a different board", async () => {
    await trello.lists(TEST_LIST_ID).moveToBoard(TEST_BOARD_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/lists/${TEST_LIST_ID}/idBoard`);
    expect(result.url.searchParams.get("value")).toBe(TEST_BOARD_ID);
  });

  test("updates the name of a list", async () => {
    await trello.lists(TEST_LIST_ID).updateName("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/lists/${TEST_LIST_ID}/name`);
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("updates the position of a list", async () => {
    await trello.lists(TEST_LIST_ID).updatePosition(10);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/lists/${TEST_LIST_ID}/pos`);
    expect(result.url.searchParams.get("value")).toBe("10");
  });

  test(`updates the soft limit of a list when value is "none"`, async () => {
    await trello.lists(TEST_LIST_ID).updateSoftLimit("none");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/lists/${TEST_LIST_ID}/softLimit`);
    expect(result.url.searchParams.get("value")).toBe("");
  });

  test("updates the soft limit of a list when value is a number", async () => {
    await trello.lists(TEST_LIST_ID).updateSoftLimit(10);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/lists/${TEST_LIST_ID}/softLimit`);
    expect(result.url.searchParams.get("value")).toBe("10");
  });

  test("updates the subscribed status of a list", async () => {
    await trello.lists(TEST_LIST_ID).updateSubscribed(false);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/lists/${TEST_LIST_ID}/subscribed`);
    expect(result.url.searchParams.get("value")).toBe("false");
  });

  test("archives all cards on a list", async () => {
    await trello.lists(TEST_LIST_ID).archiveAllCards();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/lists/${TEST_LIST_ID}/archiveAllCards`,
    );
  });

  test("moves all cards from a list to a different list or board", async () => {
    await trello.lists(TEST_LIST_ID).moveAllCards({
      idBoard: TEST_BOARD_ID,
      idList: TEST_LIST_ID,
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/lists/${TEST_LIST_ID}/moveAllCards`);
    expect(result.url.searchParams.get("idBoard")).toBe(TEST_BOARD_ID);
    expect(result.url.searchParams.get("idList")).toBe(TEST_LIST_ID);
  });

  test("gets the actions for a list", async () => {
    await trello
      .lists(TEST_LIST_ID)
      .actions()
      .getActions();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/lists/${TEST_LIST_ID}/actions`);
  });

  test("gets the board for a list", async () => {
    await trello
      .lists(TEST_LIST_ID)
      .board()
      .getBoard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/lists/${TEST_LIST_ID}/board`);
  });

  test("gets the cards for a list", async () => {
    await trello
      .lists(TEST_LIST_ID)
      .cards()
      .getCards();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/lists/${TEST_LIST_ID}/cards`);
  });
});
