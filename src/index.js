/* @flow */

/* Internal dependencies */
import entities from './entities';

export default class Trello {
  constructor(auth) {
    this.auth = auth;
  }

  get action() {
    return new entities.Action(this.auth);
  }
}
