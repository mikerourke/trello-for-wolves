/* @flow */

/* External dependencies */
import axios from 'axios';

/* Types */
import type { Auth } from '../types';

const buildUrlString = (auth, endpoint, urlArguments) => {
  let urlString = endpoint;
  if (urlArguments) {
    urlString = `${endpoint}?`;
    Object.keys(urlArguments).forEach((argumentName) => {
      const argumentValue = urlArguments[argumentName];
      urlString = `${urlString}${argumentName}=${argumentValue}&`
    });
  }

  const { key, token = '' } = auth;
  urlString = `${urlString}&key=${key}`;
  if (token) {
    urlString = `${urlString}&token=${token}`;
  }
  return urlString;
};

const performRequest = (
  method: string,
  url: string,
  data?: Object = {}
) =>
  new Promise((resolve, reject) => {
    axios({ method, url })
      .then(response => resolve(response))
      .catch(error => reject('Error performing request', error));
  });

export default (
  auth: Auth,
  method: string,
  endpoint: string,
  urlArguments?: Object,
  data?: Object,
) =>
  new Promise((resolve, reject) => {
    const url = buildUrlString(auth, endpoint, urlArguments);
    performRequest(method, url, data)
      .then(response => resolve(response))
      .catch(error => reject(error));
});
