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
  PositionNumbered,
  ResourceConstructorOptions,
} from '../types';

export type ListField = 'closed' | 'idBoard' | 'name' | 'pos' | 'subscribed';

export type ListFilter = 'all' | 'closed' | 'none' | 'open';

/**
 * @namespace List
 */
export default class List extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'list', options);
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
    return new Action(this.auth, this.getOptionsForChild());
  }

  board(boardId?: string = '') {
    const resourcePath = boardId ? '/idBoard' : 'board';
    return new Board(this.auth, this.getOptionsForChild(boardId, resourcePath));
  }

  cards() {
    return new Card(this.auth, this.getOptionsForChild());
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

  updateName(value: string): Promise<*> {
    return this.httpPut('/name', { value });
  }

  updatePosition(value: PositionNumbered): Promise<*> {
    return this.httpPut('/pos', { value });
  }

  updatedSubscribed(value: boolean): Promise<*> {
    return this.httpPut('/subscribed', { value });
  }

  /**
   * Associates a list with a Card.
   * @example PUT /1/cards/:cardId/idList
   * @memberOf Card
   * @see {@link https://developers.trello.com/advanced-reference/card#put-1-cards-card-id-or-shortlink-idlist}
   */
  associateList(): Promise<*> {
    // See associateMember in the Member class for explanation:
    const listId = this.instanceId;
    this.instanceId = '';
    return this.httpPut('/', { value: listId });
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
