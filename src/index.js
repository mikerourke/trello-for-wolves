/* @flow */

/* Internal dependencies */
import entities from './entities';

export default class Trello {
  auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }

  action(): Object {
    return new entities.Action(this.auth);
  }

  board(boardId: string): Object {
    return new entities.Board(this.auth, boardId);
  }
}
