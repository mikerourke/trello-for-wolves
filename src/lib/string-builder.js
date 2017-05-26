/* @flow */

/* External dependencies */
import snakeCase from 'lodash.snakecase';

/* Types */
import type { Auth, Entity } from '../types';

/**
 * Builds the string to append to the end of the URL with the API key and
 *    token values.
 * @param {Auth} auth Object containing API key and token.
 * @returns {string}
 */
const getUrlSuffixForAuth = (auth: Auth): string => {
  const { key, token = '' } = auth;
  let urlSuffix = `key=${key}`;
  if (token) {
    urlSuffix = `${urlSuffix}&token=${token}`;
  }
  return urlSuffix;
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
 * @param {Object} [options={}] Options associated with the endpoint.
 * @returns {string}
 */
export const buildUrlString = (
  auth: Auth,
  endpoint: string,
  options?: Object = {},
): string => {
  let urlString = `${endpoint}?`;
  if (options) {
    // FIXME: Add handlers for prefs/ and labelNames/ when there's a slash or underscore.
    Object.entries(options).forEach(([key, value]) => {
      const argKey: string = getKeyValueForUrl(key);
      const argValue: string = (value: any);
      if (key !== 'prefs' && key !== 'labelNames') {
        urlString = `${urlString}${argKey}=${argValue}&`;
      } else {
        const childGroup = options[key];
        Object.entries(childGroup).forEach(([childKey, childValue]) => {
          const childArgKey = `${key}/${childKey}`;
          const childArgValue: string = (childValue: any);
          urlString = `${urlString}${childArgKey}=${childArgValue}&`;
        });
      }
    });
  }
  const authSuffix = getUrlSuffixForAuth(auth);
  return `${urlString}${authSuffix}`;
};

/**
 * Returns the endpoint for a specific entity.
 * @param {string} groupName Name of the entity group.
 * @param {string} [entityId=""] Id of the entity.
 * @param {Entity} [parent={}] Parent entity associated with the entity.
 * @returns {string} Endpoint for the entity.
 */
export const buildEndpointString = (
  groupName: string,
  entityId?: string = '',
  parent?: ?Entity,
): string => {
  let endpoint = groupName;
  if (entityId) {
    endpoint = `${endpoint}/${entityId}`;
  }
  if (parent) {
    endpoint = `${parent.entityName}s/${parent.id}/${endpoint}`;
  }
  return endpoint;
};
