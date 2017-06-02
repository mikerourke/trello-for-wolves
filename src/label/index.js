/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  LabelColor,
  LabelField,
  FieldsQueryArg,
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
    const idLabel = this.instanceId;
    const updatedArgs = (this.parentPath)
      ? { idLabel, ...queryArgs }
      : queryArgs;
    return this.httpGet('/', updatedArgs);
  }

  getLabels(queryArgs?: FieldsQueryArg<LabelField> & {
    limit?: number,
  } = {}): Promise<*> {
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

  createLabel(queryArgs: LabelChangeQueryArgs & {
    idBoard: string,
  }): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  deleteLabel() {
    return this.httpDelete('/');
  }
}
