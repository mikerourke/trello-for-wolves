import { Trello } from "../../index";

const TEST_BOARD_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_CHILD_ID = "dd7d4048bed6c23daebf1070";

describe("the BoardMyPrefs resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets the myPrefs value for a board", async () => {
    await trello.boards(TEST_BOARD_ID).myPrefs().getMyPrefs();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/myPrefs`);
  });

  test("updates the email position myPref for a board", async () => {
    await trello.boards(TEST_BOARD_ID).myPrefs().updateEmailPosition("bottom");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/myPrefs/emailPosition`,
    );
    expect(result.url.searchParams.get("value")).toBe("bottom");
  });

  test("moves the board to the specified email list", async () => {
    await trello.boards(TEST_BOARD_ID).myPrefs().moveToEmailList(TEST_CHILD_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/myPrefs/idEmailList`,
    );
    expect(result.url.searchParams.get("value")).toBe(TEST_CHILD_ID);
  });

  test("updates the show list guide myPref", async () => {
    await trello.boards(TEST_BOARD_ID).myPrefs().updateShowListGuide(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/myPrefs/showListGuide`,
    );
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("updates the show sidebar myPref", async () => {
    await trello.boards(TEST_BOARD_ID).myPrefs().updateShowSidebar(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/myPrefs/showSidebar`,
    );
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("updates the show sidebar activity myPref", async () => {
    await trello
      .boards(TEST_BOARD_ID)
      .myPrefs()
      .updateShowSidebarActivity(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/myPrefs/showSidebarActivity`,
    );
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("updates the show sidebar board actions myPref", async () => {
    await trello
      .boards(TEST_BOARD_ID)
      .myPrefs()
      .updateShowSidebarBoardActions(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/myPrefs/showSidebarBoardActions`,
    );
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("updates the show sidebar members myPref", async () => {
    await trello.boards(TEST_BOARD_ID).myPrefs().updateShowSidebarMembers(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_BOARD_ID}/myPrefs/showSidebarMembers`,
    );
    expect(result.url.searchParams.get("value")).toBe("true");
  });
});
