/* @flow */

/* Internal dependencies */
import request from '../lib/request';

/* Types */
import type { Auth } from '../types';

export default class Card {
  auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }
}
