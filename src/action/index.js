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
  Auth,
  FieldsQueryArg,
  FilterQueryArg,
  MemberCreatorInclusionQueryArgs,
  MemberField,
  MemberInclusionQueryArgs,
  ResourceConstructorOptions,
  ValueQueryArg,
  WithinLimitsQueryArgs,
} from '../types';

type SharedGetQueryArgs =
  MemberCreatorInclusionQueryArgs &
  MemberInclusionQueryArgs &
  FieldsQueryArg<ActionField> &
  {
    display?: boolean,
    entities?: boolean,
    filter?: FilterQueryArg<ActionField>,
    page?: number,
  };

export default class Action extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'action', options);
  }

  getAction(queryArgs?: SharedGetQueryArgs): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getActions(
    queryArgs?: SharedGetQueryArgs &
      WithinLimitsQueryArgs &
      {
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

  getMemberCreator(queryArgs?: FieldsQueryArg<MemberField>): Promise<*> {
    return this.httpGet('/memberCreator', queryArgs);
  }

  getMemberCreatorFieldValue(field: MemberField): Promise<*> {
    return this.httpGet(`/memberCreator/${field}`);
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
