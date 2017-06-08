/* @flow */

/* Internal dependencies */
//import {
//  Action,
//  Batch,
//  Board,
//  Card,
//  Checklist,
//  Label,
//  List,
//  Member,
//  Notification,
//  Organization,
//  Search,
//  Token,
//  Type,
//  Webhook,
//} from './resources';
import Action from './resources/action';
import Batch from './resources/batch';
import Board from './resources/board';
import Card from './resources/card';
import Checklist from './resources/checklist';
import Label from './resources/label';
import List from './resources/list';
import Member from './resources/member';
import Notification from './resources/notification';
import Organization from './resources/organization';
import Search from './resources/search';
import Token from './resources/token';
import Type from './resources/type';
import Webhook from './resources/webhook';

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

  batch(): Object {
    return new Batch(this.auth);
  }

  boards(boardId?: string = ''): Object {
    return new Board(this.auth, { instanceId: boardId });
  }

  cards(cardId?: string = ''): Object {
    return new Card(this.auth, { instanceId: cardId });
  }

  checklists(checklistId?: string = ''): Object {
    return new Checklist(this.auth, { instanceId: checklistId });
  }

  labels(labelId?: string = ''): Object {
    return new Label(this.auth, { instanceId: labelId });
  }

  lists(listId?: string = ''): Object {
    return new List(this.auth, { instanceId: listId });
  }

  members(memberIdOrUsername?: string = ''): Object {
    return new Member(this.auth, { instanceId: memberIdOrUsername });
  }

  notifications(notificationId?: string = ''): Object {
    return new Notification(this.auth, { instanceId: notificationId });
  }

  organizations(orgIdOrName?: string = ''): Object {
    return new Organization(this.auth, { instanceId: orgIdOrName });
  }

  search(): Object {
    return new Search(this.auth);
  }

  tokens(tokenName?: string = ''): Object {
    return new Token(this.auth, { instanceId: tokenName });
  }

  types(teamOrUserId?: string = ''): Object {
    return new Type(this.auth, { instanceId: teamOrUserId });
  }

  webhooks(webhookId?: string = ''): Object {
    return new Webhook(this.auth, { instanceId: webhookId });
  }
}
