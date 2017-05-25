/* @flow */

/* Internal dependencies */
import request from '../lib/request';

/* Types */
import type { Auth } from '../../internals/types';

export default class Member {
  auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }
}
