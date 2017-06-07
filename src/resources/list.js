/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Action from './action';
import Board from './board';
import Card from './card';

/* Types */
import type {
  ArgumentGroup,
  Auth,
  BoardField,
  CardField,
  CardFilter,
  LabelColor,
  PositionNumbered,
  ResourceConstructorOptions,
} from '../types';

export type ListFilter = 'all' | 'closed' | 'none' | 'open';

export type ListField = 'closed' | 'idBoard' | 'name' | 'pos' | 'subscribed';

export default class List extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'list', options);
  }

  getList(
    queryArgs?: {
      cards?: CardFilter,
      cardFields?: ArgumentGroup<CardField>,
      board?: boolean,
      boardFields?: ArgumentGroup<BoardField>,
      fields?: ArgumentGroup<ListField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getLists(
    queryArgs?: {
      cards?: CardFilter,
      cardFields?: ArgumentGroup<CardField>,
      filter?: ListFilter,
      fields?: ArgumentGroup<ListField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: ListField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  getFilteredLists(filter: ListFilter): Promise<*> {
    return this.httpGet('/', { filter });
  }

  actions() {
    return new Action(this.auth, this.getOptionsForChild());
  }

  board() {
    return new Board(this.auth, this.getOptionsForChild('', '/board'))
  }

  cards() {
    return new Card(this.auth, this.getOptionsForChild())
  }

  updateList(
    queryArgs?: {
      name?: string,
      closed?: boolean,
      idBoard?: string,
      pos?: PositionNumbered,
      subscribed?: boolean,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateClosedStatus(value: boolean): Promise<*> {
    return this.httpPut('/closed', { value });
  }

  updateIdBoard(
    queryArgs: {
      value: string,
      pos?: PositionNumbered,
    },
  ): Promise<*> {
    return this.httpPut('/idBoard', queryArgs);
  }

  updateName(value: string): Promise<*> {
    return this.httpPut('/name', { value });
  }

  updatePosition(value: PositionNumbered): Promise<*> {
    return this.httpPut('/pos', { value });
  }

  updatedSubscribed(value: boolean): Promise<*> {
    return this.httpPut('/subscribed', { value });
  }

  addList(
    queryArgs: {
      name: string,
      idBoard: string,
      idListSource?: string,
      pos?: PositionNumbered,
    },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  archiveAllCards() {
    return this.httpPost('/archiveAllCards');
  }

  addToCard(
    queryArgs: {
      name: string,
      desc?: string,
      labels?: ArgumentGroup<LabelColor>,
      idMembers?: Array<string>,
      due?: ?Date,
    },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }


  moveAllCards(
    queryArgs: {
      idBoard: string,
      idList: string,
    },
  ) {
    return this.httpPost('/moveAllCards', queryArgs);
  }
}
