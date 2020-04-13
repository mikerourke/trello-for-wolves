import { Trello } from "../../index";

const TEST_BOARD_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_CHILD_ID = "dd7d4048bed6c23daebf1070";

describe("the Board resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single board", async () => {
    await trello.boards(TEST_BOARD_ID).getBoard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}`);
  });

  test("gets nested data for a single board", async () => {
    await trello.boards(TEST_BOARD_ID).getBoard({
      actions: "all",
      actionFields: "all",
      cards: "all",
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}`);
    expect(result.url.searchParams.get("actions")).toBe("all");
    expect(result.url.searchParams.get("action_fields")).toBe("all");
    expect(result.url.searchParams.get("cards")).toBe("all");
  });

  test("gets multiple boards", async () => {
    await trello.members("me").boards().getBoards({
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

  test("gets filtered boards", async () => {
    await trello.members("me").boards().getBoardsFilteredBy("closed");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe("/1/members/me/boards");
    expect(result.url.searchParams.get("filter")).toBe("closed");
  });

  test("gets a board field", async () => {
    await trello.boards(TEST_BOARD_ID).getFieldValue("url");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/url`);
  });

  test("gets board plugins", async () => {
    await trello.boards(TEST_BOARD_ID).getBoardPlugins();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/boardPlugins`);
  });

  test("gets board tags", async () => {
    await trello.boards(TEST_BOARD_ID).getTags();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/idTags`);
  });

  test("throws an error if getting new billable guests from a non-organization resource", async () => {
    try {
      await trello.boards(TEST_BOARD_ID).getIfHasNewBillableGuests();
    } catch (err) {
      expect(err.message).toMatch(
        /You can only call getIfHasNewBillableGuests/gi,
      );
    }
  });

  test("gets if the board has new billable guests in an organization", async () => {
    const TEST_ORGANIZATION_ID = "49944289a59febdcd8180fa2";
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .boards(TEST_BOARD_ID)
      .getIfHasNewBillableGuests();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/newBillableGuests/${TEST_BOARD_ID}`,
    );
  });

  test("adds a new board", async () => {
    await trello.boards().addBoard({
      name: "Test Board",
      defaultLabels: false,
      defaultLists: true,
      idOrganization: TEST_CHILD_ID,
      keepFromSource: "none",
      powerUps: ["cardAging", "recap"],
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
    expect(result.url.searchParams.get("keepFromSource")).toBe("none");
    expect(result.url.searchParams.get("powerUps")).toBe("cardAging,recap");
    expect(result.url.searchParams.get("prefs_permissionLevel")).toBe(
      "private",
    );
  });

  test("enables a board plugin on a board", async () => {
    await trello.boards(TEST_BOARD_ID).enableBoardPlugin(TEST_CHILD_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/boardPlugins`);
    expect(result.url.searchParams.get("idPlugin")).toBe(TEST_CHILD_ID);
  });

  test("enables a power up on a board", async () => {
    await trello.boards(TEST_BOARD_ID).enablePowerUp("calendar");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/powerUps`);
    expect(result.url.searchParams.get("value")).toBe("calendar");
  });

  test("adds tag to a board", async () => {
    await trello.boards(TEST_BOARD_ID).addTag(TEST_CHILD_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/idTags`);
    expect(result.url.searchParams.get("value")).toBe(TEST_CHILD_ID);
  });

  test("generates a calendar key on a board", async () => {
    await trello.boards(TEST_BOARD_ID).generateCalendarKey();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/calendarKey/generate`,
    );
  });

  test("generates an email key on a board", async () => {
    await trello.boards(TEST_BOARD_ID).generateEmailKey();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/emailKey/generate`,
    );
  });

  test("marks the board as viewed", async () => {
    await trello.boards(TEST_BOARD_ID).markAsViewed();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/markAsViewed`);
  });

  test("updates a board", async () => {
    await trello.boards(TEST_BOARD_ID).updateBoard({
      name: "New Name",
      prefs: {
        selfJoin: false,
      },
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}`);
    expect(result.url.searchParams.get("name")).toBe("New Name");
    expect(result.url.searchParams.get("prefs/selfJoin")).toBe("false");
  });

  test("updates the closed status of a board", async () => {
    await trello.boards(TEST_BOARD_ID).updateClosedStatus(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/closed`);
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("updates the description for a board", async () => {
    await trello.boards(TEST_BOARD_ID).updateDescription("New Description");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/desc`);
    expect(result.url.searchParams.get("value")).toBe("New Description");
  });

  test("updates the organization for a board", async () => {
    await trello.boards(TEST_BOARD_ID).moveToOrganization(TEST_CHILD_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/idOrganization`,
    );
    expect(result.url.searchParams.get("value")).toBe(TEST_CHILD_ID);
  });

  test("updates the label name color for a board", async () => {
    await trello.boards(TEST_BOARD_ID).updateLabelNameForColor("blue", "Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/labelNames/blue`,
    );
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("updates the board name", async () => {
    await trello.boards(TEST_BOARD_ID).updateName("Test Board");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/name`);
    expect(result.url.searchParams.get("value")).toBe("Test Board");
  });

  test("updates the subscribed status for the board", async () => {
    await trello.boards(TEST_BOARD_ID).updateSubscribed(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/subscribed`);
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("updates the board's background pref", async () => {
    await trello.boards(TEST_BOARD_ID).prefs().updateBackground("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/prefs/background`,
    );
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("updates the board's calendar feed pref", async () => {
    await trello.boards(TEST_BOARD_ID).prefs().updateCalendarFeedEnabled(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/prefs/calendarFeedEnabled`,
    );
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("updates the board's card aging pref", async () => {
    await trello.boards(TEST_BOARD_ID).prefs().updateCardAging("pirate");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/prefs/cardAging`,
    );
    expect(result.url.searchParams.get("value")).toBe("pirate");
  });

  test("updates the board's card covers pref", async () => {
    await trello.boards(TEST_BOARD_ID).prefs().updateCardCovers(false);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/prefs/cardCovers`,
    );
    expect(result.url.searchParams.get("value")).toBe("false");
  });

  test("updates the board's comments pref", async () => {
    await trello.boards(TEST_BOARD_ID).prefs().updateComments("public");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/prefs/comments`,
    );
    expect(result.url.searchParams.get("value")).toBe("public");
  });

  test("updates the board's invitations pref", async () => {
    await trello.boards(TEST_BOARD_ID).prefs().updateInvitations("admins");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/prefs/invitations`,
    );
    expect(result.url.searchParams.get("value")).toBe("admins");
  });

  test("updates the board's permissions level pref", async () => {
    await trello.boards(TEST_BOARD_ID).prefs().updatePermissionLevel("private");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/prefs/permissionLevel`,
    );
    expect(result.url.searchParams.get("value")).toBe("private");
  });

  test("updates the board's self join pref", async () => {
    await trello.boards(TEST_BOARD_ID).prefs().updateSelfJoin(false);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/prefs/selfJoin`,
    );
    expect(result.url.searchParams.get("value")).toBe("false");
  });

  test("updates the board's voting pref", async () => {
    await trello.boards(TEST_BOARD_ID).prefs().updateVoting("disabled");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/prefs/voting`);
    expect(result.url.searchParams.get("value")).toBe("disabled");
  });

  test("deletes the board", async () => {
    await trello.boards(TEST_BOARD_ID).deleteBoard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}`);
  });

  test("disables the board plugin for a board", async () => {
    await trello.boards(TEST_BOARD_ID).disableBoardPlugin(TEST_CHILD_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/boardPlugins/${TEST_CHILD_ID}`,
    );
  });

  test("disables the power up for a board", async () => {
    await trello.boards(TEST_BOARD_ID).disablePowerUp("recap");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/powerUps/recap`,
    );
  });

  test("gets the actions for a board", async () => {
    await trello.boards(TEST_BOARD_ID).actions().getActions({
      memberFields: "all",
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/actions`);
    expect(result.url.searchParams.get("member_fields")).toBe("all");
  });

  test("gets a specific action for a board", async () => {
    await trello.boards(TEST_BOARD_ID).actions(TEST_CHILD_ID).getAction({
      memberFields: "all",
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/actions/${TEST_CHILD_ID}`,
    );
    expect(result.url.searchParams.get("member_fields")).toBe("all");
  });

  test("gets the board stars for a board", async () => {
    await trello.boards(TEST_BOARD_ID).boardStars().getBoardStars({
      filter: "mine",
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/boardStars`);
    expect(result.url.searchParams.get("filter")).toBe("mine");
  });

  test("gets the cards for a board", async () => {
    await trello.boards(TEST_BOARD_ID).cards().getCards();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/cards`);
  });

  test("gets a specific card for a board", async () => {
    await trello.boards(TEST_BOARD_ID).cards(TEST_CHILD_ID).getCard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/cards/${TEST_CHILD_ID}`,
    );
  });

  test("gets the checklists for a board", async () => {
    await trello.boards(TEST_BOARD_ID).checklists().getChecklists();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/checklists`);
  });

  test("gets a specific checklist for a board", async () => {
    await trello.boards(TEST_BOARD_ID).checklists(TEST_CHILD_ID).getChecklist();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/checklists/${TEST_CHILD_ID}`,
    );
  });

  test("gets the custom fields for a board", async () => {
    await trello.boards(TEST_BOARD_ID).customFields().getCustomFields();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/customFields`);
  });

  test("gets the labels for a board", async () => {
    await trello.boards(TEST_BOARD_ID).labels().getLabels();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/labels`);
  });

  test("gets the specific label for a board", async () => {
    await trello.boards(TEST_BOARD_ID).labels(TEST_CHILD_ID).getLabel();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/labels/${TEST_CHILD_ID}`,
    );
  });

  test("gets the specific list for a board", async () => {
    await trello.boards(TEST_BOARD_ID).lists(TEST_CHILD_ID).getLists();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/lists/${TEST_CHILD_ID}`,
    );
  });

  test("gets the lists for a board", async () => {
    await trello.boards(TEST_BOARD_ID).lists().getLists();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/lists`);
  });

  test("gets the members for a board", async () => {
    await trello.boards(TEST_BOARD_ID).members().getMembers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/members`);
  });

  test("gets a specific member for a board", async () => {
    await trello.boards(TEST_BOARD_ID).members(TEST_CHILD_ID).getMember();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/members/${TEST_CHILD_ID}`,
    );
  });

  test("gets the members invited for a board", async () => {
    await trello.boards(TEST_BOARD_ID).membersInvited().getMembers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/membersInvited`,
    );
  });

  test("gets the memberships for a board", async () => {
    await trello.boards(TEST_BOARD_ID).memberships().getMemberships();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/memberships`);
  });

  test("gets the specific membership for a board", async () => {
    await trello
      .boards(TEST_BOARD_ID)
      .memberships(TEST_CHILD_ID)
      .getMembership();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/memberships/${TEST_CHILD_ID}`,
    );
  });

  test("gets the myPrefs for a board", async () => {
    await trello.boards(TEST_BOARD_ID).myPrefs().getMyPrefs();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/myPrefs`);
  });

  test("gets the organization for a board", async () => {
    await trello.boards(TEST_BOARD_ID).organization().getOrganization();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/organization`);
  });

  test("gets the plugins for a board", async () => {
    await trello.boards(TEST_BOARD_ID).plugins().getPlugins();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/plugins`);
  });
});
