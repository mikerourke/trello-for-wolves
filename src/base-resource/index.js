/* @flow */

/* External dependencies */
import { stringify } from 'querystring';
import axios from 'axios';
import Promise from 'bluebird';

/* Internal dependencies */
import { ApiCallResponseError } from '../utils/errors';
import stringifyQueryArgs from '../utils/query-args-stringifier';

/* Types */
import type {
  Auth,
  ResourceConstructorOptions,
} from '../types';

type HttpMethod = 'get' | 'put' | 'post' | 'delete';

/**
 * Base class for resources.
 */
export default class BaseResource {
  auth: Auth;
  resourceName: string;
  instanceId: string;
  parentPath: string;
  resourcePath: string;

  /**
   * @param {Auth} auth Auth object containing Trello API key and token.
   * @param {string} resourceName Name of resource.
   * @param {Object} options Options for performing requests on the resource.
   * @param {string} [options.instanceId=''] Id of the resource instance.
   * @param {string} [options.parentPath=''] Parent path for constructing the
   *    route path.
   * @param {string} [options.resourcePath=''] Resource path override for
   *    performing requests.
   * @constructor
   */
  constructor(
    auth: Auth,
    resourceName: string,
    options?: ResourceConstructorOptions = {},
  ) {
    const { instanceId = '', parentPath = '', resourcePath = '' } = options;
    this.auth = auth;
    this.resourceName = resourceName;
    this.instanceId = instanceId;
    this.parentPath = parentPath;
    this.resourcePath = resourcePath;
  }

  /**
   * Returns the constructor options object for passing to the constructor
   *    of a child resource (e.g. creating an "actions" instance in a "board").
   * @param {string} [childId=''] Id of the child resource.
   * @param {string} [resourcePath=''] Resource path to use in the child
   *    resource instance.
   * @returns {Object}
   */
  getOptionsForChild(
    childId?: string = '',
    resourcePath?: string = '',
  ): ResourceConstructorOptions {
    // If there was a parent path present for the parent resource, make sure
    // this is included in the parent path for the child resource.
    // An example of a path that meets these conditions is:
    // /boards/:boardId/members/:memberId/cards
    let parentPathToUse = `/${this.resourceName}s/${this.instanceId}`;
    if (this.parentPath) {
      parentPathToUse = `${this.parentPath}${parentPathToUse}`;
    }
    return {
      instanceId: childId,
      resourcePath,
      parentPath: parentPathToUse,
    };
  }

  /**
   * Constructs the full route path based on the parent and resource
   *    path values.
   * @returns {string}
   */
  getRoutePath() {
    // If the resource path was manually specified, use that, otherwise
    // construct it based on the resource name and ID.
    let resourcePathToUse = this.resourcePath;
    if (resourcePathToUse === '') {
      resourcePathToUse = `${this.resourceName}s`;
      if (this.instanceId) {
        resourcePathToUse = `${resourcePathToUse}/${this.instanceId}`;
      }
    }

    // Ensure there is a slash between the parent and resource path if the
    // parent path was specified.
    const pathSeparator = this.parentPath && '/';

    // Combine the parent and resource paths to form the route path.
    const fullPath = `${this.parentPath}${pathSeparator}${resourcePathToUse}`;

    // Ensure there are no double slashes in the final path.
    return fullPath.replace('//', '/');
  }

  /**
   * Constructs the endpoint for performing the API request.
   * @param {string} pathVariables Path to append to the route path.
   * @param {Object} [queryArgs={}] Optional arguments specified for performing
   *    the request.
   * @returns {string} Endpoint for performing the request.
   */
  getEndpoint(
    pathVariables: string,
    queryArgs?: Object = {},
  ): string {
    const routePath = this.getRoutePath();
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
   * @param {Object} [data={}] Data to include in the body of the request.
   * @returns {Promise}
   * @private
   */
  _performRequest(
    httpMethod: HttpMethod,
    pathVariables: string,
    queryArgs?: Object = {},
    data?: Object = {},
  ): Promise<*> {
    const endpoint = this.getEndpoint(pathVariables, queryArgs);
    // TODO: Remove this after testing.
    console.log(`ENDPOINT: ${endpoint}`);

    return new Promise((resolve, reject) => {
      axios({
        data,
        method: httpMethod,
        url: `https://api.trello.com/1/${endpoint}`,
      })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          if (error.response) {
            reject(new ApiCallResponseError(error.response));
          } else if (error.request) {
            // TODO: Create custom error for API Request errors.
            reject(error);
          } else {
            // TODO: Create custom error for other API errors.
            reject(error);
          }
        });
    });
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
  ): Promise<Object> {
    return this._performRequest('get', pathVariables, queryArgs);
  }

  httpPut(
    pathVariables: string,
    queryArgs?: Object = {},
    data?: Object = {},
  ): Promise<Object> {
    return this._performRequest('put', pathVariables, queryArgs, data);
  }

  httpPost(
    pathVariables: string,
    queryArgs?: Object = {},
    data?: Object = {},
  ): Promise<Object> {
    return this._performRequest('post', pathVariables, queryArgs, data);
  }

  httpDelete(
    pathVariables: string,
    queryArgs?: Object = {},
  ): Promise<Object> {
    return this._performRequest('delete', pathVariables, queryArgs);
  }
}
