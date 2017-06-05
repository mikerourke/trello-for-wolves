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
  ValueQueryArg,
  WithinLimitsQueryArgs,
} from '../types';

type SharedGetQueryArgs =
  MemberCreatorInclusionQueryArgs &
  MemberInclusionQueryArgs &
  ActionDisplayEntitiesQueryArgs &
  FieldsQueryArg<ActionField> &
  PageQueryArg &
  {
    filter?: FilterQueryArg<ActionFilter>,
  };

/**
 * @api {path} /actions action
 * @apiVersion 1.0.0
 * @apiName action
 * @apiGroup overview
 * @apiDescription
 * Actions are generated whenever an action occurs in Trello.
 * For instance, when a user deletes a card, a <code>deleteCard</code> action
 * is generated and includes information about the deleted card, the list the
 * card was in, the board the card was on, the user that deleted the card, and
 * the <code>idObject</code> of the action. Actions for Trello objects can be
 * listed from nested action endpoints - e.g. the resource
 * <code>GET board/:boardId/actions</code> lists all of the actions for the
 * given board.
 */
export default class Action extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'action', options);
  }

  /**
   * @api {get} /actions/:actionId getAction
   * @apiVersion 1.0.0
   * @apiName getAction
   * @apiDescription Gets the details of the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse ActionBooleanQueryArgs
   * @apiUse ActionFieldsQueryArg
   * @apiUse MemberInclusionQueryArgs
   * @apiUse MemberCreatorInclusionQueryArgs
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').getAction({...});
   */
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
   * @api {get} /actions/:actionId/display getDisplay
   * @apiVersion 1.0.0
   * @apiName getDisplay
   * @apiDescription Gets the <code>display</code> data for the specified action.
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
   * @apiDescription Gets the <code>entities</code> data for the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').getDisplay();
   */
  getEntities(): Promise<*> {
    return this.httpGet('/entities');
  }

  /**
   * @api {get} /actions/:actionId/board getBoard
   * @apiVersion 1.0.0
   * @apiName getBoard
   * @apiDescription Gets the board associated with the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse BoardFieldsQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').board().getBoard({...});
   */

  /**
   * @api {get} /actions/:actionId/board/:field getBoardFieldValue
   * @apiVersion 1.0.0
   * @apiName getBoardFieldValue
   * @apiDescription Gets the value of the specified board field associated
   *    with the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse BoardFieldQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').board().getFieldValue('desc');
   */
  board() {
    return new Board(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/board',
    });
  }

  /**
   * @api {get} /actions/:actionId/card getCard
   * @apiVersion 1.0.0
   * @apiName getCard
   * @apiDescription Gets the card associated with the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse CardFieldsQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').card().getCard({...});
   */

  /**
   * @api {get} /actions/:actionId/card/:field getCardFieldValue
   * @apiVersion 1.0.0
   * @apiName getCardFieldValue
   * @apiDescription Gets the value of the specified card field associated with
   *    the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse CardFieldQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').card().getFieldValue('desc');
   */
  card() {
    return new Card(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/card',
    });
  }

  /**
   * @api {get} /actions/:actionId/list getList
   * @apiVersion 1.0.0
   * @apiName getList
   * @apiDescription Gets the list associated with the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse ListFieldsQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').list().getList({...});
   */

  /**
   * @api {get} /actions/:actionId/list/:field getListFieldValue
   * @apiVersion 1.0.0
   * @apiName getListFieldValue
   * @apiDescription Gets the value of the specified list field associated with
   *    the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse ListFieldQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').list().getFieldValue('name');
   */
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

  /**
   * @api {get} /actions/:actionId/member getMember
   * @apiVersion 1.0.0
   * @apiName getMember
   * @apiDescription Gets the member associated with the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse MemberEveryFieldsQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').member().getMember({...});
   */

  /**
   * @api {get} /actions/:actionId/member/:field getMemberFieldValue
   * @apiVersion 1.0.0
   * @apiName getMemberFieldValue
   * @apiDescription Gets the value of the specified member field associated
   *    with the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse MemberEveryFieldQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').member().getFieldValue('fullName');
   */
  member() {
    return this._getMember('/member');
  }

  /**
   * @api {get} /actions/:actionId/memberCreator getMemberCreator
   * @apiVersion 1.0.0
   * @apiName getMemberCreator
   * @apiDescription Gets the member creator associated with the specified
   *    action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse MemberEveryFieldsQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').memberCreator().getMember({...});
   */

  /**
   * @api {get} /actions/:actionId/memberCreator/:field getMemberCreatorFieldValue
   * @apiVersion 1.0.0
   * @apiName getMemberCreatorFieldValue
   * @apiDescription Gets the value of the specified member creator field
   *    associated with the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse MemberEveryFieldQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').memberCreator().getFieldValue('fullName');
   */
  memberCreator() {
    return this._getMember('/memberCreator');
  }

  /**
   * @api {get} /actions/:actionId/organization getOrganization
   * @apiVersion 1.0.0
   * @apiName getOrganization
   * @apiDescription Gets the organization associated with the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse OrganizationFieldsQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').organization().getOrganization({...});
   */

  /**
   * @api {get} /actions/:actionId/organization/:field getOrganizationFieldValue
   * @apiVersion 1.0.0
   * @apiName getOrganizationFieldValue
   * @apiDescription Gets the value of the specified organization field
   *    associated with the specified action.
   * @apiGroup action
   * @apiPermission read
   *
   * @apiUse OrganizationFieldQueryArg
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').organization().getFieldValue('fullName');
   */
  organization() {
    return new Organization(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/organization',
    });
  }

  /**
   * @api {put} /actions/:actionId updateAction
   * @apiVersion 1.0.0
   * @apiName updateAction
   * @apiDescription Updates the text associated with the action.
   * Note: You can only use <code>PUT</code> on <code>commentCard</code>
   * actions to update the comment. PUTing a new text value will also
   * update the comment on the card.
   * @apiGroup action
   * @apiPermission write
   *
   * @apiParam {String{1..16384}} [text] Updated text for the comment.
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').updateAction({
     text: 'This is the updated comment text.'
   });
   */
  updateAction(
    queryArgs?: {
      text?: string,
    } = {},
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  /**
   * @api {put} /actions/:actionId/text updateText
   * @apiVersion 1.0.0
   * @apiName updateText
   * @apiDescription Updates the text associated with the action.
   * Note: You can only use <code>PUT</code> on <code>commentCard</code>
   * actions to update the comment. PUTing a new text value will also
   * update the comment on the card.
   * @apiGroup action
   * @apiPermission write
   *
   * @apiParam {String{1..16384}} [value] Updated text for the comment.
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').updateText({
     value: 'This is the updated comment text.'
   });
   */
  updateText(queryArgs: ValueQueryArg<string>) {
    return this.httpPost('/text', queryArgs);
  }

  /**
   * @api {delete} /actions/:actionId deleteAction
   * @apiVersion 1.0.0
   * @apiName deleteAction
   * @apiDescription Deletes the action.
   * Note: You can only use <code>DELETE</code> on <code>commentCard</code>
   * actions.  Deleting a <code>commentCard</code> action will also delete the
   * comment on the card. You can only delete a <code>commentCard</code> action
   * if you are the one that created the comment, you have more permissions
   * on the board than the person that created the comment, or the person
   * that created the comment has deleted their account.
   * @apiGroup action
   * @apiPermission write
   *
   * @apiExample {js} Example:
   trello.actions('aCtIoNId').deleteAction();
   */
  deleteAction() {
    return this.httpDelete('/');
  }
}
