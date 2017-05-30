/* @flow */

/* Types */
import type {
  ActionField,
  ActionType,
  ArgumentGroup,
  Auth,
  Format,
  MemberCreatorQueryArgs,
  MemberQueryArgs,
  PaginatedQueryArgs,
} from '../types';

type GetQueryArgs = MemberQueryArgs & MemberCreatorQueryArgs & {
  display?: boolean,
  entities?: boolean,
  fields?: ArgumentGroup<ActionField>,
};

/**
 * Class representing an Action entity.
 * @extends Entity
 */
export default class Action extends BaseEntity {
  constructor(
    auth: Auth,
    actionId: string,
    parentType?: string,
    parentId?: string,) {
    super(auth, 'action', actionId, parentType, parentId);
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

  updateText(queryArgs: {
    value: string,
  }) {
    return this.httpPost('/text', queryArgs);
  }

  deleteAction() {
    return this.httpDelete('/');
  }
}
