/* @flow */

/* Internal dependencies */
import Action from './action';
import Batch from './batch';
import Board from './board';
import Card from './card';
import Checklist from './checklist';
import Label from './label';
import List from './list';
import Member from './member';
import Notification from './notification';
import Organization from './organization';
import Search from './search';
import Token from './token';
import Type from './type';
import Webhook from './webhook';

/* Types */
import type { Auth } from './types';

/**
 * @apiDefine read Read access rights needed.
 */

/**
 * @apiDefine write Write access rights needed.
 */

/**
 * @apiDefine owner Owner access rights needed.
 */

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
