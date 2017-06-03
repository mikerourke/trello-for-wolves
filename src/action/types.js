/* @flow */

/* Types */
import type {
  ArgumentGroup,
  FilterDate,
} from '../types';

/**
 * @apiDefine ActionBooleanQueryArgs
 * @apiParam {Boolean} [display=false] Include display data in the response.
 * @apiParam {Boolean} [entities=false] Include entities data in the response.
 */

/**
 * @apiDefine ActionTypeFilterQueryArgs
 * @apiParam {String="all","addAttachmentToCard","addChecklistToCard","addMemberToBoard","addMemberToCard","addMemberToOrganization","addToOrganizationBoard","commentCard","convertToCardFromCheckItem","copyBoard","copyCard","copyCommentCard","createBoard","createCard","createList","createOrganization","deleteAttachmentFromCard","deleteBoardInvitation","deleteCard","deleteOrganizationInvitation","disablePowerUp","emailCard","enablePowerUp","makeAdminOfBoard","makeNormalMemberOfBoard","makeNormalMemberOfOrganization","makeObserverOfBoard","memberJoinedTrello","moveCardFromBoard","moveCardToBoard","moveListFromBoard","moveListToBoard","removeChecklistFromCard","removeFromOrganizationBoard","removeMemberFromCard","unconfirmedBoardInvitation","unconfirmedOrganizationInvitation","updateBoard","updateCard","updateCard:closed","updateCard:desc","updateCard:idList","updateCard:name","updateCheckItemStateOnCard","updateChecklist","updateList","updateList:closed","updateList:name","updateMember","updateOrganization"} [filter='"all"']
 * Action types to include in the response, can either be <code>"all"</code> or
 *    a comma separated list of field names.
 */
export type ActionType =
  'addAttachmentToCard'
  | 'addChecklistToCard'
  | 'addMemberToBoard'
  | 'addMemberToCard'
  | 'addMemberToOrganization'
  | 'addToOrganizationBoard'
  | 'commentCard'
  | 'convertToCardFromCheckItem'
  | 'copyBoard'
  | 'copyCard'
  | 'copyCommentCard'
  | 'createBoard'
  | 'createCard'
  | 'createList'
  | 'createOrganization'
  | 'deleteAttachmentFromCard'
  | 'deleteBoardInvitation'
  | 'deleteCard'
  | 'deleteOrganizationInvitation'
  | 'disablePowerUp'
  | 'emailCard'
  | 'enablePowerUp'
  | 'makeAdminOfBoard'
  | 'makeNormalMemberOfBoard'
  | 'makeNormalMemberOfOrganization'
  | 'makeObserverOfBoard'
  | 'memberJoinedTrello'
  | 'moveCardFromBoard'
  | 'moveCardToBoard'
  | 'moveListFromBoard'
  | 'moveListToBoard'
  | 'removeChecklistFromCard'
  | 'removeFromOrganizationBoard'
  | 'removeMemberFromCard'
  | 'unconfirmedBoardInvitation'
  | 'unconfirmedOrganizationInvitation'
  | 'updateBoard'
  | 'updateCard'
  | 'updateCard:closed'
  | 'updateCard:desc'
  | 'updateCard:idList'
  | 'updateCard:name'
  | 'updateCheckItemStateOnCard'
  | 'updateChecklist'
  | 'updateList'
  | 'updateList:closed'
  | 'updateList:name'
  | 'updateMember'
  | 'updateOrganization';

/**
 * @apiDefine ActionFieldQueryArg
 * @apiParam {String="data","date","idMemberCreator","type"} field
 *    Action field value to return in the response.
 */

/**
 * @apiDefine ActionFieldsQueryArg
 * @apiParam {String="all","data","date","idMemberCreator","type"} [fields='"all"']
 *    Action fields to include in the response, can either be <code>"all"</code>
 *    or a comma separated list of field names.
 */
export type ActionField =
  'data'
  | 'date'
  | 'idMemberCreator'
  | 'type';

export type ExcludedActionType =
  'addAdminToBoard'
  | 'addAdminToOrganization'
  | 'addBoardsPinnedToMember'
  | 'addLabelToCard'
  | 'copyChecklist'
  | 'createBoardInvitation'
  | 'createBoardPreference'
  | 'createCheckItem'
  | 'createChecklist'
  | 'createLabel'
  | 'createOrganizationInvitation'
  | 'deleteCheckItem'
  | 'deleteComment'
  | 'deleteLabel'
  | 'makeAdminOfOrganization'
  | 'removeAdminFromBoard'
  | 'removeAdminFromOrganization'
  | 'removeBoardsPinnedFromMember'
  | 'removeLabelFromCard'
  | 'removeMemberFromBoard'
  | 'removeMemberFromOrganization'
  | 'updateCheckItem'
  | 'updateComment'
  | 'updateLabel'
  | 'voteOnCard';

/**
 * @apiDefine ActionInclusionQueryArgs
 * @apiParam {String="all","addAttachmentToCard","addChecklistToCard","addMemberToBoard","addMemberToCard","addMemberToOrganization","addToOrganizationBoard","commentCard","convertToCardFromCheckItem","copyBoard","copyCard","copyCommentCard","createBoard","createCard","createList","createOrganization","deleteAttachmentFromCard","deleteBoardInvitation","deleteCard","deleteOrganizationInvitation","disablePowerUp","emailCard","enablePowerUp","makeAdminOfBoard","makeNormalMemberOfBoard","makeNormalMemberOfOrganization","makeObserverOfBoard","memberJoinedTrello","moveCardFromBoard","moveCardToBoard","moveListFromBoard","moveListToBoard","removeChecklistFromCard","removeFromOrganizationBoard","removeMemberFromCard","unconfirmedBoardInvitation","unconfirmedOrganizationInvitation","updateBoard","updateCard","updateCard:closed","updateCard:desc","updateCard:idList","updateCard:name","updateCheckItemStateOnCard","updateChecklist","updateList","updateList:closed","updateList:name","updateMember","updateOrganization"} [actions='"all"']
 * Action types to include in the response, can either be <code>"all"</code> or
 *    a comma separated list of field names.
 * @apiParam {String="all","data","date","idMemberCreator","type"} [actionFields='"all"']
 * Action fields to include in the response, can either be <code>"all"</code>
 *    or a comma separated list of field names.
 */
export type ActionInclusionQueryArgs = {
  actions?: ArgumentGroup<ActionType>,
  actionFields?: ArgumentGroup<ActionField>,
};

/**
 * @apiDefine ActionLimitsQueryArgs
 * @apiParam {Boolean} [actionsEntities=false] Include <code>entities</code>
 *    data in the response.
 * @apiParam {Boolean} [actionsDisplay=false] Include <code>display</code>
 *    data in the response.
 * @apiParam {number{0-1000}} [actionsLimit=50] Limit to impose on actions
 *    included in response.
 * @apiParam {String="lastView",date,null} [actionsSince] Starting date for
 *    actions to include in the response.
 */
export type ActionLimitsQueryArgs = {
  actionsEntities?: boolean,
  actionsDisplay?: boolean,
  actionsLimit?: number,
  actionsSince?: FilterDate,
}
