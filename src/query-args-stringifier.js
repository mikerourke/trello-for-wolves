/* @flow */

/* External dependencies */
import snakeCase from 'lodash.snakecase';

/**
 * Returns a string to append to the query string that accommodates for nested
 *    entities.  These need to be un-nested to successfully perform the API
 *    call.
 * @example
 *   Given:
 *    urlArgs = {
 *      prefs: {
 *        invitations: 'admins'
 *        selfJoin: true,
 *        separator: '/',
 *      }
 *    }
 *  Output: prefs/invitations=admins&prefs/selfJoin=true
 *
 * @param {string} childName Name of the key containing children.
 * @param {Object} urlArgs Arguments to parse.
 * @returns {string} URL string in correct format.
 */
const getQueryStringForNestedArgs = (
  childName: string,
  urlArgs: Object,
): string => {
  let childUrlString = '';
  const childGroup = urlArgs[childName];

  // The separator needs to be a key on each child group, if it's not present,
  // throw an error.
  const { separator = '' } = childGroup;
  if (separator === '') {
    throw new Error('Separator must be specified for child args');
  }

  Object.entries(childGroup).forEach(([childKey, childValue]) => {
    // Ensure that the "separator" key isn't included in the URL string.
    if (childKey !== 'separator') {
      const childArgKey = `${childName}${separator}${childKey}`;
      const childArgValue: string = (childValue: any);
      childUrlString = `${childUrlString}${childArgKey}=${childArgValue}&`;
    }
  });
  return childUrlString;
};

/**
 * Returns the key for building the query string with the correct casing.  The
 *    "queryArgs" object passed into the request function has camel cased
 *    keys.  The Trello API's keys are snake cased (with a few exceptions).
 * @param {string} key Camel cased key.
 * @returns {string} Snake cased key.
 */
const recaseKeyForQueryString = (key: string): string => {
  let recasedKey: string = snakeCase(key);

  // These are special exceptions.
  if (recasedKey.includes('member_creator')) {
    recasedKey = recasedKey.replace('_creator', 'Creator');
  }

  return recasedKey;
};

/**
 * Creates the query string that will be appended to the endpoint path to
 *    perform the request to the Trello API.
 * @param {Object} queryArgs Argument(s) used to build query string.
 * @returns {string} Query string for the request.
 */
const stringifyQueryArgs = (
  queryArgs: Object,
): string => {
  let queryArgsString = '';
  Object.entries(queryArgs).forEach(([key, value]) => {
    // If the value of the entry is an object (rather than a value), the
    // corresponding child properties need to be combined for the URL string.
    if (typeof value === 'object' && !Array.isArray(value)) {
      const childName = (key: string);
      const nestedString = getQueryStringForNestedArgs(childName, queryArgs);
      queryArgsString = `${queryArgsString}${nestedString}&`;

      // These are simple key/value pairs in which the value is a string or
      // number.
    } else {
      const argKey = recaseKeyForQueryString(key);
      const argValue = (value: any);
      queryArgsString = `${queryArgsString}${argKey}=${argValue}&`;
    }
  });

  // Ensure there are no double ampersands since the string was constructed
  // manually.
  return queryArgsString.replace('&&', '&');
};

export default stringifyQueryArgs;
