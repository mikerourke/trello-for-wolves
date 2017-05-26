/* @flow */

/* External dependencies */
import axios from 'axios';
import Promise from 'bluebird';

/* Internal dependencies */
import { buildUrlString } from './string-builder';

/* Types */
import type { Auth, HttpMethod } from '../types';

/**
 * Performs the HTTP request to the Trello API and returns a Promis that
 *    resolves with the results.
 * @param {Auth} auth Object containing API key and token.
 * @param {HttpMethod} method HTTP method to perform.
 * @param {string} endpoint Trello API endpoint.
 * @param {Object} [urlArgs={}] Options associated with the endpoint.
 * @param {Object} [data={}] Data to include in the body of the request.
 */
const performRequest = (
  auth: Auth,
  method: HttpMethod,
  endpoint: string,
  urlArgs?: Object = {},
  data?: Object = {},
) =>
  new Promise((resolve, reject) => {
    const url = buildUrlString(auth, endpoint, urlArgs);
    const apiUrl = `https://api.trello.com/1/${url}`;
    const requestConfig = {
      data,
      method,
      url: apiUrl,
    };
    axios(requestConfig)
      .then(response => resolve(response))
      .catch(error => reject('Error performing request', error));
  });

export default performRequest;
