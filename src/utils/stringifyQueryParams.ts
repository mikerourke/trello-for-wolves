import snakeCase from "lodash.snakecase";

type ValidQueryParams<T> = T & { separator: string };

// These param names should not be re-cased. The API documentation specifies
// that these are the actual values to be passed in.
export const UNCHANGED_PARAM_NAMES = [
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

/**
 * Creates the query string that will be appended to the endpoint path to perform
 * the request to the Trello API.
 * @param queryParamsByName Params name/value object used to build query string.
 */
export function stringifyQueryParams(queryParamsByName: object): string {
  const validParamsByName = queryParamsByName as ValidQueryParams<object>;
  const nameValuePairs = [];

  for (const [queryParamName, queryParamValue] of Object.entries(
    validParamsByName,
  )) {
    // If the value of the entry is an object (rather than a value), the
    // corresponding child properties need to be combined for the URL string.
    if (
      typeof queryParamValue === "object" &&
      !Array.isArray(queryParamValue) &&
      queryParamValue !== null
    ) {
      const nestedString = getNameValueStringForNestedParams(
        queryParamName,
        validParamsByName,
      );
      nameValuePairs.push(nestedString);

      // These are simple key/value pairs in which the value is a string or
      // number.
    } else {
      // Ensure the separator key specified for handling nested args isn't
      // present in the query string.
      if (queryParamName !== "separator") {
        const validParamName = getParamNameWithValidCasing(queryParamName);
        nameValuePairs.push(`${validParamName}=${queryParamValue}`);
      }
    }
  }

  return nameValuePairs.join("&");
}

/**
 * Returns a string to append to the query string that accommodates for nested
 * entities. These need to be un-nested to successfully perform the API call.
 * @param parentParamName Name of the key containing children.
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
function getNameValueStringForNestedParams(
  parentParamName: string,
  queryParams: ValidQueryParams<object>,
): string {
  const childGroup = queryParams[parentParamName] as object;
  const nameValuePairs = [];

  let separator = "/";
  if ("separator" in queryParams) {
    separator = queryParams.separator;
  }

  for (const [childParamName, childParamValue] of Object.entries(childGroup)) {
    const joinedParamName = `${parentParamName}${separator}${childParamName}`;
    nameValuePairs.push(`${joinedParamName}=${childParamValue}`);
  }

  return nameValuePairs.join("&");
}

/**
 * Returns the param name for building the query string with the correct casing.
 * The `queryParamsByName` object passed into the request function has camel
 * cased keys. The Trello API param names are snake cased (with a few exceptions).
 */
function getParamNameWithValidCasing(paramName: string): string {
  if (UNCHANGED_PARAM_NAMES.includes(paramName)) {
    return paramName;
  }

  // All of the params that start with "id" (e.g. idBoard, idCard, etc.)
  // shouldn't be re-cased.
  if (paramName.substr(0, 2) === "id") {
    return paramName;
  }

  // Ensure this doesn't get converted to one word.
  if (paramName === "cardBoard") {
    return "card_board";
  }

  return reCaseParamNameIfRequired(paramName);
}

/**
 * Return the specified paramName with the correct snake casing.
 */
function reCaseParamNameIfRequired(paramName: string): string {
  const snakeCasedParamName: string = snakeCase(paramName);
  let validParamName = snakeCasedParamName;

  // These are fields that have been re-cased to ensure all the other words
  // are separated by underscores, but only part of the key needs to be
  // changed.
  /* eslint-disable */
  const replaceByKey = {
    member_creator: { search: "_creator", replace: "Creator" },
    _voted: { search: "_voted", replace: "Voted" },
    plugin_data: { search: "_data", replace: "Data" },
    _invited: { search: "_invited", replace: "Invited" },
    check_item: { search: "check_item", replace: "checkItem" },
    _state: { search: "_state", replace: "State" },
    sort_by: { search: "sort_by", replace: "sortBy" },
    sort_order: { search: "sort_order", replace: "sortOrder" },
    start_index: { search: "start_index", replace: "startIndex" },
  };
  /* eslint-enable */

  for (const [field, { search, replace }] of Object.entries(replaceByKey)) {
    if (validParamName.includes(field)) {
      validParamName = validParamName.replace(search, replace);
    }
  }

  return validParamName;
}
