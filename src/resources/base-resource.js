/* @flow */

/* External dependencies */
import { stringify } from 'querystring';
import axios from 'axios';
import Promise from 'bluebird';

/* Internal dependencies */
import { ApiCallResponseError } from '../utils/errors';
import stringifyQueryArgs from '../utils/query-args-stringifier';

/* Types */
import type { Auth } from '../types';

export type ResourceConstructorOptions = {
  instanceId?: string,
  parentPath?: string,
  resourcePath?: string,
};

type HttpMethod = 'get' | 'put' | 'post' | 'delete';

/**
 * Base class for resources.
 */
export default class BaseResource {
  auth: Auth;
  instanceId: string;
  resourcePath: string;
  _resourceName: string;
  _parentPath: string;

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
    this.instanceId = instanceId;
    this.resourcePath = resourcePath;
    this._resourceName = resourceName;
    this._parentPath = parentPath;
  }

  getParent(): Object {
    if (!this._parentPath) {
      return {
        parentName: '',
        parentId: '',
      };
    }
    const pathElements = this._parentPath.split('/');

    // Ensure that the first element in the array has a length greater than
    // zero:
    const elementIndex = pathElements[0].length ? 0 : 1;
    return {
      parentName: pathElements[elementIndex],
      parentId: pathElements[elementIndex + 1],
    };
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
    let parentPathToUse = `/${this._resourceName}s/${this.instanceId}`;
    if (this._parentPath) {
      parentPathToUse = `${this._parentPath}${parentPathToUse}`;
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
    // construct it based on the resource name and Id.
    let resourcePathToUse = this.resourcePath;
    if (resourcePathToUse === '') {
      resourcePathToUse = `${this._resourceName}s`;
      if (this.instanceId) {
        resourcePathToUse = `${resourcePathToUse}/${this.instanceId}`;
      }
    }

    // Ensure there is a slash between the parent and resource path if the
    // parent path was specified.
    const pathSeparator = this._parentPath && '/';

    // Combine the parent and resource paths to form the route path.
    return `${this._parentPath}${pathSeparator}${resourcePathToUse}`;
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

    // Remove any consecutive and trailing slashes.
    const sanitizedPath = basePath
      .replace(/\/+/g, '/')
      .replace(/\/+$/, '');

    // If queryArgs were provided, build the corresponding querystring to
    // include the specified arguments.
    const queryArgsString = (queryArgs) ? stringifyQueryArgs(queryArgs) : '';

    // Ensure the key and token is appended to the end of the querystring.
    const authSuffix = stringify(this.auth);
    return `${sanitizedPath}?${queryArgsString}${authSuffix}`;
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

    // One more check is done to ensure there are no consecutive slashes.
    const sanitizedUrl = `api.trello.com/1/${endpoint}`.replace(/\/+/g, '/');

    return new Promise((resolve, reject) => {
      axios({
        data,
        method: httpMethod,
        url: `https://${sanitizedUrl}`,
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
