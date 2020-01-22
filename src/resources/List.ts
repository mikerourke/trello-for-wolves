// @flow
import { generateTypeMap } from '../utils/type-mapper';
import BaseResource from './BaseResource';
import Action from './Action';
import Board from './Board';
import Card from './Card';
import type {
  ArgumentGroup,
  BoardField,
  CardField,
  CardFilter,
  PositionNumbered,
} from '../typeDefs';

export const listFieldMap = generateTypeMap('closed', 'idBoard', 'name', 'pos', 'subscribed');
export type ListField = $Keys<typeof listFieldMap>;

export const listFilterMap = generateTypeMap('all', 'closed', 'none', 'open');
export type ListFilter = $Keys<typeof listFilterMap>;

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
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getList(
    queryArgs?: {
      cards?: CardFilter,
      cardFields?: ArgumentGroup<CardField>,
      board?: boolean,
      boardFields?: ArgumentGroup<BoardField>,
      fields?: ArgumentGroup<ListField>,
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getListsFilteredBy(filter: ListFilter): Promise<any> {
    return this.httpGet('/', { filter });
  }

  getFieldValue(field: ListField): Promise<any> {
    return this.httpGet(`/${field}`);
  }

  actions() {
    return new Action(this.config, `${this.routePath}/actions`);
  }

  board() {
    return new Board(this.config, `${this.routePath}/board`);
  }

  cards() {
    return new Card(this.config, `${this.routePath}/cards`);
  }

  updateList(
    queryArgs?: {
      name?: string,
      closed?: boolean,
      idBoard?: string,
      pos?: PositionNumbered,
      subscribed?: boolean,
    },
  ): Promise<any> {
    return this.httpPut('/', queryArgs);
  }

  updateClosedStatus(value: boolean): Promise<any> {
    return this.httpPut('/closed', { value });
  }

  moveToBoard(
    boardId: string,
    queryArgs?: {
      pos?: PositionNumbered,
    },
  ): Promise<any> {
    return this.httpPut('/', { value: boardId, ...queryArgs });
  }

  updateName(value: string): Promise<any> {
    return this.httpPut('/name', { value });
  }

  updatePosition(value: PositionNumbered): Promise<any> {
    return this.httpPut('/pos', { value });
  }

  updateSubscribed(value: boolean): Promise<any> {
    return this.httpPut('/subscribed', { value });
  }

  addList(
    queryArgs: {
      name: string,
      idBoard?: string,
      idListSource?: string,
      pos?: PositionNumbered,
    },
  ): Promise<any> {
    let updatedArgs = queryArgs;
    if (this.routePathElements[0] === 'boards') {
      updatedArgs = { ...queryArgs, idBoard: this.routePathElements[1] };
    }
    return this.httpPost('/', updatedArgs);
  }

  archiveAllCards(): Promise<any> {
    return this.httpPost('/archiveAllCards');
  }

  moveAllCards(
    queryArgs: {
      idBoard: string,
      idList: string,
    },
  ): Promise<any> {
    return this.httpPost('/moveAllCards', queryArgs);
  }
}
