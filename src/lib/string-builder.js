/* @flow */

/* External dependencies */
import querystring from 'querystring';
import snakeCase from 'lodash.snakecase';

/* Types */
import type { Auth, EntityInstance } from '../types';

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
      const argValue = (value: any);
      urlString = `${urlString}${key}=${argValue}&`;
    });
  }
  const authSuffix = querystring.stringify(auth);
  return `${urlString}${authSuffix}`.replace('&&', '&');
};

/**
 * Returns the endpoint for a specific entity.
 * @param {string} groupName Name of the entity group.
 * @param {Object} options Additional options for the endpoint builder.
 * @param {string} [options.entityId] Id of the entity.
 * @param {EntityInstance} [options.parent={}] Parent entity associated with the
 *    entity.
 * @returns {string} Endpoint for the entity.
 */
export const buildEndpointString = (
  groupName: string,
  options?: {
    entityId?: string,
    parent?: ?EntityInstance,
  } = {},
): string => {
  const { entityId, parent } = options;
  // Start with just the group name (e.g. "boards").
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
