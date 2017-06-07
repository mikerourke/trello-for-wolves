/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  ArgumentGroup,
  Auth,
  PositionNumbered,
  ResourceConstructorOptions,
} from '../types';

export type CheckItemField = 'name' | 'nameData' | 'pos' | 'state' | 'value';

export type CheckItemState = 'complete' | 'false' | 'incomplete' | 'true';

export type CheckItemStateField = 'idCheckItem' | 'state';

export default class CheckItem extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'checkItem', options);
  }

  getCheckItem(
    queryArgs?: {
      fields?: ArgumentGroup<CheckItemField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getStates(
    queryArgs?: {
      fields?: ArgumentGroup<CheckItemStateField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  updateCheckItem(
    queryArgs?: {
      name?: string,
      state?: CheckItemState,
      idChecklist?: string,
      pos?: PositionNumbered,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateName(value: string): Promise<*> {
    return this.httpPut('/name', { value });
  }

  updatePosition(value: PositionNumbered): Promise<*> {
    return this.httpPut('/pos', { value });
  }

  updateState(value: CheckItemState): Promise<*> {
    return this.httpPut('/state', { value });
  }

  addCheckItem(
    queryArgs: {
      name: string,
      pos?: PositionNumbered,
      checked?: boolean,
    },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  deleteCheckItem() {
    return this.httpDelete('/');
  }
}
