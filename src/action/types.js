/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

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
 * @apiParam {String=data,date,idMemberCreator,type} field
 * Action field to get value for.
 */

/**
 * @apiDefine ActionFieldsQueryArg
 * @apiParam {String=all,data,date,idMemberCreator,type} [fields="all"]
 * Action fields to include in the response, can either be <code>all</code> or a comma separated list of field names.
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

export type ActionChildrenQueryArgs = {
  actions?: ArgumentGroup<ActionType>,
  actionsEntities?: boolean,
  actionsDisplay?: boolean,
  actionsLimit?: number,
  actionFields?: ArgumentGroup<ActionField>,
};
