import BaseResource from './baseResource';
import { AllOrNone, ArgumentGroup, PositionNumbered } from '../types';

export type CheckItemField = 'name' | 'nameData' | 'pos' | 'state';

export type CheckItemState = 'complete' | 'false' | 'incomplete' | 'true';

export type CheckItemStateField = 'idCheckItem' | 'state';

/**
 * @namespace CheckItem
 */
export default class CheckItem extends BaseResource {
  public getCheckItems = (queryArgs?: {
    filter?: AllOrNone;
    fields?: ArgumentGroup<CheckItemField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getCheckItem = (queryArgs?: {
    fields?: ArgumentGroup<CheckItemField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getCheckItemStates = (queryArgs?: {
    fields?: ArgumentGroup<CheckItemStateField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public updateCheckItem = (queryArgs?: {
    name?: string;
    state?: CheckItemState;
    pos?: PositionNumbered;
    idChecklist?: string | null;
  }): Promise<any> => this.httpPut('/', queryArgs);

  public updateName = (value: string): Promise<any> =>
    this.httpPut('/name', { value });

  public updatePosition = (value: PositionNumbered): Promise<any> =>
    this.httpPut('/pos', { value });

  public updateState = (value: CheckItemState): Promise<any> =>
    this.httpPut('/state', { value });

  public addCheckItem = (queryArgs: {
    name: string;
    pos?: PositionNumbered;
    checked?: boolean;
  }): Promise<any> => this.httpPost('/', queryArgs);

  public convertToCard = (): Promise<any> => this.httpPost('/convertToCard');

  public deleteCheckItem = (): Promise<any> => this.httpDelete('/');
}
