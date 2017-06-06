/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  FieldsQueryArg,
  LabelColor,
  LabelField,
  LimitQueryArg,
  ResourceConstructorOptions,
} from '../types';

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

  getLabel(queryArgs?: FieldsQueryArg<LabelField>): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getLabels(
    queryArgs?: FieldsQueryArg<LabelField> &
      LimitQueryArg = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  updateLabel(queryArgs?: LabelChangeQueryArgs) {
    return this.httpPut('/', queryArgs);
  }

  updateColor(value: ?LabelColor) {
    return this.httpPut('/color', { value });
  }

  updateName(value: string) {
    return this.httpPut('/name', { value });
  }

  createLabel(
    queryArgs: LabelChangeQueryArgs &
      {
        idBoard: string,
      },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  deleteLabel() {
    return this.httpDelete('/');
  }
}
