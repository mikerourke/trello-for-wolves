import { Trello } from "../../index";

const TEST_BOARD_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_CARD_ID = "dd7d4048bed6c23daebf1070";
const TEST_CHECKLIST_ID = "60024c859ab0c51945243414";
const TEST_CHECK_ITEM_ID = "7b7d4277b92de38387261207";

describe("the Checklist resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single checklist", async () => {
    await trello.checklists(TEST_CHECKLIST_ID).getChecklist();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/checklists/${TEST_CHECKLIST_ID}`);
  });

  test("gets multiple checklists", async () => {
    await trello
      .boards(TEST_BOARD_ID)
      .checklists()
      .getChecklists();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/checklists`);
  });

  test("gets nested checklists", async () => {
    await trello
      .boards(TEST_BOARD_ID)
      .checklists()
      .getNestedChecklists({ checklists: "all" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}`);
    expect(result.url.searchParams.get("checklists")).toBe("all");
  });

  test("gets the field value for a checklist", async () => {
    await trello.checklists(TEST_CHECKLIST_ID).getFieldValue("name");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/checklists/${TEST_CHECKLIST_ID}/name`);
  });

  test("throws an error if the idCard isn't present when adding a checklist", async () => {
    expect.assertions(1);

    try {
      await trello.checklists().addChecklist({
        name: "Test",
      });
    } catch (err) {
      expect(err.message).toMatch(/must specify the "idCard"/);
    }
  });

  test("adds a new checklist", async () => {
    await trello.checklists().addChecklist({
      name: "Test",
      idCard: TEST_CARD_ID,
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/checklists`);
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("idCard")).toBe(TEST_CARD_ID);
  });

  test("adds a new checklist from a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .checklists()
      .addChecklist({
        name: "Test",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/checklists`);
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("idCard")).toBe(TEST_CARD_ID);
  });

  test("updates a checklist", async () => {
    await trello.checklists(TEST_CHECKLIST_ID).updateChecklist({
      name: "Test",
      pos: "top",
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/checklists/${TEST_CHECKLIST_ID}`);
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("pos")).toBe("top");
  });

  test("updates the name of a checklist", async () => {
    await trello.checklists(TEST_CHECKLIST_ID).updateName("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/checklists/${TEST_CHECKLIST_ID}/name`);
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("updates the position of a checklist", async () => {
    await trello.checklists(TEST_CHECKLIST_ID).updatePosition(10);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/checklists/${TEST_CHECKLIST_ID}/pos`);
    expect(result.url.searchParams.get("value")).toBe("10");
  });

  test("deletes a checklist", async () => {
    await trello.checklists(TEST_CHECKLIST_ID).deleteChecklist();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(`/1/checklists/${TEST_CHECKLIST_ID}`);
  });

  test("gets the board for a checklist", async () => {
    await trello
      .checklists(TEST_CHECKLIST_ID)
      .board()
      .getBoard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/checklists/${TEST_CHECKLIST_ID}/board`,
    );
  });

  test("gets the cards for a checklist", async () => {
    await trello
      .checklists(TEST_CHECKLIST_ID)
      .cards()
      .getCard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/checklists/${TEST_CHECKLIST_ID}/cards`,
    );
  });

  test("gets a single check item for a checklist", async () => {
    await trello
      .checklists(TEST_CHECKLIST_ID)
      .checkItems(TEST_CHECK_ITEM_ID)
      .getCheckItem();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/checklists/${TEST_CHECKLIST_ID}/checkItems/${TEST_CHECK_ITEM_ID}`,
    );
  });

  test("gets the check items for a checklist", async () => {
    await trello
      .checklists(TEST_CHECKLIST_ID)
      .checkItems()
      .getCheckItems();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/checklists/${TEST_CHECKLIST_ID}/checkItems`,
    );
  });
});
