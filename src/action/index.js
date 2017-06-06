/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';
import Board from '../board';
import Card from '../card';
import List from '../list';
import Member from '../member';
import Organization from '../organization';

/* Types */
import type {
  ActionDisplayEntitiesQueryArgs,
  ActionField,
  ActionFilter,
  ActionIdModelsQueryArg,
  Auth,
  FieldsQueryArg,
  FilterQueryArg,
  MemberCreatorInclusionQueryArgs,
  MemberInclusionQueryArgs,
  PageQueryArg,
  ResourceConstructorOptions,
  WithinLimitsQueryArgs,
} from '../types';

type SharedGetQueryArgs =
  ActionDisplayEntitiesQueryArgs &
  FieldsQueryArg<ActionField> &
  FilterQueryArg<ActionFilter> &
  MemberCreatorInclusionQueryArgs &
  MemberInclusionQueryArgs &
  PageQueryArg;

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
      ActionIdModelsQueryArg &
      WithinLimitsQueryArgs = {},
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

  _getMember(resourcePath: string) {
    return new Member(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath,
    });
  }

  member() {
    return this._getMember('/member');
  }

  memberCreator() {
    return this._getMember('/memberCreator');
  }

  organization() {
    return new Organization(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/organization',
    });
  }

  addComment(text: string): Promise<*> {
    return this.httpPost('/comments', { text });
  }

  updateAction(
    queryArgs?: {
      text?: string,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateText(value: string) {
    return this.httpPut('/text', { value });
  }

  updateComment(text: string): Promise<*> {
    return this.httpPut('/comments', { text });
  }

  deleteAction() {
    return this.httpDelete('/');
  }

  deleteComment() {
    return this.httpDelete('/comments');
  }
}
