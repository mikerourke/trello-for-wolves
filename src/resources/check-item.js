// @flow
import { generateTypeMap } from '../utils/type-mapper';
import BaseResource from './base-resource';
import type {
  AllOrNone,
  ArgumentGroup,
  PositionNumbered,
} from '../types';

export const checkItemFieldMap = generateTypeMap('name', 'nameData', 'pos', 'state');
export type CheckItemField = $Keys<typeof checkItemFieldMap>;

export const checkItemStateMap = generateTypeMap('complete', 'false', 'incomplete', 'true');
export type CheckItemState = $Keys<typeof checkItemStateMap>;

export const checkItemStateFieldMap = generateTypeMap('idCheckItem', 'state');
export type CheckItemStateField = $Keys<typeof checkItemStateFieldMap>;

/**
 * @namespace CheckItem
 */
export default class CheckItem extends BaseResource {
  getCheckItems(
    queryArgs?: {
      filter?: AllOrNone,
      fields?: ArgumentGroup<CheckItemField>,
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getCheckItem(
    queryArgs?: {
      fields?: ArgumentGroup<CheckItemField>,
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getCheckItemStates(
    queryArgs?: {
      fields?: ArgumentGroup<CheckItemStateField>,
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  updateCheckItem(
    queryArgs?: {
      name?: string,
      state?: CheckItemState,
      pos?: PositionNumbered,
      idChecklist?: ?string,
    },
  ): Promise<any> {
    return this.httpPut('/', queryArgs);
  }

  updateName(value: string): Promise<any> {
    return this.httpPut('/name', { value });
  }

  updatePosition(value: PositionNumbered): Promise<any> {
    return this.httpPut('/pos', { value });
  }

  updateState(value: CheckItemState): Promise<any> {
    return this.httpPut('/state', { value });
  }

  addCheckItem(
    queryArgs: {
      name: string,
      pos?: PositionNumbered,
      checked?: boolean,
    },
  ): Promise<any> {
    return this.httpPost('/', queryArgs);
  }

  convertToCard(): Promise<any> {
    return this.httpPost('/convertToCard');
  }

  deleteCheckItem(): Promise<any> {
    return this.httpDelete('/');
  }
}
