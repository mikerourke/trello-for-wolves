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

  updateCheckItem(queryArgs?: {
    name?: string,
    state?: CheckItemState,
    idChecklist?: string,
    pos?: PositionNumbered,
  } = {}): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateName(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/name', queryArgs);
  }

  updatePosition(queryArgs: ValueQueryArg<PositionNumbered>): Promise<*> {
    return this.httpPut('/pos', queryArgs);
  }

  updateState(queryArgs: ValueQueryArg<CheckItemState>): Promise<*> {
    return this.httpPut('/state', queryArgs);
  }
}
