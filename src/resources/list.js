/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Action from './action';
import Board from './board';
import Card from './card';

/* Types */
import type {
  ArgumentGroup,
  BoardField,
  CardField,
  CardFilter,
  PositionNumbered,
} from '../types';

export type ListField = 'closed' | 'idBoard' | 'name' | 'pos' | 'subscribed';

export type ListFilter = 'all' | 'closed' | 'none' | 'open';

/**
 * @namespace List
 */
export default class List extends BaseResource {
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

  getFieldValue(field: ListField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  getFilteredLists(filter: ListFilter): Promise<*> {
    return this.httpGet('/', { filter });
  }

  actions() {
    return new Action(this.auth, `${this.routePath}/actions`);
  }

  board() {
    return new Board(this.auth, `${this.routePath}/board`);
  }

  cards() {
    return new Card(this.auth, `${this.routePath}/cards`);
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

  moveToBoard(
    boardId: string,
    queryArgs?: {
      pos?: PositionNumbered,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', { value: boardId, ...queryArgs });
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
      idBoard?: string,
      idListSource?: string,
      pos?: PositionNumbered,
    },
  ): Promise<*> {
    if (this.routePathElements[0] === 'boards') {
      queryArgs.idBoard = this.routePathElements[1];
    }
    return this.httpPost('/', queryArgs);
  }

  archiveAllCards(): Promise<*> {
    return this.httpPost('/archiveAllCards');
  }

  moveAllCards(
    queryArgs: {
      idBoard: string,
      idList: string,
    },
  ): Promise<*> {
    return this.httpPost('/moveAllCards', queryArgs);
  }
}
