import { Trello } from "../../index";

const TEST_BOARD_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_ACTION_ID = "60024c859ab0c51945243414";

describe("the Action resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets the URL for an action endpoint", () => {
    const result = trello
      .actions(TEST_ACTION_ID)
      .urlFor()
      .getAction({ display: true });

    expect(result).toBe(`/actions/${TEST_ACTION_ID}?display=true`);
  });

  test("gets a single action", async () => {
    await trello.actions(TEST_ACTION_ID).getAction({
      display: true,
      entities: true,
      fields: ["data", "date"],
      member: true,
      memberFields: "all",
      memberCreator: true,
      memberCreatorFields: ["bioData", "status", "url"],
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}`);
    expect(result.url.searchParams.get("display")).toBe("true");
    expect(result.url.searchParams.get("entities")).toBe("true");
    expect(result.url.searchParams.get("fields")).toBe("data,date");
    expect(result.url.searchParams.get("member")).toBe("true");
    expect(result.url.searchParams.get("member_fields")).toBe("all");
    expect(result.url.searchParams.get("memberCreator")).toBe("true");
    expect(result.url.searchParams.get("memberCreator_fields")).toBe(
      "bioData,status,url",
    );
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

  test("gets the action's reactions summary", async () => {
    await trello.actions(TEST_ACTION_ID).getReactionsSummary();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/actions/${TEST_ACTION_ID}/reactionsSummary`,
    );
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
