/* @flow */

import Action from './action';
import Batch from './batch';
import Board from './board';
import Card from './card';
// import Checklist from './checklist';
import Label from './label';
// import List from './list';
// import Member from './member';
// import Notification from './notification';
// import Organization from './organization';
// import Search from './search';
// import Token from './token';
// import Type from './type';
// import Webhook from './webhook';

/* Types */
import type { Auth } from './types';

export default class Trello {
  auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }

  actions(actionId?: string = ''): Object {
    return new Action(this.auth, { instanceId: actionId });
  }

  boards(boardId?: string = ''): Object {
    return new Board(this.auth, { instanceId: boardId });
  }
}
