/* @flow */

/* External dependencies */
import querystring from 'querystring';
import snakeCase from 'lodash.snakecase';

/* Types */
import type { Auth, EntityInstance } from '../types';

/**
 * Returns a string to append to the URL that accommodates for nested entities.
 *    These need to be un-nested to successfully perform the API call.
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
const getChildArgsUrlString = (
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
 * Returns the key for building the URL with the correct casing.  The
 *    "options" object passed into the request function has camel cased
 *    keys.  The Trello API's keys are snake cased (with a few exceptions).
 * @param {string} key Camel cased key.
 * @returns {string} Snake cased key.
 */
const getKeyValueForUrl = (key: string): string => {
  let recasedKey: string = snakeCase(key);

  // These are special exceptions.
  if (recasedKey.includes('member_creator')) {
    recasedKey = recasedKey.replace('_creator', 'Creator');
  }

  return recasedKey;
};

/**
 * Creates the URL string that will be used to perform the HTTP request to
 *    the corresponding Trello API endpoint.
 * @param {Auth} auth Object containing API key and token.
 * @param {string} endpoint Trello API endpoint.
 * @param {Object} [urlArgs={}] Argument(s) associated with the endpoint.
 * @returns {string} URL string for the request.
 */
export const buildUrlString = (
  auth: Auth,
  endpoint: string,
  urlArgs?: Object = {},
): string => {
  let urlString = `${endpoint}?`;
  if (urlArgs) {
    Object.entries(urlArgs).forEach(([key, value]) => {
      // If the value of the entry is an object (rather than a value), the
      // corresponding child properties need to be combined for the URL string.
      if (typeof value === 'object' && !Array.isArray(value)) {
        const childName: string = (key: string);
        const childUrlArgsString = getChildArgsUrlString(childName, urlArgs);
        urlString = `${urlString}${childUrlArgsString}&`;

      // These are simple key/value pairs in which the value is a string or
      // number.
      } else {
        const argKey = getKeyValueForUrl(key);
        const argValue = (value: any);
        urlString = `${urlString}${argKey}=${argValue}&`;
      }
    });
  }
  const authSuffix = querystring.stringify(auth);
  return `${urlString}${authSuffix}`.replace('&&', '&');
};

/**
 * Returns the endpoint for a specific entity.
 * @param {string} groupName Name of the entity group.
 * @param {string} [entityId=''] Id of the entity.
 * @param {EntityInstance} [parent={}] Parent entity associated with the
 *    entity.
 * @returns {string} Endpoint for the entity.
 */
export const buildEndpointString = (
  groupName: string,
  entityId?: string = '',
  parent?: ?EntityInstance,
): string => {
  // Start with just the group name (e.g. "/boards").
  let endpoint = groupName;

  // Add the ID if it's specified (e.g. "boards/bJDPVV1A").
  if (entityId) {
    endpoint = `${endpoint}/${entityId}`;
  }

  // If a parent entity was specified, prepend it to the current
  // endpoint (e.g. "actions/aCtIoN1/boards/bJDPVV1A").
  if (parent) {
    endpoint = `${parent.entityName}s/${parent.id}/${endpoint}`;
  }
  return endpoint;
};
