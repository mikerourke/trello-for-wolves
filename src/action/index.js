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
  MemberCreatorInclusionQueryArgs,
  MemberField,
  MemberInclusionQueryArgs,
  OrganizationField,
  PaginatedQueryArgs,
  ValueQueryArg,
} from '../types';

/**
 * @apiDefine ActionGetQueryArgs
 * @apiParam {Boolean} [display=false] Include display data in the response.
 * @apiParam {Boolean} [entities=false] Include entities data in the response.
 */
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
    actionId: string,
    parentPath?: string,
  ) {
    super(auth, 'action', actionId, parentPath);
  }

  /**
   * @api {get} /actions/:actionId getAction
   * @apiVersion 1.0.0
   * @apiName getAction
   * @apiDescription Gets the details of the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiParam {Boolean} [display=false] Include display status in response.
   * @apiParam {Boolean} [entities=false] Include entities in response.
   * @apiUse ActionFieldsQueryArg
   * @apiUse MemberInclusionQueryArgs
   * @apiUse MemberCreatorInclusionQueryArgs
   * @apiExample {js} Simple Example:
   trello.actions('aCtIoNId').getAction();
   * @apiExample {js} Params Example:
   trello.actions('aCtIoNId').getAction({
     display: true,
     entities: false,
     fields: 'data,date'
   });
   * @apiUse GetActionSuccessExample
   */
  getAction(queryArgs?: GetQueryArgs): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getActions(queryArgs?: GetQueryArgs
    & PaginatedQueryArgs<ActionType>
    & {
      format?: Format,
      idModels?: string,
    },
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  /**
   * @api {get} /actions/:actionId/:field getFieldValue
   * @apiVersion 1.0.0
   * @apiName getFieldValue
   * @apiDescription Gets the field value for the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse ActionFieldQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').getFieldValue('date');
   */
  getFieldValue(field: ActionField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  /**
   * @api {get} /actions/:actionId/board getAssociatedBoard
   * @apiVersion 1.0.0
   * @apiName getAssociatedBoard
   * @apiDescription Gets the board associated with the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse BoardFieldsQueryArg
   * @apiExample {js} Simple Example:
   trello.actions('aCtIoNId').getAssociatedBoard();
   * @apiExample {js} Params Example:
   trello.actions('aCtIoNId').getAssociatedBoard({
     fields: 'closed,desc,name'
   });
   */
  getAssociatedBoard(queryArgs?: FieldsQueryArg<BoardField>): Promise<*> {
    return this.httpGet('/board', queryArgs);
  }

  /**
   * @api {get} /actions/:actionId/board/:field getAssociatedBoardFieldValue
   * @apiVersion 1.0.0
   * @apiName getAssociatedBoardFieldValue
   * @apiDescription Gets the field value for the board associated with the action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse BoardFieldQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').getAssociatedBoardFieldValue('desc');
   */
  getAssociatedBoardFieldValue(field: BoardField): Promise<*> {
    return this.httpGet(`/board/${field}`);
  }

  /**
   * @api {get} /actions/:actionId/card getAssociatedCard
   * @apiVersion 1.0.0
   * @apiName getAssociatedCard
   * @apiDescription Gets the card associated with the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse CardFieldsQueryArg
   * @apiExample {js} Simple Example:
   trello.actions('aCtIoNId').getAssociatedCard();
   * @apiExample {js} Params Example:
   trello.actions('aCtIoNId').getAssociatedCard({
     fields: 'badges,checkItemStates,closed'
   });
   */
  getAssociatedCard(queryArgs?: FieldsQueryArg<CardField>): Promise<*> {
    return this.httpGet('/card', queryArgs);
  }

  /**
   * @api {get} /actions/:actionId/card/:field getAssociatedCardFieldValue
   * @apiVersion 1.0.0
   * @apiName getAssociatedCardFieldValue
   * @apiDescription Gets the field value for the card associated with the action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse CardFieldQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').getAssociatedCardFieldValue('desc');
   */
  getAssociatedCardFieldValue(field: CardField): Promise<*> {
    return this.httpGet(`/card/${field}`);
  }

  /**
   * @api {get} /actions/:actionId/display getDisplay
   * @apiVersion 1.0.0
   * @apiName getDisplay
   * @apiDescription Gets the display value associated with the action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').getDisplay();
   */
  getDisplay(): Promise<*> {
    return this.httpGet('/display');
  }

  /**
   * @api {get} /actions/:actionId/entities getEntities
   * @apiVersion 1.0.0
   * @apiName getEntities
   * @apiDescription Gets the entities associated with the action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').getDisplay();
   */
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
