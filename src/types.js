/* @flow */

export type Auth = {
  key: string,
  token: string,
};

export type HttpMethod = 'get' | 'put' | 'post' | 'delete';

export type AllOrNone = 'all' | 'none';

export type EntityName =
  'action'
  | 'batch'
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
  id: string,
  entityName: EntityName,
};

/**
 * Action Declarations
 */
export type Action =
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
export type Actions = Action | Array<Action> | 'all'

export type ExtendedAction =
  'addAdminToBoard'
  | 'addAdminToOrganization'
  | 'addBoardsPinnedToMember'
  | 'addLabelToCard'
  | 'copyChecklist'
  | 'createLabel'
  | 'createBoardInvitation'
  | 'createBoardPreference'
  | 'createChecklist'
  | 'createOrganizationInvitation'
  | 'disablePlugin'
  | 'enablePlugin'
  | 'makeAdminOfOrganization'
  | 'removeAdminFromBoard'
  | 'removeAdminFromOrganization'
  | 'removeBoardsPinnedFromMember'
  | 'removeFromOrganizationBoard'
  | 'removeLabelFromCard'
  | 'removeMemberFromBoard'
  | 'removeMemberFromOrganization'
  | 'updateCheckItem'
  | 'updateLabel'
  | 'voteOnCard';
export type ActionField =
  'data'
  | 'date'
  | 'idMemberCreator'
  | 'value';
export type ActionFields = ActionField | Array<ActionField> | 'all';
export type ActionsFormat = 'count' | 'list' | 'minimal';
export type ActionDate = string | 'null' | 'lastView';

/**
 * Attachment Declarations
 */
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
export type AttachmentFields = AttachmentField | Array<AttachmentField> | 'all';

/**
 * Board Declarations
 */
export type BoardField =
  'closed'
  | 'dateLastActivity'
  | 'dateLastView'
  | 'desc'
  | 'descData'
  | 'idOrganization'
  | 'invitations'
  | 'invited'
  | 'labelNames'
  | 'memberships'
  | 'name'
  | 'pinned'
  | 'powerUps'
  | 'prefs'
  | 'shortLink'
  | 'shortUrl'
  | 'starred'
  | 'subscribed'
  | 'url';
export type BoardFields = BoardField | Array<BoardField> | 'all';
export type BoardStars = 'none' | 'mine';
export type MyPref =
  'emailPosition'
  | 'idEmailList'
  | 'showListGuide'
  | 'showSidebar'
  | 'showSidebarActivity'
  | 'showSidebarBoardActions'
  | 'showSidebarMembers';

/**
 * Card Declarations
 */
type CardField =
  'badges'
  | 'checkItemStates'
  | 'closed'
  | 'dateLastActivity'
  | 'desc'
  | 'descData'
  | 'due'
  | 'email'
  | 'idAttachmentCover'
  | 'idBoard'
  | 'idChecklists'
  | 'idLabels'
  | 'idList'
  | 'idMembers'
  | 'idMembersVoted'
  | 'idShort'
  | 'labels'
  | 'manualCoverAttachment'
  | 'name'
  | 'pos'
  | 'shortLink'
  | 'shortUrl'
  | 'subscribed';
export type CardFields = CardField | Array<CardField> | 'all';
export type CardStatus = 'all' | 'closed' | 'none' | 'open' | 'visible';
export type CardAging = 'pirate' | 'regular';

/**
 * Checklist Declarations
 */
type ChecklistField = 'idBoard' | 'idCard' | 'name' | 'pos';
export type ChecklistFields = ChecklistField | Array<ChecklistField> | 'all';
export type CheckItemField =
  'name'
  | 'nameData'
  | 'pos'
  | 'state'
  | 'value';
export type CheckItemStateField = 'all' | 'idCheckItem' | 'state';

/**
 * Label Declarations
 */
type LabelField =
  'color'
  | 'idBoard'
  | 'name'
  | 'uses';
export type LabelFields = LabelField | Array<LabelField> | 'all';

/**
 * List Declarations
 */
export type ListStatus = 'all' | 'closed' | 'none' | 'open';
export type ListField =
  'closed'
  | 'idBoard'
  | 'name'
  | 'pos'
  | 'subscribed';
export type ListFields = ListField | Array<ListField> | 'all';

/**
 * Member Declarations
 */
export type MemberLevel = 'admins' | 'all' | 'none' | 'normal' | 'owners';
type MemberField =
  'avatarHash'
  | 'bio'
  | 'bioData'
  | 'confirmed'
  | 'fullName'
  | 'idPremOrgsAdmin'
  | 'initials'
  | 'memberType'
  | 'products'
  | 'status'
  | 'url'
  | 'username';
export type MemberFields = MemberField | Array<MemberField> | 'all';
type Membership =
  'active'
  | 'admin'
  | 'deactivated'
  | 'me'
  | 'none'
  | 'normal';
export type Memberships = Membership | Array<Membership> | 'all';

/**
 * Notification Declarations
 */

/**
 * Organization Declarations
 */
type OrganizationField =
  'billableMemberCount'
  | 'desc'
  | 'descData'
  | 'displayName'
  | 'idBoards'
  | 'invitations'
  | 'invited'
  | 'logoHash'
  | 'memberships'
  | 'name'
  | 'powerUps'
  | 'prefs'
  | 'premiumFeatures'
  | 'products'
  | 'url'
  | 'website';
export type OrganizationFields = OrganizationField | Array<OrganizationField> | 'all';

/**
 * Search Declarations
 */

/**
 * Token Declarations
 */

/**
 * Type Declarations
 */

/**
 * Webhook Declarations
 */

export type Filter =
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

export type Format = 'count' | 'list' | 'minimal';

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

export type PowerUps = Array<PowerUp> | 'all';
