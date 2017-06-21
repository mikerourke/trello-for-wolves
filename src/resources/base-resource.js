/* @flow */

/* External dependencies */
import { stringify } from 'querystring';
import axios from 'axios';

/* Internal dependencies */
import { ApiCallResponseError } from '../utils/errors';
import stringifyQueryArgs from '../utils/query-args-stringifier';

/* Types */
import type { Auth } from '../types';

type HttpMethod = 'get' | 'put' | 'post' | 'delete';

/**
 * Base class for resources.
 */
export default class BaseResource {
  auth: Auth;
  routePath: string;
  routePathElements: Array<string>;
  associationId: string;

  /**
   * @param {Auth} auth Auth object containing Trello API key and token.
   * @param {string} routePath Route path for performing the request.
   * @param {string} associationId Id number of the associated resource to
   *    update.
   * @constructor
   */
  constructor(
    auth: Auth,
    routePath: string,
    associationId?: string = '',
  ) {
    this.auth = auth;
    this.routePath = routePath;
    this.associationId = associationId;

    // Ensure that the first element in the array has a length greater than
    // zero:
    this.routePathElements = this.routePath.split('/');

    if (!this.routePathElements[0].length) {
      this.routePathElements.shift();
    }
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
    const basePath = `${this.routePath}${pathVariables}`;

    // Remove any consecutive and trailing slashes.
    const sanitizedPath = basePath
      .replace(/\/+/g, '/')
      .replace(/\/+$/, '');

    // If queryArgs were provided, build the corresponding querystring to
    // include the specified arguments.
    const queryString = (queryArgs) ? stringifyQueryArgs(queryArgs) : '';

    // Ensure the key and token is appended to the end of the querystring.
    const authSuffix = stringify(this.auth);
    return `${sanitizedPath}?${queryString}${authSuffix}`;
  }

  // eslint-disable-next-line class-methods-use-this
  _handleRequestError(
    error: Object,
    reject: Function,
  ) {
    if (error.response) {
      reject(new ApiCallResponseError(error.response));
    } else if (error.request) {
      // @todo: Create custom error for API Request errors.
      reject(error);
    } else {
      // @todo: Create custom error for other API errors.
      reject(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _attemptRequest(
    httpMethod: HttpMethod,
    cleanUrl: string,
  ): Promise<*> {
    return new Promise((resolve, reject) => {
      axios({
        method: httpMethod,
        url: `https://${cleanUrl}`,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Returns a resolved Promise with the results of the Trello API call.
   * @param {HttpMethod} httpMethod Method associated with the request.
   * @param {string} pathVariables Path to append to the route path.
   * @param {Object} [queryArgs={}] Arguments for building the querystring.
   * @param {Object} [fileProperties={}] Properties of the file to send.
   * @returns {Promise}
   * @private
   */
  _performRequest(
    httpMethod: HttpMethod,
    pathVariables: string,
    queryArgs?: Object = {},
    fileProperties?: Object = {},
  ): Promise<*> {
    return new Promise((resolve, reject) => {
      const endpoint = this.getEndpoint(pathVariables, queryArgs);

      // One more check is done to ensure there are no consecutive slashes.
      const cleanUrl = `api.trello.com/1/${endpoint}`.replace(/\/+/g, '/');

      this._attemptRequest(httpMethod, cleanUrl)
        .then((firstResponse) => {
          resolve(firstResponse);
        })
        .catch((firstError) => {
          if (firstError.response.status === 429) {
            setTimeout(() => {
              this._attemptRequest(httpMethod, cleanUrl)
                .then((secondResponse) => {
                  resolve(secondResponse);
                })
                .catch((secondError) => {
                  this._handleRequestError(secondError, reject);
                });
            }, 1000);
          } else {
            this._handleRequestError(firstError, reject);
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
    fileProperties?: Object = {},
  ): Promise<Object> {
    return this._performRequest(
      'post', pathVariables, queryArgs, fileProperties);
  }

  httpDelete(
    pathVariables: string,
    queryArgs?: Object = {},
  ): Promise<Object> {
    return this._performRequest('delete', pathVariables, queryArgs);
  }
}
