import snakeCase from "lodash.snakecase";
import { AnyParams } from "../typeDefs";

type ValidQueryParams = AnyParams & { separator: string };

// These param names should not be re-cased. The API documentation specifies
// that these are the actual values to be passed in.
export const UNCHANGED_PARAM_NAMES = [
  "allowBillableGuest",
  "avatarSource",
  "boardBackgrounds",
  "boardStars",
  "callbackURL",
  "cardFront",
  "confirmationAccepted",
  "customBoardBackgrounds",
  "customEmoji",
  "customFieldItems",
  "customFields",
  "customStickers",
  "defaultLabels",
  "defaultLists",
  "descData",
  "displayName",
  "dueComplete",
  "enterpriseOwned",
  "fieldGroup",
  "fileSource",
  "fullName",
  "ixLastUpdate",
  "keepFromSource",
  "labelNames",
  "locationName",
  "mimeType",
  "modelType",
  "modelTypes",
  "myPrefs",
  "onlyOrgMembers",
  "orgMemberType",
  "powerUp",
  "powerUps",
  "reactionsSummary",
  "returnUrl",
  "savedSearches",
  "shortUrl",
  "tosAccepted",
  "urlSource",
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
export function stringifyQueryParams(queryParamsByName: AnyParams): string {
  const validParamsByName = queryParamsByName as ValidQueryParams;
  const nameValuePairs = [];

  for (const [queryParamName, queryParamValue] of Object.entries(
    validParamsByName,
  )) {
    const isParamADate = (queryParamValue as Date | string) instanceof Date;
    const isNested =
      typeof queryParamValue === "object" &&
      !isParamADate &&
      !Array.isArray(queryParamValue) &&
      queryParamValue !== null;

    // If the value of the entry is an object (rather than a value), the
    // corresponding child properties need to be combined for the URL string.
    if (isNested) {
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
        const validParamValue = stringifyParamIfDate(queryParamValue as string);
        nameValuePairs.push(`${validParamName}=${validParamValue}`);
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
  queryParams: ValidQueryParams,
): string {
  const childGroup = queryParams[parentParamName] as AnyParams;
  const nameValuePairs = [];

  let separator = "/";
  if ("separator" in queryParams) {
    separator = queryParams.separator;
  }

  for (const [childParamName, childParamValue] of Object.entries(childGroup)) {
    const validValue = stringifyParamIfDate(childParamValue as string);
    const joinedParamName = `${parentParamName}${separator}${childParamName}`;
    nameValuePairs.push(`${joinedParamName}=${validValue}`);
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

/**
 * Since dates have to be a valid ISO string (or null), this converts a
 * date instance passed in to a valid value.
 */
function stringifyParamIfDate(dateValue: Date | string | null): string | null {
  return dateValue instanceof Date ? dateValue.toISOString() : dateValue;
}
