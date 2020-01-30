import { Trello } from "../../index";

const TEST_CARD_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_CHECKLIST_ID = "dd7d4048bed6c23daebf1070";
const TEST_CHECK_ITEM_ID = "60024c859ab0c51945243414";

describe("the CheckItem resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single check item", async () => {
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

  test("gets multiple check items", async () => {
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

  test("throws an error if getting check items states from a non-card resource", async () => {
    expect.assertions(1);

    try {
      await trello
        .checklists(TEST_CHECKLIST_ID)
        .checkItems()
        .getCheckItemStates({ fields: "idCheckItem" });
    } catch (err) {
      expect(err.message).toMatch(/you can only call getCheckItemStates/gi);
    }
  });

  test("gets check items states for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .checkItemStates()
      .getCheckItemStates({ fields: "idCheckItem" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/checkItemStates`,
    );
    expect(result.url.searchParams.get("fields")).toBe("idCheckItem");
  });

  test("adds a new check item", async () => {
    await trello
      .checklists(TEST_CHECKLIST_ID)
      .checkItems()
      .addCheckItem({
        name: "Test",
        checked: false,
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/checklists/${TEST_CHECKLIST_ID}/checkItems`,
    );
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("checked")).toBe("false");
  });

  test("converts a check item to a card", async () => {
    await trello
      .checklists(TEST_CHECKLIST_ID)
      .checkItems(TEST_CHECK_ITEM_ID)
      .convertToCard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/checklists/${TEST_CHECKLIST_ID}/checkItems/${TEST_CHECK_ITEM_ID}/convertToCard`,
    );
  });

  test("throws an error if attempting to update a check item from a non-card resource", async () => {
    expect.assertions(1);

    try {
      await trello
        .checklists(TEST_CHECKLIST_ID)
        .checkItem(TEST_CHECK_ITEM_ID)
        .updateCheckItem({
          name: "Test",
        });
    } catch (err) {
      expect(err.message).toMatch(
        /can only call updateCheckItem\(\) from a card resource/,
      );
    }
  });

  test("throws an error if the idChecklist isn't valid when updating a check item from a card", async () => {
    expect.assertions(1);

    try {
      await trello
        .cards(TEST_CARD_ID)
        .checkItem(TEST_CHECK_ITEM_ID)
        .updateCheckItem({
          name: "Test",
        });
    } catch (err) {
      expect(err.message).toMatch(/must specify the "idChecklist"/);
    }
  });

  test("updates a check item from a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .checkItem(TEST_CHECK_ITEM_ID)
      .updateCheckItem({
        name: "Test",
        idChecklist: TEST_CHECKLIST_ID,
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/checkItem/${TEST_CHECK_ITEM_ID}`,
    );
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("idChecklist")).toBe(TEST_CHECKLIST_ID);
  });

  test("throws an error if the idChecklist isn't valid when updating a check item from a card's checklist", async () => {
    expect.assertions(1);

    try {
      await trello
        .cards(TEST_CARD_ID)
        .checklist("")
        .checkItem(TEST_CHECK_ITEM_ID)
        .updateCheckItem({
          name: "Test",
        });
    } catch (err) {
      expect(err.message).toMatch(/must specify the "idChecklist"/);
    }
  });

  test("updates a check item from a card's checklist", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .checklist(TEST_CHECKLIST_ID)
      .checkItem(TEST_CHECK_ITEM_ID)
      .updateCheckItem({
        name: "Test",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/checklist/${TEST_CHECKLIST_ID}/checkItem/${TEST_CHECK_ITEM_ID}`,
    );
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("idChecklist")).toBe(TEST_CHECKLIST_ID);
  });

  test("updates the name of a check item", async () => {
    await trello
      .checklists(TEST_CHECKLIST_ID)
      .checkItems(TEST_CHECK_ITEM_ID)
      .updateName("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/checklists/${TEST_CHECKLIST_ID}/checkItems/${TEST_CHECK_ITEM_ID}/name`,
    );
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("updates the position of a check item", async () => {
    await trello
      .checklists(TEST_CHECKLIST_ID)
      .checkItems(TEST_CHECK_ITEM_ID)
      .updatePosition("top");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/checklists/${TEST_CHECKLIST_ID}/checkItems/${TEST_CHECK_ITEM_ID}/pos`,
    );
    expect(result.url.searchParams.get("value")).toBe("top");
  });

  test("updates the state of a check item", async () => {
    await trello
      .checklists(TEST_CHECKLIST_ID)
      .checkItems(TEST_CHECK_ITEM_ID)
      .updateState("incomplete");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/checklists/${TEST_CHECKLIST_ID}/checkItems/${TEST_CHECK_ITEM_ID}/state`,
    );
    expect(result.url.searchParams.get("value")).toBe("incomplete");
  });

  test("deletes a check item", async () => {
    await trello
      .checklists(TEST_CHECKLIST_ID)
      .checkItems(TEST_CHECK_ITEM_ID)
      .deleteCheckItem();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/checklists/${TEST_CHECKLIST_ID}/checkItems/${TEST_CHECK_ITEM_ID}`,
    );
  });
});
