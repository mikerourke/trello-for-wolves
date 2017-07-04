/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  AllOrNone,
  ArgumentGroup,
  PositionNumbered,
} from '../types';

export type CheckItemField = 'name' | 'nameData' | 'pos' | 'state';

export type CheckItemState = 'complete' | 'false' | 'incomplete' | 'true';

export type CheckItemStateField = 'idCheckItem' | 'state';

/**
 * @namespace CheckItem
 */
export default class CheckItem extends BaseResource {
  getCheckItems(
    queryArgs?: {
      filter?: AllOrNone,
      fields?: ArgumentGroup<CheckItemField>,
    },
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getCheckItem(
    queryArgs?: {
      fields?: ArgumentGroup<CheckItemField>,
    },
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getCheckItemStates(
    queryArgs?: {
      fields?: ArgumentGroup<CheckItemStateField>,
    },
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  updateCheckItem(
    queryArgs?: {
      name?: string,
      state?: CheckItemState,
      pos?: PositionNumbered,
      idChecklist?: ?string,
    },
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

  convertToCard(): Promise<*> {
    return this.httpPost('/convertToCard');
  }

  deleteCheckItem(): Promise<*> {
    return this.httpDelete('/');
  }
}
