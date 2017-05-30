/* @flow */

/* External dependencies */
import Promise from 'bluebird';

/* Internal dependencies */
import request from '../lib/request';

/* Types */
import type { Auth } from '../types';

export default class Batch {
  auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }

  makeRequests(urls: Array<string>): Promise<*> {
    return Promise.resolve(request(this.auth, 'get', '/batch', { urls })
      .then(result => result)
      .catch(error => error));
  }
}
