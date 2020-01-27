import snakeCase from "lodash.snakecase";

type ValidQueryParams<T> = T & { separator: string };

/**
 * Creates the query string that will be appended to the endpoint path to perform
 * the request to the Trello API.
 * @param queryParamsByName Argument(s) used to build query string.
 */
export function stringifyQueryParams(queryParamsByName: object): string {
  const validParamsByName = queryParamsByName as ValidQueryParams<object>;
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
  const validQueryString = queryString.replace("&&", "&");

  // Make sure there isn't a trailing ampersand:
  if (validQueryString.endsWith("&")) {
    return validQueryString.slice(0, -1);
  }

  return validQueryString;
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
  queryParams: ValidQueryParams<object>,
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

  for (const [childKey, childValue] of Object.entries(childGroup as object)) {
    const childParamKey = `${childName}${separator}${childKey}`;
    childUrlString += `${childParamKey}=${childValue}&`;
  }

  // Remove the trailing ampersand:
  return childUrlString.slice(0, -1);
}

/**
 * Returns the key for building the query string with the correct casing. The
 * "queryParams" object passed into the request function has camel cased keys.
 * The Trello API keys are snake cased (with a few exceptions).
 */
function getKeyForQueryString(key: string): string {
  if (isKeyInWhitelist(key)) {
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

  return applyValidSnakeCasing(key);
}

/**
 * Returns true if the specified key is valid and should be returned.
 */
function isKeyInWhitelist(key: string): boolean {
  // Certain keys should not be re-cased.
  const excludedKeys = [
    "avatarSource",
    "boardBackgrounds",
    "boardStars",
    "callbackURL",
    "cardFront",
    "confirmationAccepted",
    "customBoardBackgrounds",
    "customEmoji",
    "customFields",
    "customStickers",
    "defaultLabels",
    "defaultLists",
    "descData",
    "displayName",
    "dueComplete",
    "enterpriseOwned",
    "fieldGroup",
    "fullName",
    "ixLastUpdate",
    "keepFromSource",
    "labelNames",
    "mimeType",
    "modelType",
    "modelTypes",
    "myPrefs",
    "onlyOrgMembers",
    "orgMemberType",
    "powerUp",
    "powerUps",
    "returnUrl",
    "savedSearches",
    "shortUrl",
    "webhook",
    "webhooks",
    "website",
    "zIndex",
  ];

  return excludedKeys.includes(key);
}

/**
 * Return the specified key with the correct snake casing.
 */
function applyValidSnakeCasing(key: string): string {
  const reCasedKey: string = snakeCase(key);

  // These are fields that have been re-cased to ensure all the other words
  // are separated by underscores, but only part of the key needs to be
  // changed.
  switch (true) {
    case /member_creator/gi.test(reCasedKey):
      return reCasedKey.replace("_creator", "Creator");

    case /_voted/gi.test(reCasedKey):
      return reCasedKey.replace("_voted", "Voted");

    case /plugin_data/gi.test(reCasedKey):
      return reCasedKey.replace("_data", "Data");

    case /_invited/gi.test(reCasedKey):
      return reCasedKey.replace("_invited", "Invited");

    case /check_item/gi.test(reCasedKey):
      return reCasedKey.replace("check_item", "checkItem");

    case /_state/gi.test(reCasedKey):
      return reCasedKey.replace("_state", "State");

    case /sort_by/gi.test(reCasedKey):
      return reCasedKey.replace("sort_by", "sortBy");

    case /sort_order/gi.test(reCasedKey):
      return reCasedKey.replace("sort_order", "sortOrder");

    case /start_index/gi.test(reCasedKey):
      return reCasedKey.replace("start_index", "startIndex");

    default:
      return reCasedKey;
  }
}
