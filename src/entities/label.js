/* @flow */

/* Internal dependencies */
import request from '../lib/request';

/* Types */
import type { Auth } from '../types';

export default class Label {
  auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }
}
