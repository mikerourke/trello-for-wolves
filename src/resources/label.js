/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Board from './board';

/* Types */
import type {
  ArgumentGroup,
  Auth,
  FieldsQueryArg,
  LabelColor,
  LabelField,
  LimitQueryArg,
  ResourceConstructorOptions,
} from '../types';

export type LabelColor =
  'blue'
  | 'green'
  | 'orange'
  | 'purple'
  | 'red'
  | 'yellow';

export type LabelField = 'color' | 'idBoard' | 'name' | 'uses';

type LabelChangeQueryArgs = {
  name: string,
  color: ?LabelColor,
};

export default class Label extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'label', options);
  }

  getLabel(
    queryArgs?: {
      fields?: ArgumentGroup<LabelField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getLabels(
    queryArgs?: FieldsQueryArg<LabelField> &
      LimitQueryArg = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  board() {
    return new Board(this.auth, this.getOptionsForChild('', '/board'))
  }

  updateLabel(
    queryArgs?: {
      name?: string,
      color: ?LabelColor,
    } = {},
  ) {
    return this.httpPut('/', queryArgs);
  }

  updateColor(value: ?LabelColor) {
    return this.httpPut('/color', { value });
  }

  updateName(value: string) {
    return this.httpPut('/name', { value });
  }

  addLabel(
    queryArgs: {
      name: string,
      color: ?LabelColor,
      idBoard: string,
    },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  deleteLabel() {
    return this.httpDelete('/');
  }
}
