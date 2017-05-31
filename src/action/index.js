/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  ActionField,
  ActionType,
  Auth,
  FieldsQueryArg,
  Format,
  MemberCreatorInclusionQueryArgs,
  MemberInclusionQueryArgs,
  PaginatedQueryArgs,
  ValueQueryArg,
} from '../types';

type GetQueryArgs =
  MemberInclusionQueryArgs
  & MemberCreatorInclusionQueryArgs
  & FieldsQueryArg<ActionField>
  & {
    display?: boolean,
    entities?: boolean,
  };

/**
 * Class representing an Action resource.
 * @extends BaseResource
 */
export default class Action extends BaseResource {
  constructor(
    auth: Auth,
    actionId: string,
    parentPath?: string,
  ) {
    super(auth, 'action', actionId, parentPath);
  }

  getAction(queryArgs?: GetQueryArgs): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getActions(queryArgs?: GetQueryArgs & PaginatedQueryArgs<ActionType> & {
    format?: Format,
    idModels?: string,
  }): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: ActionField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  getDisplay(): Promise<*> {
    return this.httpGet('/display');
  }

  getEntities(): Promise<*> {
    return this.httpGet('/entities');
  }

  updateAction(queryArgs?: {
    text?: string,
  }) {
    return this.httpPost('/', queryArgs);
  }

  updateText(queryArgs: ValueQueryArg<string>) {
    return this.httpPost('/text', queryArgs);
  }

  deleteAction() {
    return this.httpDelete('/');
  }
}
