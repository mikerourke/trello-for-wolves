/* @flow */

/* Internal dependencies */
import request from '../lib/request';

/* Types */
import type { Auth } from '../types';

export default class Board {
  auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }

  getById(id: string, urlArguments: Object) {
    return new Promise((resolve, reject) => {
      request(this.auth, 'GET', `boards/${id}`, urlArguments)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}
