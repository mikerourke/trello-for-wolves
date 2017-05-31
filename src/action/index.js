/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  ActionField,
  ActionType,
  Auth,
  BoardField,
  CardField,
  FieldsQueryArg,
  Format,
  ListField,
  MemberField,
  MemberCreatorInclusionQueryArgs,
  MemberInclusionQueryArgs,
  OrganizationField,
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

  getAssociatedBoard(queryArgs?: FieldsQueryArg<BoardField>): Promise<*> {
    return this.httpGet('/board', queryArgs);
  }

  getAssociatedBoardFieldValue(field: BoardField): Promise<*> {
    return this.httpGet(`/board/${field}`);
  }

  getAssociatedCard(queryArgs?: FieldsQueryArg<CardField>): Promise<*> {
    return this.httpGet('/card', queryArgs);
  }

  getAssociatedCardFieldValue(field: CardField): Promise<*> {
    return this.httpGet(`/card/${field}`);
  }

  getDisplay(): Promise<*> {
    return this.httpGet('/display');
  }

  getEntities(): Promise<*> {
    return this.httpGet('/entities');
  }

  getAssociatedList(queryArgs?: FieldsQueryArg<ListField>): Promise<*> {
    return this.httpGet('/list', queryArgs);
  }

  getAssociatedListFieldValue(field: ListField): Promise<*> {
    return this.httpGet(`/list/${field}`);
  }

  getAssociatedMember(queryArgs?: FieldsQueryArg<MemberField>): Promise<*> {
    return this.httpGet('/member', queryArgs);
  }

  getAssociatedMemberFieldValue(field: MemberField): Promise<*> {
    return this.httpGet(`/member/${field}`);
  }

  getAssociatedMemberCreator(
    queryArgs?: FieldsQueryArg<MemberField>
  ): Promise<*> {
    return this.httpGet('/memberCreator', queryArgs);
  }

  getAssociatedMemberCreatorFieldValue(field: MemberField): Promise<*> {
    return this.httpGet(`/memberCreator/${field}`);
  }

  getAssociatedOrganization(
    queryArgs?: FieldsQueryArg<OrganizationField>
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
