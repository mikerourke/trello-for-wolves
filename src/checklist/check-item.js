/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  CheckItemField,
  CheckItemState,
  CheckItemStateField,
  FieldsQueryArg,
  Position,
  ResourceConstructorOptions,
  ValueQueryArg,
} from '../types';

export default class CheckItem extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'checkItem', options);
  }

  getCheckItem(
    queryArgs?: FieldsQueryArg<CheckItemField> = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getCheckItemStates(
    queryArgs?: FieldsQueryArg<CheckItemStateField> = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  updateCheckItem(queryArgs?: {
    name?: string,
    state?: CheckItemState,
    idChecklist?: string,
    pos?: Position | number,
  } = {}): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateCheckItemName(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/name', queryArgs);
  }

  updateCheckItemPos(queryArgs: ValueQueryArg<Position | number>): Promise<*> {
    return this.httpPut('/pos', queryArgs);
  }

  updateCheckItemState(queryArgs: ValueQueryArg<CheckItemState>): Promise<*> {
    return this.httpPut('/state', queryArgs);
  }
}
