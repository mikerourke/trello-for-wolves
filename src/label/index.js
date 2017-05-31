/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  LabelColor,
  LabelField,
  FieldsQueryArg,
  ValueQueryArg,
} from '../types';

type LabelChangeQueryArgs = {
  name: string,
  color: ?LabelColor,
};

/**
 * Class representing a Label resource.
 * @extends BaseResource
 */
export default class Label extends BaseResource {
  constructor(
    auth: Auth,
    labelId: string,
    parentPath?: string,
  ) {
    super(auth, 'label', labelId, parentPath);
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