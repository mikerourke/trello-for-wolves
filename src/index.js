/* @flow */

/* Internal dependencies */
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
  auth: Auth; // eslint-disable-line no-undef

  constructor(auth: Auth) {
    this.auth = auth;
  }

  actions(actionId?: string = ''): Object {
    return new Action(this.auth, `/actions/${actionId}`);
  }

  batch(): Object {
    return new Batch(this.auth, '/batch');
  }

  boards(boardId?: string = ''): Object {
    return new Board(this.auth, `/boards/${boardId}`);
  }

  cards(cardId?: string = ''): Object {
    return new Card(this.auth, `/cards/${cardId}`);
  }

  checklists(checklistId?: string = ''): Object {
    return new Checklist(this.auth, `/checklists/${checklistId}`);
  }

  labels(labelId?: string = ''): Object {
    return new Label(this.auth, `/labels/${labelId}`);
  }

  lists(listId?: string = ''): Object {
    return new List(this.auth, `/lists/${listId}`);
  }

  members(memberIdOrUsername?: string = ''): Object {
    return new Member(this.auth, `/members/${memberIdOrUsername}`);
  }

  notifications(notificationId?: string = ''): Object {
    return new Notification(this.auth, `/notifications/${notificationId}`);
  }

  organizations(orgIdOrName?: string = ''): Object {
    return new Organization(this.auth, `/organizations/${orgIdOrName}`);
  }

  search(): Object {
    return new Search(this.auth, '/search');
  }

  tokens(tokenName?: string = ''): Object {
    return new Token(this.auth, `/tokens/${tokenName}`);
  }

  types(): Object {
    return new Type(this.auth, '/types');
  }

  webhooks(webhookId?: string = ''): Object {
    return new Webhook(this.auth, `/webhooks/${webhookId}`);
  }
}
