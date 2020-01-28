import { Trello } from "../../index";

const TEST_ACTION_ID = "60024c859ab0c51945243414";
const TEST_BOARD_ID = "d9a04f38b919f23b8cc7bf01";

describe("the Action resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("throws an error if attempting to get a single action without an ID", async () => {
    expect.assertions(1);

    try {
      await trello.actions().getAction();
    } catch (err) {
      expect(err.message).toMatch(/without specifying an id/gi);
    }
  });

  test("gets a single action", async () => {
    await trello.actions(TEST_ACTION_ID).getAction();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}`);
  });

  test("gets multiple actions", async () => {
    await trello
      .boards(TEST_BOARD_ID)
      .actions()
      .getActions({
        fields: "all",
        format: "count",
        memberFields: "all",
        memberCreatorFields: "all",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/actions`);
    expect(result.url.searchParams.get("fields")).toBe("all");
    expect(result.url.searchParams.get("format")).toBe("count");
    expect(result.url.searchParams.get("member_fields")).toBe("all");
    expect(result.url.searchParams.get("memberCreator_fields")).toBe("all");
  });

  test("gets nested actions", async () => {
    await trello
      .boards(TEST_BOARD_ID)
      .actions()
      .getNestedActions({
        actions: "all",
        actionsLimit: 10,
        actionMemberCreatorFields: "all",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}`);
    expect(result.url.searchParams.get("actions")).toBe("all");
    expect(result.url.searchParams.get("actions_limit")).toBe("10");
    expect(result.url.searchParams.get("action_memberCreator_fields")).toBe(
      "all",
    );
  });

  test("gets an action field", async () => {
    await trello.actions(TEST_ACTION_ID).getFieldValue("idMemberCreator");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/actions/${TEST_ACTION_ID}/idMemberCreator`,
    );
  });

  test("gets the action's display", async () => {
    await trello.actions(TEST_ACTION_ID).getDisplay();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/display`);
  });

  test("gets the action's entities", async () => {
    await trello.actions(TEST_ACTION_ID).getEntities();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/entities`);
  });

  test("updates the action", async () => {
    await trello.actions(TEST_ACTION_ID).updateAction({ text: "Test" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}`);
    expect(result.url.searchParams.get("text")).toBe("Test");
  });

  test("updates the action's text", async () => {
    await trello.actions(TEST_ACTION_ID).updateText("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/text`);
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("deletes an action", async () => {
    await trello.actions(TEST_ACTION_ID).deleteAction();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}`);
  });

  test("gets the board for an action", async () => {
    await trello
      .actions(TEST_ACTION_ID)
      .board()
      .getBoard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/board`);
  });

  test("gets the card for an action", async () => {
    await trello
      .actions(TEST_ACTION_ID)
      .card()
      .getCard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/card`);
  });

  test("gets the list for an action", async () => {
    await trello
      .actions(TEST_ACTION_ID)
      .list()
      .getList();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/list`);
  });

  test("gets the member for an action", async () => {
    await trello
      .actions(TEST_ACTION_ID)
      .member()
      .getMember();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/member`);
  });

  test("gets the member creator for an action", async () => {
    await trello
      .actions(TEST_ACTION_ID)
      .memberCreator()
      .getMember();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/actions/${TEST_ACTION_ID}/memberCreator`,
    );
  });

  test("gets the organization for an action", async () => {
    await trello
      .actions(TEST_ACTION_ID)
      .organization()
      .getOrganization();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/actions/${TEST_ACTION_ID}/organization`,
    );
  });
});
