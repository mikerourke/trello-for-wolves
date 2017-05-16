/* @flow */

/* Internal dependencies */
import entities from './entities';

/* Types */
import type { Auth } from './types';

export default class Trello {
  auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }

  get action(): Object {
    return new entities.Action(this.auth);
  }

  get board(): Object {
    return new entities.Board(this.auth);
  }
}
