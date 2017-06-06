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
  ValueQueryArg,
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

  updateColor(queryArgs: ValueQueryArg<?LabelColor>) {
    return this.httpPut('/color', queryArgs);
  }

  updateName(queryArgs: ValueQueryArg<string>) {
    return this.httpPut('/name', queryArgs);
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
