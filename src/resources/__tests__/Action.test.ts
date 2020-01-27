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

  test("configures the fetch call for a single action", () => {
    trello.actions(TEST_ACTION_ID).getAction();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}`);
  });

  test("configures the fetch call for getting multiple actions", () => {
    trello
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

  test("configures the fetch call for getting nested actions", () => {
    trello
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

  test("configures the fetch call for getting an action field", () => {
    trello.actions(TEST_ACTION_ID).getFieldValue("idMemberCreator");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/actions/${TEST_ACTION_ID}/idMemberCreator`,
    );
  });

  test("configures the fetch call for getting the action's display", () => {
    trello.actions(TEST_ACTION_ID).getDisplay();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/display`);
  });

  test("configures the fetch call for getting the action's entities", () => {
    trello.actions(TEST_ACTION_ID).getEntities();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/entities`);
  });

  test("configures the fetch call for updating the action", () => {
    trello.actions(TEST_ACTION_ID).updateAction({ text: "Test" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}`);
    expect(result.url.searchParams.get("text")).toBe("Test");
  });

  test("configures the fetch call for updating the action's text", () => {
    trello.actions(TEST_ACTION_ID).updateText("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/text`);
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("configures the fetch call for deleting an action", () => {
    trello.actions(TEST_ACTION_ID).deleteAction();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}`);
  });

  test("configures the fetch call for getting the board for an action", () => {
    trello
      .actions(TEST_ACTION_ID)
      .board()
      .getBoard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/board`);
  });

  test("configures the fetch call for getting the card for an action", () => {
    trello
      .actions(TEST_ACTION_ID)
      .card()
      .getCard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/card`);
  });

  test("configures the fetch call for getting the list for an action", () => {
    trello
      .actions(TEST_ACTION_ID)
      .list()
      .getList();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/list`);
  });

  test("configures the fetch call for getting the member for an action", () => {
    trello
      .actions(TEST_ACTION_ID)
      .member()
      .getMember();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/member`);
  });

  test("configures the fetch call for getting the member creator for an action", () => {
    trello
      .actions(TEST_ACTION_ID)
      .memberCreator()
      .getMember();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/actions/${TEST_ACTION_ID}/memberCreator`,
    );
  });

  test("configures the fetch call for getting the organization for an action", () => {
    trello
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
