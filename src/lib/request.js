/* @flow */

/* External dependencies */
import axios from 'axios';

/* Types */
import type { Auth } from '../types';

const getUrlSuffixForAuth = (auth: Auth): string => {
  const { key, token = '' } = auth;
  let urlSuffix = `key=${key}`;
  if (token) {
    urlSuffix = `${urlSuffix}&token=${token}`;
  }
  return urlSuffix;
};

const buildUrlString = (auth, endpoint, urlArguments) => {
  let urlString = `${endpoint}?`;
  if (urlArguments) {
    Object.entries(urlArguments).forEach(([key, value]) => {
      const argValue: string = (value: any);
      urlString = `${urlString}${key}=${argValue}&`;
    });
  }
  const authSuffix = getUrlSuffixForAuth(auth);
  return `${urlString}${authSuffix}`;
};

const performRequest = (
  method: string,
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
    console.log(requestConfig);
    axios(requestConfig)
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
