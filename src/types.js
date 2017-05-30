/* @flow */

/* eslint-disable */

/* Internal dependencies */
export type * from './entities/action';
export type * from './entities/board';
export type * from './entities/card';
export type * from './entities/checklist';
export type * from './entities/label';
export type * from './entities/list';
export type * from './entities/member';
export type * from './entities/notification';
export type * from './entities/organization';
export type * from './entities/search';
export type * from './entities/token';
export type * from './entities/type';
export type * from './entities/webhook';

export type Auth = {
  key: string,
  token: string,
};

export type HttpMethod = 'get' | 'put' | 'post' | 'delete';

export type AllOrNone = 'all' | 'none';

export type EntityName =
  'action'
  | 'board'
  | 'card'
  | 'checklist'
  | 'label'
  | 'list'
  | 'member'
  | 'notification'
  | 'organization'
  | 'search'
  | 'token'
  | 'type'
  | 'webhook';

export type EntityInstance = {
  entityName: EntityName,
  id: string,
};

export type ArgumentGroup<T> = T | Array<T> | 'all';

export type FilterUrlArgs<F> = {
  before?: ?string,
  since?: ?string,
  limit?: number,
  filter?: F,
};

export type PaginatedUrlArgs<F> = FilterUrlArgs<F> & { page?: number };

export type AttachmentFilter = boolean | 'cover';
export type AttachmentField =
  'bytes'
  | 'date'
  | 'edgeColor'
  | 'idMember'
  | 'isUpload'
  | 'mimeType'
  | 'name'
  | 'previews'
  | 'url';

export type AttachmentUrlArgs = {
  attachments?: AttachmentFilter,
  attachment_fields?: ArgumentGroup<AttachmentField>,
};

export type Format = 'count' | 'list' | 'minimal';

export type FilterField =
  'all'
  | 'active'
  | 'addAttachmentToCard'
  | 'addChecklistToCard'
  | 'addMemberToBoard'
  | 'addMemberToCard'
  | 'addMemberToOrganization'
  | 'addToOrganizationBoard'
  | 'admin'
  | 'admins'
  | 'all'
  | 'closed'
  | 'commentCard'
  | 'convertToCardFromCheckItem'
  | 'copyBoard'
  | 'copyCard'
  | 'copyCommentCard'
  | 'createBoard'
  | 'createCard'
  | 'createList'
  | 'createOrganization'
  | 'deactivated'
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
  | 'me'
  | 'memberJoinedTrello'
  | 'mine'
  | 'moveCardFromBoard'
  | 'moveCardToBoard'
  | 'moveListFromBoard'
  | 'moveListToBoard'
  | 'none'
  | 'normal'
  | 'open'
  | 'owners'
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
  | 'value'
  | 'visible';

export type PermissionLevel = 'org' | 'private' | 'public';
export type Invitation = 'admins' | 'members';
export type GroupPermission =
  'disabled'
  | 'members'
  | 'observers'
  | 'org'
  | 'public';

export type Position = 'bottom' | 'top';

export type PowerUp =
    'calendar'
  | 'cardAging'
  | 'recap'
  | 'voting';
