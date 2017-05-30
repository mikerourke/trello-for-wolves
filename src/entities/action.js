/* @flow */

/* External dependencies */
import Promise from 'bluebird';

/* Internal dependencies */
import Entity from './entity';

/* Types */
import type {
  ArgumentGroup,
  Auth,
  BoardField,
  CardField,
  EntityInstance,
  PaginatedUrlArgs,
  Format,
  ListField,
  MemberField,
  OrganizationField,
} from '../types';

export type ActionDate = string | 'null' | 'lastView';
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
export type ActionField =
  'data'
  | 'date'
  | 'idMemberCreator'
  | 'value';
export type ActionsFormat = 'count' | 'list' | 'minimal';

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

export type ActionChildrenUrlArgs = {
  actions?: ArgumentGroup<ActionType>,
  actions_entities?: boolean,
  actions_display?: boolean,
  actions_limit?: number,
  action_fields?: ArgumentGroup<ActionField>,
};

type GetUrlArgs = {
  display?: boolean,
  entities?: boolean,
  fields?: ArgumentGroup<ActionField>,
  member?: boolean,
  member_fields?: ArgumentGroup<MemberField>,
  memberCreator?: boolean,
  memberCreator_fields?: ArgumentGroup<MemberField>,
};

/**
 * Class representing an Action entity.
 * @extends Entity
 */
export default class Action extends Entity {
  constructor(auth: Auth, actionId: string = '', parent?: ?EntityInstance) {
    super(auth, 'action', actionId, parent);
  }

  getAction(urlArgs?: GetUrlArgs): Promise<*> {
    return this.performRequest('get', { urlArgs });
  }

  getActions(urlArgs?: GetUrlArgs & PaginatedUrlArgs<ActionType> & {
    format?: Format,
    idModels?: string,
  }): Promise<*> {
    return this.performRequest('get', { urlArgs });
  }

  getFieldValue(field: ActionField): Promise<*> {
    return this.performRequest('get', { path: field });
  }

  getAssociatedBoard(fields: ArgumentGroup<BoardField>): Promise<*> {
    return this.performRequest('get', { path: 'board', urlArgs: { fields } });
  }

  getAssociatedBoardFieldValue(field: BoardField): Promise<*> {
    return this.performRequest('get', { path: `board/${field}` });
  }

  getAssociatedCard(fields: ArgumentGroup<CardField>): Promise<*> {
    return this.performRequest('get', { path: 'board', urlArgs: { fields } });
  }

  getAssociatedCardFieldValue(field: CardField): Promise<*> {
    return this.performRequest('get', { path: `card/${field}` });
  }

  getDisplay(): Promise<*> {
    return this.performRequest('get', { path: 'display' });
  }

  getEntities(): Promise<*> {
    return this.performRequest('get', { path: 'entities' });
  }

  getAssociatedList(fields: ArgumentGroup<ListField>): Promise<*> {
    return this.performRequest('get', { path: 'list', urlArgs: { fields } });
  }

  getAssociatedListFieldValue(field: ListField): Promise<*> {
    return this.performRequest('get', { path: `list/${field}` });
  }

  getAssociatedMember(fields: ArgumentGroup<MemberField>): Promise<*> {
    return this.performRequest('get', { path: 'member', urlArgs: { fields } });
  }

  getAssociatedMemberFieldValue(field: MemberField): Promise<*> {
    return this.performRequest('get', { path: `member/${field}` });
  }

  getAssociatedMemberCreator(fields: ArgumentGroup<MemberField>): Promise<*> {
    return this.performRequest('get', {
      path: 'memberCreator',
      urlArgs: { fields },
    });
  }

  getAssociatedMemberCreatorFieldValue(field: MemberField): Promise<*> {
    return this.performRequest('get', { path: `memberCreator/${field}` });
  }

  getAssociatedOrganization(
    fields: ArgumentGroup<OrganizationField>,
  ): Promise<*> {
    return this.performRequest('get', {
      path: 'organization',
      urlArgs: { fields },
    });
  }

  getAssociatedOrganizationFieldValue(field: OrganizationField): Promise<*> {
    return this.performRequest('get', { path: `organization/${field}` });
  }

  updateAction(text?: string = '') {
    return this.performRequest('put', { urlArgs: { text } });
  }

  updateText(value: string) {
    return this.performRequest('put', { path: 'text', urlArgs: { value } });
  }

  deleteAction() {
    return this.performRequest('delete');
  }
}
