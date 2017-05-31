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
 * Base class for resources.
 */
export default class BaseResource {
  auth: Auth;
  resourceName: string;
  instanceId: string;
  parentPath: string;

  /**
   * @param {Auth} auth Auth object containing Trello API key and token.
   * @param {string} resourceName Name of resource.
   * @param {string} [instanceId=''] Id of the resource instance.
   * @param {string} [parentPath=''] Parent path for constructing the route
   *    path.
   * @constructor
   */
  constructor(
    auth: Auth,
    resourceName: string,
    instanceId?: string = '',
    parentPath?: string = '',
  ) {
    this.auth = auth;
    this.resourceName = resourceName;
    this.instanceId = instanceId;
    this.parentPath = parentPath;
  }

  getParentPath() {
    return this.parentPath;
  }

  getRoutePath() {
    let resourcePath = this.resourceName;
    if (this.instanceId) {
      resourcePath = `${resourcePath}/${this.instanceId}`;
    }

    // Combine the parent and resource paths to form the route path.
    return `${this.parentPath}${resourcePath}`;
  }

  /**
   * Constructs the endpoint for performing the API request.
   * @param {string} pathVariables Path to append to the route path.
   * @param {Object} [queryArgs={}] Optional arguments specified for performing
   *    the request.
   * @param {string} [routePathOverride=''] Alternate route path for the
   *    endpoint.
   * @returns {string} Endpoint for performing the request.
   */
  getEndpoint(
    pathVariables: string,
    queryArgs?: Object = {},
    routePathOverride?: string,
  ): string {
    const routePath = routePathOverride || this.getRoutePath();
    const basePath = `${routePath}${pathVariables}`;

    // By default, the path '/' is provided if the endpoint uses the base
    // path (for reference purposes).  Remove the slash prior to building
    // the endpoint.
    const lastChar = basePath.slice(-1);
    const fullPath = (lastChar === '/') ? basePath.slice(0, -1) : basePath;

    // If queryArgs were provided, build the corresponding querystring to
    // include the specified arguments.
    const queryArgsString = (queryArgs) ? stringifyQueryArgs(queryArgs) : '';

    // Ensure the key and token is appended to the end of the querystring.
    const authSuffix = stringify(this.auth);
    return `${fullPath}?${queryArgsString}${authSuffix}`;
  }

  /**
   * Returns a resolved Promise with the results of the Trello API call.
   * @param {HttpMethod} httpMethod Method associated with the request.
   * @param {string} pathVariables Path to append to the route path.
   * @param {Object} [queryArgs={}] Arguments for building the querystring.
   * @param {string} [routePathOverride=''] Alternate route path for the
   *    endpoint.
   * @param {Object} [data={}] Data to include in the body of the request.
   * @returns {Promise}
   * @private
   */
  _performRequest(
    httpMethod: HttpMethod,
    pathVariables: string,
    queryArgs?: Object = {},
    routePathOverride?: string = '',
    data?: Object = {},
  ): Promise.resolve<*> {
    const endpoint = this.getEndpoint(pathVariables, queryArgs,
      routePathOverride);
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
   * Builds the help link for referencing the Trello API based on the
   *    resource.
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
    const { resourceName } = this;
    return `${resourceName}#${httpMethod}-1-${resourceName}s-${resourceName}-id-${fieldName}`;
  }

  httpGet(
    pathVariables: string,
    queryArgs?: Object = {},
    routePathOverride?: string = '',
  ): Promise<Object> {
    return this._performRequest('get', pathVariables, queryArgs,
      routePathOverride);
  }

  httpPut(
    pathVariables: string,
    queryArgs?: Object = {},
    routePathOverride?: string = '',
    data?: Object = {},
  ): Promise<Object> {
    return this._performRequest('put', pathVariables, queryArgs,
      routePathOverride, data);
  }

  httpPost(
    pathVariables: string,
    queryArgs?: Object = {},
    routePathOverride?: string = '',
    data?: Object = {},
  ): Promise<Object> {
    return this._performRequest('post', pathVariables, queryArgs,
      routePathOverride, data);
  }

  httpDelete(
    pathVariables: string,
    queryArgs?: Object = {},
    routePathOverride?: string = '',
  ): Promise<Object> {
    return this._performRequest('delete', pathVariables, queryArgs,
      routePathOverride);
  }

}
