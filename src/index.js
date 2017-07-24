/* @flow */

/* Internal dependencies */
import Action from './resources/action';
import Batch from './resources/batch';
import Board from './resources/board';
import Card from './resources/card';
import Checklist from './resources/checklist';
import Enterprise from './resources/enterprise';
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
import type { Config } from './types';

export default class Trello {
  config: Config; // eslint-disable-line no-undef

  constructor(config: Config) {
    this.config = config;
  }

  actions(actionId?: string = ''): Object {
    return new Action(this.config, `/actions/${actionId}`);
  }

  batch(): Object {
    return new Batch(this.config, '/batch');
  }

  boards(boardId?: string = ''): Object {
    return new Board(this.config, `/boards/${boardId}`);
  }

  cards(cardId?: string = ''): Object {
    return new Card(this.config, `/cards/${cardId}`);
  }

  checklists(checklistId?: string = ''): Object {
    return new Checklist(this.config, `/checklists/${checklistId}`);
  }

  /* istanbul ignore next: I can't test these with my current membership level. */
  enterprises(enterpriseId?: string = ''): Object {
    return new Enterprise(this.config, `/enterprise/${enterpriseId}`);
  }

  labels(labelId?: string = ''): Object {
    return new Label(this.config, `/labels/${labelId}`);
  }

  lists(listId?: string = ''): Object {
    return new List(this.config, `/lists/${listId}`);
  }

  members(memberIdOrUsername?: string = ''): Object {
    return new Member(this.config, `/members/${memberIdOrUsername}`);
  }

  /* istanbul ignore next: Need to figure out how to trigger Notifications. */
  notifications(notificationId?: string = ''): Object {
    return new Notification(this.config, `/notifications/${notificationId}`);
  }

  organizations(orgIdOrName?: string = ''): Object {
    return new Organization(this.config, `/organizations/${orgIdOrName}`);
  }

  search(): Object {
    return new Search(this.config, '/search');
  }

  tokens(tokenName?: string = ''): Object {
    return new Token(this.config, `/tokens/${tokenName}`);
  }

  types(): Object {
    return new Type(this.config, '/types');
  }

  /* istanbul ignore next: Need a valid callback URL to create Webhooks. */
  webhooks(webhookId?: string = ''): Object {
    return new Webhook(this.config, `/webhooks/${webhookId}`);
  }
}
