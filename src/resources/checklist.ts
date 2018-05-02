import BaseResource from './baseResource';
import Board from './board';
import Card, { CardField, CardFilter } from './card';
import CheckItem, { CheckItemField } from './checkItem';
import { AllOrNone, ArgumentGroup, PositionNumbered } from '../types';

export type ChecklistField = 'idBoard' | 'idCard' | 'name' | 'pos';

/**
 * @namespace Checklist
 */
export default class Checklist extends BaseResource {
  public getChecklists = (queryArgs?: {
    cards?: CardFilter;
    cardFields?: ArgumentGroup<CardField>;
    checkItems?: AllOrNone;
    checkItemFields?: ArgumentGroup<CheckItemField>;
    filter?: AllOrNone;
    fields?: ArgumentGroup<ChecklistField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getChecklist = (queryArgs?: {
    cards?: CardFilter;
    cardFields?: ArgumentGroup<CardField>;
    checkItems?: AllOrNone;
    checkItemFields?: ArgumentGroup<CheckItemField>;
    fields?: ArgumentGroup<ChecklistField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getFieldValue = (field: ChecklistField): Promise<any> =>
    this.httpGet(`/${field}`);

  public board = () => new Board(this.config, `${this.routePath}/board`);

  public cards = () => new Card(this.config, `${this.routePath}/cards`);

  public checkItem = (checkItemId: string = '') =>
    new CheckItem(this.config, `${this.routePath}/checkItem/${checkItemId}`);

  public checkItems = (checkItemId: string = '') =>
    new CheckItem(this.config, `${this.routePath}/checkItems/${checkItemId}`);

  public updateChecklist = (queryArgs?: {
    name?: string;
    pos?: PositionNumbered;
  }): Promise<any> => this.httpPut('/', queryArgs);

  public updateName = (value: string): Promise<any> =>
    this.httpPut('/name', { value });

  public updatePosition = (value: PositionNumbered): Promise<any> =>
    this.httpPut('/pos', { value });

  public addChecklist(queryArgs: {
    idCard?: string;
    name?: string;
    pos?: PositionNumbered;
    idChecklistSource?: string;
  }): Promise<any> {
    let updatedArgs = queryArgs;
    if (this.routePathElements[0] === 'cards') {
      updatedArgs = { ...queryArgs, idCard: this.routePathElements[1] };
    }
    return this.httpPost('/', updatedArgs);
  }

  public deleteChecklist = (): Promise<any> => this.httpDelete('/');
}
