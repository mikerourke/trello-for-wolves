/* @flow */

/* External dependencies */
import { stringify } from 'querystring';
import axios from 'axios';
import FormData from 'form-data';
import concat from 'concat-stream';

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

  handleRequestError(
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

  getDataFromFile(file?: Object = {}): Promise<*> {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve({ data: {}, headers: {} });
      }
      const form = new FormData();
      form.append('file', file);
      form
        .on('error', error => reject(error))
        .pipe(concat(
          { encoding: 'buffer' },
          data => resolve({ data, headers: form.getHeaders() })),
        );
    });
  }

  attemptRequest(
    httpMethod: HttpMethod,
    cleanUrl: string,
    file?: Object,
  ): Promise<*> {
    return new Promise((resolve, reject) => {
      this.getDataFromFile(file)
        .then(({ data, headers }) => {
          axios({
            method: httpMethod,
            url: `https://${cleanUrl}`,
            data,
            headers,
          })
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        });
    });
  }

  /**
   * Returns a resolved Promise with the results of the Trello API call.
   * @param {HttpMethod} httpMethod Method associated with the request.
   * @param {string} pathVariables Path to append to the route path.
   * @param {Object} [queryArgs={}] Arguments for building the querystring.
   * @returns {Promise}
   * @private
   */
  performRequest(
    httpMethod: HttpMethod,
    pathVariables: string,
    queryArgs?: Object = {},
  ): Promise<*> {
    return new Promise((resolve, reject) => {
      const { file = {}, ...otherArgs } = queryArgs;
      const endpoint = this.getEndpoint(pathVariables, otherArgs);

      // One more check is done to ensure there are no consecutive slashes.
      const cleanUrl = `api.trello.com/1/${endpoint}`.replace(/\/+/g, '/');

      this.attemptRequest(httpMethod, cleanUrl, file)
        .then((firstResponse) => {
          resolve(firstResponse);
        })
        .catch((firstError) => {
          if (firstError.response.status === 429) {
            setTimeout(() => {
              this.attemptRequest(httpMethod, cleanUrl, file)
                .then((secondResponse) => {
                  resolve(secondResponse);
                })
                .catch((secondError) => {
                  this.handleRequestError(secondError, reject);
                });
            }, 1000);
          } else {
            this.handleRequestError(firstError, reject);
          }
        });
    });
  }

  httpGet(
    pathVariables: string,
    queryArgs?: Object = {},
  ): Promise<Object> {
    return this.performRequest('get', pathVariables, queryArgs);
  }

  httpPut(
    pathVariables: string,
    queryArgs?: Object = {},
  ): Promise<Object> {
    return this.performRequest('put', pathVariables, queryArgs);
  }

  httpPost(
    pathVariables: string,
    queryArgs?: Object = {},
  ): Promise<Object> {
    return this.performRequest('post', pathVariables, queryArgs);
  }

  httpDelete(
    pathVariables: string,
    queryArgs?: Object = {},
  ): Promise<Object> {
    return this.performRequest('delete', pathVariables, queryArgs);
  }
}
