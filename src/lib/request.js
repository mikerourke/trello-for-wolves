/* @flow */

/* External dependencies */
import axios from 'axios';
import snakeCase from 'lodash.snakecase';

type HttpMethod = 'get' | 'put' | 'post' | 'delete';

/**
 * Builds the string to append to the end of the URL with the API key and
 *    token values.
 * @param {Auth} auth Object containing API key and token.
 * @returns {string}
 */
const getUrlSuffixForAuth = (auth: Auth): string => {
  const { key, token = '' } = auth;
  let urlSuffix = `key=${key}`;
  if (token) {
    urlSuffix = `${urlSuffix}&token=${token}`;
  }
  return urlSuffix;
};

/**
 * Returns the key for building the URL with the correct casing.  The
 *    "options" object passed into the request function has camel cased
 *    keys.  The Trello API's keys are snake cased (with a few exceptions).
 * @param {string} key Camel cased key.
 * @returns {string} Snake cased key.
 */
const getKeyValueForUrl = (key: string): string => {
  let recasedKey: string = snakeCase(key);
  if (recasedKey.includes('member_creator')) {
    recasedKey = recasedKey.replace('_creator', 'Creator');
  }
  return recasedKey;
};

/**
 * Creates the URL string that will be used to perform the HTTP request to
 *    the corresponding Trello API endpoint.
 * @param {Auth} auth Object containing API key and token.
 * @param {string} endpoint Trello API endpoint.
 * @param {Object} options Options associated with the endpoint.
 * @returns {string}
 */
const buildUrlString = (
  auth: Auth,
  endpoint: string,
  options?: Object
) => {
  let urlString = `${endpoint}?`;
  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      const argKey: string = getKeyValueForUrl(key);
      const argValue: string = (value: any);
      urlString = `${urlString}${argKey}=${argValue}&`;
    });
  }
  const authSuffix = getUrlSuffixForAuth(auth);
  return `${urlString}${authSuffix}`;
};

/**
 * Performs the HTTP request to the Trello API and returns a Promis that
 *    resolves with the results.
 * @param {HttpMethod} method HTTP method to perform.
 * @param {string} url URL for performing the request.
 * @param {Object} [data={}] Data to include in the body of the request.
 */
const performRequest = (
  method: HttpMethod,
  url: string,
  data?: Object = {},
) =>
  new Promise((resolve, reject) => {
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

export default (
  auth: Auth,
  method: string,
  endpoint: string,
  options?: Object,
  data?: Object,
) =>
  new Promise((resolve, reject) => {
    const url = buildUrlString(auth, endpoint, options);
    performRequest(method, url, data)
      .then(response => resolve(response))
      .catch(error => reject(error));
});
