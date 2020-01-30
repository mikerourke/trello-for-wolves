import { Trello } from "../../index";

const TEST_PARENT_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_MEMBER_ID = "60024c859ab0c51945243414";
const TEST_CHILD_ID = "a9e2418d8b71eb8e5ec6d5e8";

describe("the Member resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single member", async () => {
    await trello.members(TEST_MEMBER_ID).getMember();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/${TEST_MEMBER_ID}`);
  });

  test("throws an error with invalid params for a non-enterprise resource", async () => {
    try {
      await trello
        .organizations(TEST_PARENT_ID)
        .members()
        .getMembers({ filter: "none" });
    } catch (err) {
      expect(err.message).toMatch(/Only the "fields" param is allowed/gi);
    }
  });

  test("gets multiple members", async () => {
    await trello
      .organizations(TEST_PARENT_ID)
      .members()
      .getMembers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_PARENT_ID}/members`,
    );
  });

  test("gets nested members", async () => {
    await trello
      .organizations(TEST_PARENT_ID)
      .members()
      .getNestedMembers({ members: "all" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/organizations/${TEST_PARENT_ID}`);
    expect(result.url.searchParams.get("members")).toBe("all");
  });

  test("gets filtered members", async () => {
    await trello.members().getMembersFilteredBy("all");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members`);
    expect(result.url.searchParams.get("filter")).toBe("all");
  });

  test("gets a field value for a member", async () => {
    await trello.members(TEST_MEMBER_ID).getFieldValue("email");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/${TEST_MEMBER_ID}/email`);
  });

  test("gets the deltas for a member", async () => {
    await trello.members(TEST_MEMBER_ID).getDeltas();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/${TEST_MEMBER_ID}/deltas`);
  });

  test("throws an error when adding a member to a non-organization resource", async () => {
    expect.assertions(1);

    try {
      await trello.members().addMember({
        email: "test@stuff.com",
        fullName: "Suzy Test",
      });
    } catch (err) {
      expect(err.message).toMatch(/You can only call addMember/gi);
    }
  });

  test("adds a member to an organization", async () => {
    await trello
      .organizations(TEST_PARENT_ID)
      .members()
      .addMember({
        email: "test@stuff.com",
        fullName: "Suzy Test",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_PARENT_ID}/members`,
    );
    expect(result.url.searchParams.get("email")).toBe("test@stuff.com");
    expect(result.url.searchParams.get("fullName")).toBe("Suzy Test");
  });

  test("uploads an avatar for a member", async () => {
    const testFile = new File(["test"], "test.txt");
    await trello.members(TEST_MEMBER_ID).uploadAvatar(testFile);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/members/${TEST_MEMBER_ID}/avatar`);
    expect(result.config.body.get("file")).toEqual(testFile);
  });

  test("updates a member", async () => {
    await trello.members(TEST_MEMBER_ID).updateMember({
      fullName: "Suzy Test",
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/members/${TEST_MEMBER_ID}`);
    expect(result.url.searchParams.get("fullName")).toBe("Suzy Test");
  });

  test("updates the avatar source of a member", async () => {
    await trello.members(TEST_MEMBER_ID).updateAvatarSource("gravatar");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/avatarSource`,
    );
    expect(result.url.searchParams.get("value")).toBe("gravatar");
  });

  test("updates the bio of a member", async () => {
    await trello.members(TEST_MEMBER_ID).updateBio("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/members/${TEST_MEMBER_ID}/bio`);
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("updates the full name of a member", async () => {
    await trello.members(TEST_MEMBER_ID).updateFullName("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/members/${TEST_MEMBER_ID}/fullName`);
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("updates the initials of a member", async () => {
    await trello.members(TEST_MEMBER_ID).updateInitials("abc");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/members/${TEST_MEMBER_ID}/initials`);
    expect(result.url.searchParams.get("value")).toBe("abc");
  });

  test("updates the user name of a member", async () => {
    await trello.members(TEST_MEMBER_ID).updateUsername("test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/members/${TEST_MEMBER_ID}/username`);
    expect(result.url.searchParams.get("value")).toBe("test");
  });

  test("updates the deactivated status of a member", async () => {
    await trello
      .enterprises(TEST_PARENT_ID)
      .members(TEST_MEMBER_ID)
      .updateDeactivatedStatus(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/enterprises/${TEST_PARENT_ID}/members/${TEST_MEMBER_ID}/deactivated`,
    );
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("updates the member type of a member", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .members(TEST_MEMBER_ID)
      .updateMemberType("admin");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/members/${TEST_MEMBER_ID}`,
    );
    expect(result.url.searchParams.get("type")).toBe("admin");
  });

  test("updates the color blind pref for a member", async () => {
    await trello.members(TEST_MEMBER_ID).updateColorBlind(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/prefs/colorBlind`,
    );
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("updates the locale pref for a member", async () => {
    await trello.members(TEST_MEMBER_ID).updateLocale("en-us");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/prefs/locale`,
    );
    expect(result.url.searchParams.get("value")).toBe("en-us");
  });

  test("updates the minutes between summaries pref for a member", async () => {
    await trello.members(TEST_MEMBER_ID).updateMinutesBetweenSummaries(30);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/prefs/minutesBetweenSummaries`,
    );
    expect(result.url.searchParams.get("value")).toBe("30");
  });

  test("dismisses one time messages for a member", async () => {
    await trello.members(TEST_MEMBER_ID).dismissOneTimeMessages("test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/oneTimeMessagesDismissed`,
    );
    expect(result.url.searchParams.get("value")).toBe("test");
  });

  test("deletes a member", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .members(TEST_MEMBER_ID)
      .deleteMember();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/members/${TEST_MEMBER_ID}`,
    );
  });

  test("dissociates a member from an organization", async () => {
    await trello
      .organizations(TEST_PARENT_ID)
      .members(TEST_MEMBER_ID)
      .dissociateMember();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_PARENT_ID}/members/${TEST_MEMBER_ID}`,
    );
  });

  test("dissociates a member from an organization and all boards", async () => {
    await trello
      .organizations(TEST_PARENT_ID)
      .members(TEST_MEMBER_ID)
      .dissociateMemberFromAll();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_PARENT_ID}/members/${TEST_MEMBER_ID}/all`,
    );
  });

  test("gets the actions for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .actions()
      .getActions();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/${TEST_MEMBER_ID}/actions`);
  });

  test("gets a specific board background for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .boardBackgrounds(TEST_CHILD_ID)
      .getBoardBackground();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/boardBackgrounds/${TEST_CHILD_ID}`,
    );
  });

  test("gets the board backgrounds for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .boardBackgrounds()
      .getBoardBackgrounds();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/boardBackgrounds`,
    );
  });

  test("gets a specific board star for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .boardStars(TEST_CHILD_ID)
      .getBoardStar();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/boardStars/${TEST_CHILD_ID}`,
    );
  });

  test("gets the board stars for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .boardStars()
      .getBoardStars();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/${TEST_MEMBER_ID}/boardStars`);
  });

  test("gets the boards for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .boards()
      .getBoards();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/${TEST_MEMBER_ID}/boards`);
  });

  test("gets the boards invited for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .boardsInvited()
      .getBoards();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/boardsInvited`,
    );
  });

  test("gets the cards for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .cards()
      .getCards();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/${TEST_MEMBER_ID}/cards`);
  });

  test("gets a specific custom board background for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .customBoardBackgrounds(TEST_CHILD_ID)
      .getCustomBoardBackground();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/customBoardBackgrounds/${TEST_CHILD_ID}`,
    );
  });

  test("gets the custom board backgrounds for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .customBoardBackgrounds()
      .getCustomBoardBackgrounds();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/customBoardBackgrounds`,
    );
  });

  test("gets a specific custom emoji for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .customEmojis(TEST_CHILD_ID)
      .getCustomEmoji();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/customEmoji/${TEST_CHILD_ID}`,
    );
  });

  test("gets the custom emojis for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .customEmojis()
      .getCustomEmojis();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/customEmoji`,
    );
  });

  test("gets a specific custom sticker for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .customStickers(TEST_CHILD_ID)
      .getCustomSticker();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/customStickers/${TEST_CHILD_ID}`,
    );
  });

  test("gets the custom stickers for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .customStickers()
      .getCustomStickers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/customStickers`,
    );
  });

  test("gets the notifications for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .notifications()
      .getNotifications();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/notifications`,
    );
  });

  test("gets the organizations for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .organizations()
      .getOrganizations();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/organizations`,
    );
  });

  test("gets the organizations invited for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .organizationsInvited()
      .getOrganizations();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/organizationsInvited`,
    );
  });

  test("gets a specific saved search for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .savedSearches(TEST_CHILD_ID)
      .getSavedSearch();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/savedSearches/${TEST_CHILD_ID}`,
    );
  });

  test("gets the saved searches for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .savedSearches()
      .getSavedSearches();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/members/${TEST_MEMBER_ID}/savedSearches`,
    );
  });

  test("gets the tokens for a member", async () => {
    await trello
      .members(TEST_MEMBER_ID)
      .tokens()
      .getTokens();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/${TEST_MEMBER_ID}/tokens`);
  });
});
