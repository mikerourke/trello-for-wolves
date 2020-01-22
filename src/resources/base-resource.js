// @flow
import { stringify } from 'qs';
import stringifyQueryArgs from '../utils/queryArgsStringifier';
import performApiRequest from '../utils/apiRequest';
import type { Config, HttpMethod } from '../types';

/**
 * Base class for resources.
 */
export default class BaseResource {
  config: Config;
  routePath: string;
  routePathElements: Array<string>;
  associationId: string;

  /**
   * @param {Config} config Config object containing Trello API key and token.
   * @param {string} routePath Route path for performing the request.
   * @param {string} associationId Id number of the associated resource to
   *    update.
   * @constructor
   */
  constructor(
    config: Config,
    routePath: string,
    associationId?: string = '',
  ) {
    this.config = config;
    this.routePath = routePath;
    this.associationId = associationId;

    // Ensure that the first element in the array has a length greater than
    // zero:
    this.routePathElements = this.routePath.split('/');

    /* istanbul ignore next */
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
    // Check if queryArgs were specified to ensure the stringify function is only called if
    // necessary.
    let argsToUse = queryArgs;
    let hasQueryArgs = false;
    if (Object.keys(argsToUse).length !== 0) {
      // We don't want to attempt to stringify the 'file' query arg.
      const { file, ...otherArgs } = queryArgs; // eslint-disable-line
      argsToUse = otherArgs;
      hasQueryArgs = true;
    }

    // Build the base path based on the current path.  This ensures that the path can
    // continue to be appended without being overwritten.
    const basePath = `${this.routePath}${pathVariables}`;

    // Remove any consecutive and trailing slashes.
    const sanitizedPath = basePath.replace(/\/+/g, '/').replace(/\/+$/, '');

    // If queryArgs were provided, build the corresponding querystring to
    // include the specified arguments.
    const queryString = hasQueryArgs ? stringifyQueryArgs(argsToUse) : '';

    // Ensure the key and token is appended to the end of the querystring.
    const { key, token } = this.config;
    const authSuffix = stringify({ key, token });
    return `${sanitizedPath}?${queryString}${authSuffix}`;
  }

  /**
   * Performs the request to the Trello API.
   * @param {HttpMethod} httpMethod Method to perform (GET, DELETE, POST, PUT).
   * @param {string} pathVariables Path to append to end of resource path.
   * @param {Object} queryArgs Query args to build the final endpoint.
   * @returns {Promise}
   */
  performRequest(
    httpMethod: HttpMethod,
    pathVariables: string,
    queryArgs?: Object,
  ): Promise<any> {
    const endpoint = this.getEndpoint(pathVariables, queryArgs);
    const { backoffTime = 3, maxWaitingTime = 300 } = this.config;
    return performApiRequest(httpMethod, endpoint, backoffTime, maxWaitingTime, queryArgs);
  }

  httpGet(
    pathVariables: string,
    queryArgs?: Object,
  ): Promise<Object> {
    return this.performRequest('get', pathVariables, queryArgs);
  }

  httpPut(
    pathVariables: string,
    queryArgs?: Object,
  ): Promise<Object> {
    return this.performRequest('put', pathVariables, queryArgs);
  }

  httpPost(
    pathVariables: string,
    queryArgs?: Object,
  ): Promise<Object> {
    return this.performRequest('post', pathVariables, queryArgs);
  }

  httpDelete(
    pathVariables: string,
    queryArgs?: Object,
  ): Promise<Object> {
    return this.performRequest('delete', pathVariables, queryArgs);
  }
}
