import cases from "jest-in-case";
import {
  stringifyQueryParams,
  UNCHANGED_PARAM_NAMES,
} from "../stringifyQueryParams";

describe("the stringifyQueryParams method", () => {
  test("stringifies simple params", () => {
    const result = stringifyQueryParams({
      name: "Test",
      filter: "all",
      fields: "all",
    });

    expect(result).toBe("name=Test&filter=all&fields=all");
  });

  test("does not re-case names in the UNCHANGED_PARAM_NAMES list", () => {
    const unchangedQueryParams = UNCHANGED_PARAM_NAMES.reduce(
      (acc, paramName) => ({
        ...acc,
        [paramName]: "TEST",
      }),
      {},
    );
    const result = stringifyQueryParams(unchangedQueryParams);
    const expected = UNCHANGED_PARAM_NAMES.map(
      paramName => `${paramName}=TEST`,
    ).join("&");

    expect(result).toBe(expected);
  });

  test("stringifies nested object params with undefined separator", () => {
    const result = stringifyQueryParams({
      name: "Test",
      prefs: {
        selfJoin: true,
      },
    });

    expect(result).toBe("name=Test&prefs/selfJoin=true");
  });

  test("stringifies nested object params with underscore separator", () => {
    const result = stringifyQueryParams({
      name: "Test",
      prefs: {
        selfJoin: true,
      },
      separator: "_",
    });

    expect(result).toBe("name=Test&prefs_selfJoin=true");
  });

  test(`does not re-case params that start with "id"`, () => {
    const result = stringifyQueryParams({
      name: "Test",
      idBoard: "123",
    });

    expect(result).toBe("name=Test&idBoard=123");
  });

  test(`correctly stringifies params with "cardBoard"`, () => {
    const result = stringifyQueryParams({
      name: "Test",
      cardBoard: "123",
    });

    expect(result).toBe("name=Test&card_board=123");
  });

  cases(
    "re-cases param names when conditions are met",
    options => {
      const result = stringifyQueryParams(options.paramsByName);

      expect(result).toBe(options.expected);
    },
    [
      {
        name: `when params includes "memberCreator"`,
        paramsByName: { memberCreatorFields: "all" },
        expected: "memberCreator_fields=all",
      },
      {
        name: `when params includes "voted"`,
        paramsByName: { membersVotedFields: "all" },
        expected: "membersVoted_fields=all",
      },
      {
        name: `when params includes "pluginData"`,
        paramsByName: { pluginDataFields: "all" },
        expected: "pluginData_fields=all",
      },
      {
        name: `when params includes "invited"`,
        paramsByName: { membersInvitedFields: "all" },
        expected: "membersInvited_fields=all",
      },
      {
        name: `when params includes "checkItem"`,
        paramsByName: { checkItemFields: "all" },
        expected: "checkItem_fields=all",
      },
      {
        name: `when params includes "state"`,
        paramsByName: { checkItemState: "all" },
        expected: "checkItemState=all",
      },
      {
        name: `when params includes "sortBy"`,
        paramsByName: { sortByField: "all" },
        expected: "sortBy_field=all",
      },
      {
        name: `when params includes "sortOrder"`,
        paramsByName: { fieldSortOrder: "asc" },
        expected: "field_sortOrder=asc",
      },
      {
        name: `when params includes "startIndex"`,
        paramsByName: { valueStartIndex: 1 },
        expected: "value_startIndex=1",
      },
    ],
  );
});
