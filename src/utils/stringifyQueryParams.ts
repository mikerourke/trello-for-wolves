import snakeCase from "lodash.snakecase";
import { QueryParamsByName } from "../typeDefs";

type ValidQueryParams<T> = T & { separator: string };

/**
 * Creates the query string that will be appended to the endpoint path to perform
 * the request to the Trello API.
 * @param queryParamsByName Argument(s) used to build query string.
 */
export function stringifyQueryParams(
  queryParamsByName: QueryParamsByName,
): string {
  const validParamsByName = queryParamsByName as ValidQueryParams<
    QueryParamsByName
  >;
  let queryString = "";

  for (const [queryParamKey, queryParamValue] of Object.entries(
    validParamsByName,
  )) {
    // If the value of the entry is an object (rather than a value), the
    // corresponding child properties need to be combined for the URL string.
    if (
      typeof queryParamValue === "object" &&
      !Array.isArray(queryParamValue) &&
      queryParamValue !== null
    ) {
      const nestedString = getQueryStringForNestedArgs(
        queryParamKey,
        validParamsByName,
      );
      queryString += `${nestedString}&`;

      // These are simple key/value pairs in which the value is a string or
      // number.
    } else {
      // Ensure the separator key specified for handling nested args isn't
      // present in the query string.
      if (queryParamKey !== "separator") {
        const argKey = getKeyForQueryString(queryParamKey);
        queryString += `${argKey}=${queryParamValue}&`;
      }
    }
  }

  // Ensure there is no double ampersand in the query string.  This may
  // occur due to the string being constructed manually.
  return queryString.replace("&&", "&");
}

/**
 * Returns a string to append to the query string that accommodates for nested
 * entities. These need to be un-nested to successfully perform the API call.
 * @param childName Name of the key containing children.
 * @param queryParams Arguments to parse.
 * @example
 *   queryParams = {
 *     prefs: {
 *       invitations: "admins"
 *       selfJoin: true,
 *     }
 *     separator: "/",
 *   };
 *  // prefs/invitations=admins&prefs/selfJoin=true
 *
 */
function getQueryStringForNestedArgs(
  childName: string,
  queryParams: ValidQueryParams<QueryParamsByName>,
): string {
  let childUrlString = "";
  const childGroup = queryParams[childName];

  let separator = "/";
  if ("separator" in queryParams) {
    separator = queryParams.separator;
  }

  if (typeof childGroup === "undefined" || childGroup === null) {
    return "";
  }

  for (const [childKey, childValue] of Object.entries(childGroup)) {
    const childArgKey = `${childName}${separator}${childKey}`;
    childUrlString += `${childArgKey}=${childValue}&`;
  }

  // Remove the trailing ampersand:
  return childUrlString.slice(0, -1);
}

/**
 * Returns the key for building the query string with the correct casing. The
 * "queryParams" object passed into the request function has camel cased keys.
 * The Trello API's keys are snake cased (with a few exceptions).
 * @param key Camel cased key.
 */
function getKeyForQueryString(key: string): string {
  // Certain keys should not be re-cased.
  const excludedKeys = [
    "avatarSource",
    "boardBackgrounds",
    "boardStars",
    "callbackURL",
    "confirmationAccepted", // Enterprise
    "customBoardBackgrounds",
    "customEmoji",
    "customStickers",
    "defaultLabels",
    "defaultLists",
    "displayName",
    "dueComplete",
    "fullName",
    "ixLastUpdate",
    "keepFromSource",
    "mimeType",
    "modelTypes",
    "myPrefs",
    "onlyOrgMembers",
    "powerUp",
    "powerUps",
    "returnUrl", // Enterprise
    "savedSearches",
    "webhook",
    "webhooks",
    "website",
    "zIndex",
  ];
  if (excludedKeys.includes(key)) {
    return key;
  }

  // All of the params that start with "id" (e.g. idBoard, idCard, etc.)
  // shouldn't be re-cased.
  if (key.substr(0, 2) === "id") {
    return key;
  }

  // Ensure this doesn't get converted to one word.
  if (key === "cardBoard") {
    return "card_board";
  }

  if (key === "displayCardFront") {
    return "display_cardFront";
  }

  const recasedKey: string = snakeCase(key);

  // These are fields that have been re-cased to ensure all the other words
  // are separated by underscores, but only part of the key needs to be
  // changed.
  switch (true) {
    case /member_creator/gi.test(recasedKey):
      return recasedKey.replace("_creator", "Creator");

    case /_voted/gi.test(recasedKey):
      return recasedKey.replace("_voted", "Voted");

    case /plugin_data/gi.test(recasedKey):
      return recasedKey.replace("_data", "Data");

    case /_invited/gi.test(recasedKey):
      return recasedKey.replace("_invited", "Invited");

    case /check_item/gi.test(recasedKey):
      return recasedKey.replace("check_item", "checkItem");

    case /_state/gi.test(recasedKey):
      return recasedKey.replace("_state", "State");

    case /sort_by/gi.test(recasedKey):
      return recasedKey.replace("sort_by", "sortBy");

    case /sort_order/gi.test(recasedKey):
      return recasedKey.replace("sort_order", "sortOrder");

    case /start_index/gi.test(recasedKey):
      return recasedKey.replace("start_index", "startIndex");

    default:
      return recasedKey;
  }
}
