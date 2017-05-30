/* @flow */

/* External dependencies */
import { stringify } from 'querystring';
import axios from 'axios';
import Promise from 'bluebird';

/* Internal dependencies */
import stringifyQueryArgs from '../query-args-stringifier';

/* Types */
import type { Auth } from '../types';

type HttpMethod = 'get' | 'put' | 'post' | 'delete';

/**
 * Base class for entities.
 */
export default class BaseEntity {
  auth: Auth;
  entityType: string;
  entityId: string;
  parentType: string;
  parentId: string;
  endpoint: string;

  /**
   * @param {Auth} auth Auth object containing Trello API key and token.
   * @param {string} entityType Name of entity type.
   * @param {string} [entityId=''] Id of the entity.
   * @param {string} [parentType=''] Name of parent type.
   * @param {string} [parentId=''] Id of the parent.
   * @constructor
   */
  constructor(
    auth: Auth,
    entityType: string,
    entityId?: string = '',
    parentType?: string = '',
    parentId?: string = '',
  ) {
    this.auth = auth;
    this.entityType = entityType;
    this.entityId = entityId;
    this.parentType = parentType;
    this.parentId = parentId;
    this.endpoint = '';
  }

  /**
   * Constructs the endpoint for performing the API request.
   * @param {string} path Path to append to the base path.
   * @param {Object} [queryArgs={}] Optional arguments specified for performing
   *    the request.
   * @param {string} [basePathOverride=''] Alternate base path for the endpoint.
   * @returns {string} Endpoint for performing the request.
   */
  getEndpoint(
    path: string,
    queryArgs?: Object = {},
    basePathOverride?: string,
  ): string {
    // If a parentId was specified in the constructor, build a parent path
    // based on the parent ID and type.
    const parentPath = this.parentId && `${this.parentType}s/${this.parentId}/`;

    // If the base path is overridden, use the overridden path, otherwise build
    // the path based on the entity ID and type.
    const basePath = (basePathOverride)
      ? basePathOverride
      : `${this.entityType}s/${this.entityId}`;

    // Combine the parent and base paths to form the beginning of the endpoint.
    const pathPrefix = `${parentPath}${basePath}`;

    // By default, the path '/' is provided if the endpoint uses the base
    // path (for reference purposes).  Remove the slash prior to building
    // the endpoint.
    const pathSuffix = (path === '/') ? '' : path;

    // If queryArgs were provided, build the corresponding querystring to
    // include the specified arguments.
    const queryArgsString = (queryArgs) ? stringifyQueryArgs(queryArgs) : '';

    // Ensure the key and token is appended to the end of the querystring.
    const authSuffix = stringify(this.auth);
    return `${pathPrefix}${pathSuffix}?${queryArgsString}${authSuffix}`;
  }

  /**
   * Returns a resolved Promise with the results of the Trello API call.
   * @param {HttpMethod} httpMethod Method associated with the request.
   * @param {string} path Path for the request.
   * @param {Object} [queryArgs={}] Arguments for building the querystring.
   * @param {string} [basePathOverride=''] Alternate base path for the endpoint.
   * @param {Object} [data={}] Data to include in the body of the request.
   * @returns {Promise}
   * @private
   */
  _performRequest(
    httpMethod: HttpMethod,
    path: string,
    queryArgs?: Object = {},
    basePathOverride?: string = '',
    data?: Object = {},
  ): Promise.resolve<*> {
    const endpoint = this.getEndpoint(path, queryArgs, basePathOverride);
    const requestConfig = {
      data,
      method: httpMethod,
      url: `https://api.trello.com/1/${endpoint}`,
    };
    return Promise.resolve(axios(requestConfig)
      .then(response => response)
      .catch(error => error));
  }

  /**
   * Builds the help link for referencing the Trello API.  It parses the entity
   *    name from the base path and combines that with the specified HTTP
   *    method and field name to return the URL.
   * @param {HttpMethod} httpMethod Method associated with the action.
   * @param {string} fieldName Field name to get help for.
   * @returns {string}
   * @example
   *  const helpLink = this.getHelpLink('get', 'boardstars');
   *  console.log(helpLink);
   *  >> Output: board#get-1-boards-board-id-boardstars
   */
  getHelpLink(
    httpMethod: HttpMethod,
    fieldName: string,
  ): string {
    const { entityType } = this;
    return `${entityType}#${httpMethod}-1-${entityType}s-${entityType}-id-${fieldName}`;
  }

  /**
   * Perform a GET request with the specified path and arguments.
   * @param {string} path Path to append to base path.
   * @param {Object} [queryArgs={}] Query arguments to pass to the request.
   * @param {string} [basePathOverride=''] Value to override base path.
   * @returns {Promise}
   */
  httpGet(
    path: string,
    queryArgs?: Object = {},
    basePathOverride?: string = '',
  ): Promise<Object> {
    return this._performRequest('get', path, queryArgs, basePathOverride);
  }

  /**
   * Perform a PUT request with the specified path and arguments.
   * @param {string} path Path to append to base path.
   * @param {Object} [queryArgs={}] Query arguments to pass to the request.
   * @param {string} [basePathOverride=''] Value to override base path.
   * @returns {Promise}
   */
  httpPut(
    path: string,
    queryArgs?: Object = {},
    basePathOverride?: string = '',
  ): Promise<Object> {
    return this._performRequest('put', path, queryArgs, basePathOverride);
  }

  /**
   * Perform a POST request with the specified path and arguments.
   * @param {string} path Path to append to base path.
   * @param {Object} [queryArgs={}] Query arguments to pass to the request.
   * @param {string} [basePathOverride=''] Value to override base path.
   * @param {Object} [data={}] Data to include in the body of the request.
   * @returns {Promise}
   */
  httpPost(
    path: string,
    queryArgs?: Object = {},
    basePathOverride?: string = '',
    data?: Object = {},
  ): Promise<Object> {
    return this._performRequest('post', path, queryArgs, basePathOverride,
      data);
  }

  /**
   * Perform a DELETE request with the specified path and arguments.
   * @param {string} path Path to append to base path.
   * @param {Object} [queryArgs={}] Query arguments to pass to the request.
   * @param {string} [basePathOverride=''] Value to override base path.
   * @returns {Promise}
   */
  httpDelete(
    path: string,
    queryArgs?: Object = {},
    basePathOverride?: string = '',
  ): Promise<Object> {
    return this._performRequest('delete', path, queryArgs, basePathOverride);
  }

}
