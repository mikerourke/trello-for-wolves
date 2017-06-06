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
  PositionNumbered,
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

  getStates(
    queryArgs?: FieldsQueryArg<CheckItemStateField> = {},
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
}
