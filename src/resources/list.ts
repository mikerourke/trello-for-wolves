import BaseResource from './baseResource';
import Action from './action';
import Board, { BoardField } from './board';
import Card, { CardField, CardFilter } from './card';
import { ArgumentGroup, PositionNumbered } from '../types';

export type ListField = 'closed' | 'idBoard' | 'name' | 'pos' | 'subscribed';

export type ListFilter = 'all' | 'closed' | 'none' | 'open';

/**
 * @namespace List
 */
export default class List extends BaseResource {
  public getLists = (queryArgs?: {
    cards?: CardFilter;
    cardFields?: ArgumentGroup<CardField>;
    filter?: ListFilter;
    fields?: ArgumentGroup<ListField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getList = (queryArgs?: {
    cards?: CardFilter;
    cardFields?: ArgumentGroup<CardField>;
    board?: boolean;
    boardFields?: ArgumentGroup<BoardField>;
    fields?: ArgumentGroup<ListField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getListsFilteredBy = (filter: ListFilter): Promise<any> =>
    this.httpGet('/', { filter });

  public getFieldValue = (field: ListField): Promise<any> =>
    this.httpGet(`/${field}`);

  public actions = () => new Action(this.config, `${this.routePath}/actions`);

  public board = () => new Board(this.config, `${this.routePath}/board`);

  public cards = () => new Card(this.config, `${this.routePath}/cards`);

  public updateList = (queryArgs?: {
    name?: string;
    closed?: boolean;
    idBoard?: string;
    pos?: PositionNumbered;
    subscribed?: boolean;
  }): Promise<any> => this.httpPut('/', queryArgs);

  public updateClosedStatus = (value: boolean): Promise<any> =>
    this.httpPut('/closed', { value });

  public moveToBoard = (
    boardId: string,
    queryArgs?: {
      pos?: PositionNumbered;
    },
  ): Promise<any> => this.httpPut('/', { value: boardId, ...queryArgs });

  public updateName = (value: string): Promise<any> =>
    this.httpPut('/name', { value });

  public updatePosition = (value: PositionNumbered): Promise<any> =>
    this.httpPut('/pos', { value });

  public updateSubscribed = (value: boolean): Promise<any> =>
    this.httpPut('/subscribed', { value });

  public addList(queryArgs: {
    name: string;
    idBoard?: string;
    idListSource?: string;
    pos?: PositionNumbered;
  }): Promise<any> {
    let updatedArgs = queryArgs;
    if (this.routePathElements[0] === 'boards') {
      updatedArgs = { ...queryArgs, idBoard: this.routePathElements[1] };
    }
    return this.httpPost('/', updatedArgs);
  }

  public archiveAllCards = (): Promise<any> =>
    this.httpPost('/archiveAllCards');

  public moveAllCards = (queryArgs: {
    idBoard: string;
    idList: string;
  }): Promise<any> => this.httpPost('/moveAllCards', queryArgs);
}
