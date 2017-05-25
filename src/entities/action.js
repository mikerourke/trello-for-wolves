/* @flow */

/* Internal dependencies */
import request from '../lib/request';

export default class Action {
  auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }

  getAction(id: string, urlArguments: Object) {
    return new Promise((resolve, reject) => {
      request(this.auth, 'GET', `actions/${id}`, urlArguments)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}
