/* @flow */

/* External dependencies */
import { stringify } from 'querystring';

/* Internal dependencies */
import stringifyQueryArgs from '../utils/query-args-stringifier';
import performApiRequest from '../utils/api-request';

/* Types */
import type { Auth, HttpMethod } from '../types';

/**
 * Base class for resources.
 */
export default class BaseResource {
  /* eslint-disable no-undef */
  auth: Auth;
  routePath: string;
  routePathElements: Array<string>;
  associationId: string;
  /* eslint-enable no-undef */

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
    // We don't want to attempt to stringify the 'file' query arg.
    const { file = {}, ...otherArgs } = queryArgs; // eslint-disable-line

    // Build the base path based on the current path.  This ensures that the path can
    // continue to be appended without being overwritten.
    const basePath = `${this.routePath}${pathVariables}`;

    // Remove any consecutive and trailing slashes.
    const sanitizedPath = basePath.replace(/\/+/g, '/').replace(/\/+$/, '');

    // If queryArgs were provided, build the corresponding querystring to
    // include the specified arguments.
    const queryString = (otherArgs) ? stringifyQueryArgs(otherArgs) : '';

    // Ensure the key and token is appended to the end of the querystring.
    const authSuffix = stringify(this.auth);
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
    queryArgs?: Object = {},
  ): Promise<*> {
    const endpoint = this.getEndpoint(pathVariables, queryArgs);
    return performApiRequest(httpMethod, endpoint, queryArgs);
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
