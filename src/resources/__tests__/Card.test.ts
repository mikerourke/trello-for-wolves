import { Trello } from "../../index";

const TEST_PARENT_ID = "dd7d4048bed6c23daebf1070";
const TEST_CARD_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_CHILD_ID = "a9e2418d8b71eb8e5ec6d5e8";

describe("the Card resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single card", async () => {
    await trello.cards(TEST_CARD_ID).getCard({
      pluginData: true,
      checkItemStates: true,
      customFieldItems: true,
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}`);
    expect(result.url.searchParams.get("pluginData")).toBe("true");
    expect(result.url.searchParams.get("checkItemStates")).toBe("true");
    expect(result.url.searchParams.get("customFieldItems")).toBe("true");
  });

  test("gets nested data for a single card", async () => {
    await trello.cards(TEST_CARD_ID).getCard({
      list: true,
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}`);
    expect(result.url.searchParams.get("list")).toBe("true");
  });

  test("gets multiple cards", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .cards()
      .getCards();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/cards`);
  });

  test("gets filtered cards", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .cards()
      .getCardsFilteredBy("all");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/cards/all`);
  });

  test("gets the field value for a card", async () => {
    await trello.cards(TEST_CARD_ID).getFieldValue("name");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/name`);
  });

  test("gets the plugin data for a card", async () => {
    await trello.cards(TEST_CARD_ID).getPluginData();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/pluginData`);
  });

  test("gets filtered cards", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .cards()
      .getCardsFilteredBy("all");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/cards/all`);
  });

  test("throws an error if the ID isn't specified when adding a card to a list", async () => {
    expect.assertions(1);

    try {
      await trello
        .lists()
        .cards()
        .addCard();
    } catch (err) {
      expect(err.message).toMatch(/You must pass specify the "idList" param/gi);
    }
  });

  test("adds a card", async () => {
    await trello.cards().addCard({
      name: "Test",
      idList: TEST_CHILD_ID,
      keepFromSource: "attachments",
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/cards`);
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("idList")).toBe(TEST_CHILD_ID);
    expect(result.url.searchParams.get("keepFromSource")).toBe("attachments");
  });

  test("adds a card with fileSource", async () => {
    const testFile = new File(["test"], "test.txt");
    await trello.cards().addCard({
      name: "Test",
      idList: TEST_CHILD_ID,
      keepFromSource: "attachments",
      fileSource: testFile,
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/cards`);
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("idList")).toBe(TEST_CHILD_ID);
    expect(result.url.searchParams.get("keepFromSource")).toBe("attachments");
    expect(result.config.body.get("fileSource")).toEqual(testFile);
  });

  test("throws an error if the ID isn't specified when associating a label with a card", async () => {
    expect.assertions(1);

    try {
      await trello
        .cards(TEST_CARD_ID)
        .labels()
        .associateLabel();
    } catch (err) {
      expect(err.message).toMatch(/You must pass a label ID into the label/gi);
    }
  });

  test("associates a label with a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .labels(TEST_CHILD_ID)
      .associateLabel();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/idLabels`);
    expect(result.url.searchParams.get("value")).toBe(TEST_CHILD_ID);
  });

  test("throws an error if the ID isn't specified when adding a member to a card", async () => {
    expect.assertions(1);

    try {
      await trello
        .cards(TEST_CARD_ID)
        .members()
        .associateMember();
    } catch (err) {
      expect(err.message).toMatch(
        /You must pass a member ID into the member/gi,
      );
    }
  });

  test("throws an error if the params are specified when adding a member to a card", async () => {
    expect.assertions(1);

    try {
      await trello
        .cards(TEST_CARD_ID)
        .members(TEST_CHILD_ID)
        .associateMember({ email: "test@stuff.com" });
    } catch (err) {
      expect(err.message).toMatch(
        /No params are allowed when calling associateMember/gi,
      );
    }
  });

  test("associates a member with a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .members(TEST_CHILD_ID)
      .associateMember();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/idMembers`);
    expect(result.url.searchParams.get("value")).toBe(TEST_CHILD_ID);
  });

  test("updates a member's vote on a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .membersVoted(TEST_CHILD_ID)
      .voteOnCard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/membersVoted`);
    expect(result.url.searchParams.get("value")).toBe(TEST_CHILD_ID);
  });

  test("updates a card", async () => {
    await trello.cards(TEST_CARD_ID).updateCard({
      name: "Test",
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}`);
    expect(result.url.searchParams.get("name")).toBe("Test");
  });

  test("updates a card when due is a Date", async () => {
    const now = new Date();
    await trello.cards(TEST_CARD_ID).updateCard({
      name: "Test",
      due: now,
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}`);
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("due")).toBe(now.toISOString());
  });

  test("updates the closed status of a card", async () => {
    await trello.cards(TEST_CARD_ID).updateClosedStatus(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/closed`);
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("updates the description of a card", async () => {
    await trello.cards(TEST_CARD_ID).updateDescription("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/desc`);
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("updates the due date of a card when date is a string", async () => {
    const expected = new Date().toISOString();
    await trello.cards(TEST_CARD_ID).updateDueDate(expected);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/due`);
    expect(result.url.searchParams.get("value")).toBe(expected);
  });

  test("updates the due complete of a card", async () => {
    await trello.cards(TEST_CARD_ID).updateDueComplete(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/dueComplete`);
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("updates the attachment cover image of a card", async () => {
    await trello.cards(TEST_CARD_ID).updateAttachmentCoverImage(TEST_CHILD_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/idAttachmentCover`,
    );
    expect(result.url.searchParams.get("value")).toBe(TEST_CHILD_ID);
  });

  test("moves the card to a different board", async () => {
    await trello.cards(TEST_CARD_ID).moveToBoard(TEST_PARENT_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/idBoard`);
    expect(result.url.searchParams.get("value")).toBe(TEST_PARENT_ID);
  });

  test("moves the card to a different list", async () => {
    await trello.cards(TEST_CARD_ID).moveToList(TEST_PARENT_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/idList`);
    expect(result.url.searchParams.get("value")).toBe(TEST_PARENT_ID);
  });

  test("associates multiple members with a card", async () => {
    const TEST_MEMBER_IDS = [
      "3d754c3aae66a54de330420f",
      "fa75478f8345d7801c92eeaf",
      "e90c438897a3ae65f4285568",
    ];

    await trello
      .cards(TEST_CARD_ID)
      .members()
      .associateMembers(TEST_MEMBER_IDS);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/idMembers`);
    expect(result.url.searchParams.get("value")).toBe(
      TEST_MEMBER_IDS.join(","),
    );
  });

  test("updates the name of a card", async () => {
    await trello.cards(TEST_CARD_ID).updateName("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/name`);
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("updates the position of a card", async () => {
    await trello.cards(TEST_CARD_ID).updatePosition("top");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/pos`);
    expect(result.url.searchParams.get("value")).toBe("top");
  });

  test("updates the subscribed status of a card", async () => {
    await trello.cards(TEST_CARD_ID).updateSubscribed(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/subscribed`);
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("marks all associated notifications as read for a card", async () => {
    await trello.cards(TEST_CARD_ID).markAssociatedNotificationsRead();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/markAssociatedNotificationsRead`,
    );
  });

  test("deletes a card", async () => {
    await trello.cards(TEST_CARD_ID).deleteCard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}`);
  });

  test("removes a vote from a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .membersVoted(TEST_CHILD_ID)
      .removeVoteFromCard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/membersVoted/${TEST_CHILD_ID}`,
    );
  });

  test("dissociates a member from a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .members(TEST_CHILD_ID)
      .dissociateMember();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/idMembers/${TEST_CHILD_ID}`,
    );
  });

  test("dissociates a label from a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .labels(TEST_CHILD_ID)
      .dissociateLabel();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/idLabels/${TEST_CHILD_ID}`,
    );
  });

  test("gets the actions for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .actions()
      .getActions();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/actions`);
  });

  test("gets a specific attachment for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .attachments(TEST_CHILD_ID)
      .getAttachment();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/attachments/${TEST_CHILD_ID}`,
    );
  });

  test("gets the attachments for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .attachments()
      .getAttachments();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/attachments`);
  });

  test("gets the board for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .board()
      .getBoard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/board`);
  });

  test("gets the check item for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .checkItem(TEST_CHILD_ID)
      .getCheckItem();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/checkItem/${TEST_CHILD_ID}`,
    );
  });

  test("gets the check item states for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .checkItemStates()
      .getCheckItemStates();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/checkItemStates`,
    );
  });

  test("gets a specific checklist for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .checklists(TEST_CHILD_ID)
      .getChecklist();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/checklists/${TEST_CHILD_ID}`,
    );
  });

  test("gets the checklists for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .checklists()
      .getChecklists();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/checklists`);
  });

  test("gets a specific comment for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .comments(TEST_CHILD_ID)
      .getComment();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/actions/${TEST_CHILD_ID}`,
    );
  });

  test("gets the comments for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .comments()
      .getComments();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/actions`);
  });

  test("gets a custom field for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .customField(TEST_CHILD_ID)
      .getCustomField();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/card/${TEST_CARD_ID}/customField/${TEST_CHILD_ID}`,
    );
  });

  test("gets the custom field items for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .customFieldItems()
      .getCustomFieldItems();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/customFieldItems`,
    );
  });

  test("gets the labels for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .labels()
      .getLabels();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/labels`);
  });

  test("gets the list for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .list()
      .getList();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/list`);
  });

  test("gets the members for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .members()
      .getMembers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/members`);
  });

  test("gets the members voted for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .membersVoted()
      .getMembers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/membersVoted`);
  });

  test("gets a specific sticker for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .stickers(TEST_CHILD_ID)
      .getSticker();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/cards/${TEST_CARD_ID}/stickers/${TEST_CHILD_ID}`,
    );
  });

  test("gets the stickers for a card", async () => {
    await trello
      .cards(TEST_CARD_ID)
      .stickers()
      .getStickers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/cards/${TEST_CARD_ID}/stickers`);
  });
});
