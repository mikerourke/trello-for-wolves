/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';
import Board from '../board';
import Card from '../card';
import List from '../list';
import Member from '../member';

/* Types */
import type {
  ActionField,
  ActionType,
  Auth,
  FieldsQueryArg,
  Format,
  MemberCreatorInclusionQueryArgs,
  MemberField,
  MemberInclusionQueryArgs,
  OrganizationField,
  PaginatedQueryArgs,
  ResourceConstructorOptions,
  ValueQueryArg,
} from '../types';

type GetQueryArgs =
  MemberCreatorInclusionQueryArgs
  & MemberInclusionQueryArgs
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
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'action', options);
  }

  getAction(queryArgs?: GetQueryArgs): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getActions(queryArgs?: GetQueryArgs
    & PaginatedQueryArgs<ActionType>
    & {
      format?: Format,
      idModels?: string,
    } = {},
  ): Promise<*> {
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

  board() {
    return new Board(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/board',
    });
  }

  card() {
    return new Card(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/card',
    });
  }

  list() {
    return new List(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/list',
    });
  }

  member() {
    return new Member(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/member',
    });
  }

  getAssociatedMemberCreator(
    queryArgs?: FieldsQueryArg<MemberField>,
  ): Promise<*> {
    return this.httpGet('/memberCreator', queryArgs);
  }

  getAssociatedMemberCreatorFieldValue(field: MemberField): Promise<*> {
    return this.httpGet(`/memberCreator/${field}`);
  }

  getAssociatedOrganization(
    queryArgs?: FieldsQueryArg<OrganizationField>,
  ): Promise<*> {
    return this.httpGet('/organization', queryArgs);
  }

  getAssociatedOrganizationFieldValue(field: OrganizationField): Promise<*> {
    return this.httpGet(`/organization/${field}`);
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
