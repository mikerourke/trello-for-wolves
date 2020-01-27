import { Trello } from "../../index";

const TEST_PARENT_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_CHILD_ID = "dd7d4048bed6c23daebf1070";

describe("the Board resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("configures the fetch call for a single board", async () => {
    await trello.boards(TEST_PARENT_ID).getBoard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}`);
  });

  test("configures the fetch call for getting multiple boards", async () => {
    await trello
      .members("me")
      .boards()
      .getBoards({
        fields: "all",
        filter: "all",
        lists: "all",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe("/1/members/me/boards");
    expect(result.url.searchParams.get("fields")).toBe("all");
    expect(result.url.searchParams.get("filter")).toBe("all");
    expect(result.url.searchParams.get("lists")).toBe("all");
  });

  test("configures the fetch call for getting nested boards", async () => {
    await trello
      .members("me")
      .boards()
      .getNestedBoards({
        boards: "closed",
        boardActions: "all",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe("/1/members/me");
    expect(result.url.searchParams.get("boards")).toBe("closed");
    expect(result.url.searchParams.get("board_actions")).toBe("all");
  });

  test("configures the fetch call for filtered boards", async () => {
    await trello
      .members("me")
      .boards()
      .getBoardsFilteredBy("closed");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe("/1/members/me/boards");
    expect(result.url.searchParams.get("filter")).toBe("closed");
  });

  test("configures the fetch call for getting a board field", async () => {
    await trello.boards(TEST_PARENT_ID).getFieldValue("url");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/url`);
  });

  test("configures the fetch call for getting board plugins", async () => {
    await trello.boards(TEST_PARENT_ID).getBoardPlugins();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/boardPlugins`,
    );
  });

  test("configures the fetch call for getting board tags", async () => {
    await trello.boards(TEST_PARENT_ID).getTags();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/idTags`);
  });

  test("configures the fetch call to add a new board", async () => {
    await trello.boards().addBoard({
      name: "Test Board",
      defaultLabels: false,
      defaultLists: true,
      idOrganization: TEST_CHILD_ID,
      prefs: {
        permissionLevel: "private",
      },
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe("/1/boards");
    expect(result.url.searchParams.get("name")).toBe("Test Board");
    expect(result.url.searchParams.get("defaultLabels")).toBe("false");
    expect(result.url.searchParams.get("defaultLists")).toBe("true");
    expect(result.url.searchParams.get("idOrganization")).toBe(TEST_CHILD_ID);
    expect(result.url.searchParams.get("prefs_permissionLevel")).toBe(
      "private",
    );
  });

  test("configures the fetch call to add a new board plugin", async () => {
    await trello.boards(TEST_PARENT_ID).enableBoardPlugin(TEST_CHILD_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/boardPlugins`,
    );
    expect(result.url.searchParams.get("idPlugin")).toBe(TEST_CHILD_ID);
  });

  test("configures the fetch call to add a new power up to a board", async () => {
    await trello.boards(TEST_PARENT_ID).addPowerUp("calendar");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/powerUps`);
    expect(result.url.searchParams.get("value")).toBe("calendar");
  });

  test("configures the fetch call to add tags to a board", async () => {
    await trello.boards(TEST_PARENT_ID).addTags(TEST_CHILD_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/idTags`);
    expect(result.url.searchParams.get("value")).toBe(TEST_CHILD_ID);
  });

  test("configures the fetch call to generate a calendar key on a board", async () => {
    await trello.boards(TEST_PARENT_ID).generateCalendarKey();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/calendarKey/generate`,
    );
  });

  test("configures the fetch call to generate an email key on a board", async () => {
    await trello.boards(TEST_PARENT_ID).generateEmailKey();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/emailKey/generate`,
    );
  });

  test("configures the fetch call to mark the board as viewed", async () => {
    await trello.boards(TEST_PARENT_ID).markAsViewed();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/markAsViewed`,
    );
  });

  test("configures the fetch call to update a board", async () => {
    await trello.boards(TEST_PARENT_ID).updateBoard({
      name: "New Name",
      prefs: {
        selfJoin: false,
      },
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}`);
    expect(result.url.searchParams.get("name")).toBe("New Name");
    expect(result.url.searchParams.get("prefs/selfJoin")).toBe("false");
  });

  test("throws an error if the params object is empty", async () => {
    expect.assertions(1);

    try {
      await trello.boards(TEST_PARENT_ID).updateBoard({} as any);
    } catch (err) {
      expect(err.message).toMatch(/at least one param/gi);
    }
  });

  test("configures the fetch call to update the closed status of a board", async () => {
    await trello.boards(TEST_PARENT_ID).updateClosedStatus(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/closed`);
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("configures the fetch call to update the description for a board", async () => {
    await trello.boards(TEST_PARENT_ID).updateDescription("New Description");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/desc`);
    expect(result.url.searchParams.get("value")).toBe("New Description");
  });

  test("configures the fetch call to update the organization for a board", async () => {
    await trello.boards(TEST_PARENT_ID).moveToOrganization(TEST_CHILD_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/idOrganization`,
    );
    expect(result.url.searchParams.get("value")).toBe(TEST_CHILD_ID);
  });

  test("configures the fetch call to update the label name color for a board", async () => {
    await trello.boards(TEST_PARENT_ID).updateLabelNameForColor("blue", "Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/labelNames/blue`,
    );
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("configures the fetch call to update the board name", async () => {
    await trello.boards(TEST_PARENT_ID).updateName("Test Board");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/name`);
    expect(result.url.searchParams.get("value")).toBe("Test Board");
  });

  test("configures the fetch call to update the subscribed status for the board", async () => {
    await trello.boards(TEST_PARENT_ID).updateSubscribed(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/subscribed`);
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("configures the fetch call to update the board's background pref", async () => {
    await trello.boards(TEST_PARENT_ID).updateBackground("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/prefs/background`,
    );
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("configures the fetch call to update the board's calendar feed pref", async () => {
    await trello.boards(TEST_PARENT_ID).updateCalendarFeedEnabled(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/prefs/calendarFeedEnabled`,
    );
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("configures the fetch call to update the board's card aging pref", async () => {
    await trello.boards(TEST_PARENT_ID).updateCardAging("pirate");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/prefs/cardAging`,
    );
    expect(result.url.searchParams.get("value")).toBe("pirate");
  });

  test("configures the fetch call to update the board's card covers pref", async () => {
    await trello.boards(TEST_PARENT_ID).updateCardCovers(false);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/prefs/cardCovers`,
    );
    expect(result.url.searchParams.get("value")).toBe("false");
  });

  test("configures the fetch call to update the board's comments pref", async () => {
    await trello.boards(TEST_PARENT_ID).updateComments("public");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/prefs/comments`,
    );
    expect(result.url.searchParams.get("value")).toBe("public");
  });

  test("configures the fetch call to update the board's invitations pref", async () => {
    await trello.boards(TEST_PARENT_ID).updateInvitations("admins");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/prefs/invitations`,
    );
    expect(result.url.searchParams.get("value")).toBe("admins");
  });

  test("configures the fetch call to update the board's permissions level pref", async () => {
    await trello.boards(TEST_PARENT_ID).updatePermissionLevel("private");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/prefs/permissionLevel`,
    );
    expect(result.url.searchParams.get("value")).toBe("private");
  });

  test("configures the fetch call to update the board's self join pref", async () => {
    await trello.boards(TEST_PARENT_ID).updateSelfJoin(false);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/prefs/selfJoin`,
    );
    expect(result.url.searchParams.get("value")).toBe("false");
  });

  test("configures the fetch call to update the board's voting pref", async () => {
    await trello.boards(TEST_PARENT_ID).updateVoting("disabled");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/prefs/voting`,
    );
    expect(result.url.searchParams.get("value")).toBe("disabled");
  });

  test("configures the fetch call to delete the board", async () => {
    await trello.boards(TEST_PARENT_ID).deleteBoard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}`);
  });

  test("configures the fetch call to disable the board plugin", async () => {
    await trello.boards(TEST_PARENT_ID).disableBoardPlugin(TEST_CHILD_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/boardPlugins/${TEST_CHILD_ID}`,
    );
  });

  test("configures the fetch call to delete the board power up", async () => {
    await trello.boards(TEST_PARENT_ID).deletePowerUp("recap");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/powerUps/recap`,
    );
  });

  test("configures the fetch call for getting the actions for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .actions()
      .getActions({
        memberFields: "all",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/actions`);
    expect(result.url.searchParams.get("member_fields")).toBe("all");
  });

  test("configures the fetch call for getting the board stars for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .boardStars()
      .getBoardStars({
        filter: "mine",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/boardStars`);
    expect(result.url.searchParams.get("filter")).toBe("mine");
  });

  test("configures the fetch call for getting the cards for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .cards()
      .getCards();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/cards`);
  });

  test("configures the fetch call for getting a specific card for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .cards(TEST_CHILD_ID)
      .getCard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/cards/${TEST_CHILD_ID}`,
    );
  });

  test("configures the fetch call for getting the checklists for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .checklists()
      .getChecklists();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/checklists`);
  });

  test("configures the fetch call for getting the custom fields for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .customFields()
      .getCustomFields();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/customFields`,
    );
  });

  test("configures the fetch call for getting the labels for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .labels()
      .getLabels();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/labels`);
  });

  test("configures the fetch call for getting the specific label for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .labels(TEST_CHILD_ID)
      .getLabel();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/labels/${TEST_CHILD_ID}`,
    );
  });

  test("configures the fetch call for getting the lists for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .lists()
      .getLists();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/lists`);
  });

  test("configures the fetch call for getting the members for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .members()
      .getMembers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/members`);
  });

  test("configures the fetch call for getting a specific member for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .members(TEST_CHILD_ID)
      .getMember();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/members/${TEST_CHILD_ID}`,
    );
  });

  test("configures the fetch call for getting the members invited for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .membersInvited()
      .getMembers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/membersInvited`,
    );
  });

  test("configures the fetch call for getting the memberships for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .memberships()
      .getMemberships();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/memberships`);
  });

  test("configures the fetch call for getting the specific membership for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .memberships(TEST_CHILD_ID)
      .getMembership();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/memberships/${TEST_CHILD_ID}`,
    );
  });

  test("configures the fetch call for getting the myPrefs for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .myPrefs()
      .getMyPrefs();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/myPrefs`);
  });

  test("configures the fetch call for getting the organization for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .organization()
      .getOrganization();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/organization`,
    );
  });

  test("configures the fetch call for getting the plugins for a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .plugins()
      .getPlugins();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/plugins`);
  });
});
