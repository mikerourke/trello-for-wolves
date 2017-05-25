/* @flow */

declare type Auth = {
  key: string,
  token: string,
};

declare type AllOrNone = 'all' | 'none';

/**
 * Action Declarations
 */
declare type Action =
  'addAdminToBoard'
  | 'addAdminToOrganization'
  | 'addAttachmentToCard'
  | 'addBoardsPinnedToMember'
  | 'addChecklistToCard'
  | 'addLabelToCard'
  | 'addMemberToBoard'
  | 'addMemberToCard'
  | 'addMemberToOrganization'
  | 'addToOrganizationBoard'
  | 'commentCard'
  | 'convertToCardFromCheckItem'
  | 'copyBoard'
  | 'copyCard'
  | 'copyChecklist'
  | 'createLabel'
  | 'copyCommentCard'
  | 'createBoard'
  | 'createBoardInvitation'
  | 'createBoardPreference'
  | 'createCard'
  | 'createChecklist'
  | 'createList'
  | 'createOrganization'
  | 'createOrganizationInvitation'
  | 'deleteAttachmentFromCard'
  | 'deleteBoardInvitation'
  | 'deleteCard'
  | 'deleteCheckItem'
  | 'deleteLabel'
  | 'deleteOrganizationInvitation'
  | 'disablePlugin'
  | 'disablePowerUp'
  | 'emailCard'
  | 'enablePlugin'
  | 'enablePowerUp'
  | 'makeAdminOfBoard'
  | 'makeAdminOfOrganization'
  | 'makeNormalMemberOfBoard'
  | 'makeNormalMemberOfOrganization'
  | 'makeObserverOfBoard'
  | 'memberJoinedTrello'
  | 'moveCardFromBoard'
  | 'moveCardToBoard'
  | 'moveListFromBoard'
  | 'moveListToBoard'
  | 'removeAdminFromBoard'
  | 'removeAdminFromOrganization'
  | 'removeBoardsPinnedFromMember'
  | 'removeChecklistFromCard'
  | 'removeFromOrganizationBoard'
  | 'removeLabelFromCard'
  | 'removeMemberFromBoard'
  | 'removeMemberFromCard'
  | 'removeMemberFromOrganization'
  | 'unconfirmedBoardInvitation'
  | 'unconfirmedOrganizationInvitation'
  | 'updateBoard'
  | 'updateCard'
  | 'updateCheckItem'
  | 'updateCheckItemStateOnCard'
  | 'updateChecklist'
  | 'updateLabel'
  | 'updateList'
  | 'updateMember'
  | 'updateOrganization'
  | 'voteOnCard';
declare type ActionField =
  'data'
  | 'date'
  | 'idMemberCreator'
  | 'value';
declare type ActionFields = ActionField | Array<ActionField> | 'all';
declare type ActionsFormat = 'count' | 'list' | 'minimal';
declare type ActionsSince = string | 'null' | 'lastView';

/**
 * Attachment Declarations
 */
declare type AttachmentField =
  'bytes'
  | 'date'
  | 'edgeColor'
  | 'idMember'
  | 'isUpload'
  | 'mimeType'
  | 'name'
  | 'previews'
  | 'url';
declare type AttachmentFields = AttachmentField | Array<AttachmentField> | 'all';

/**
 * Board Declarations
 */
type BoardAction =
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
  | 'value';
declare type BoardActions = BoardAction | Array<BoardAction> | 'all';
type BoardField =
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
  | 'value';
declare type BoardFields = BoardField | Array<BoardField> | 'all';
declare type BoardStars = 'none' | 'mine';

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
declare type CardFields = CardField | Array<CardField> | 'all';
declare type CardStatus = 'all' | 'closed' | 'none' | 'open' | 'visible';
declare type CardAging = 'pirate' | 'regular';

/**
 * Checklist Declarations
 */
type ChecklistField = 'idBoard' | 'idCard' | 'name' | 'pos';
declare type ChecklistFields = ChecklistField | Array<ChecklistField> | 'all';
declare type CheckItemField =
  'name'
  | 'nameData'
  | 'pos'
  | 'state'
  | 'value';
declare type CheckItemStateField = 'all' | 'idCheckItem' | 'state';

/**
 * Label Declarations
 */
type LabelField =
  'color'
  | 'idBoard'
  | 'name'
  | 'uses';
declare type LabelFields = LabelField | Array<LabelField> | 'all';

/**
 * List Declarations
 */
declare type ListStatus = 'all' | 'closed' | 'none' | 'open';
declare type ListField =
  'closed'
  | 'idBoard'
  | 'name'
  | 'pos'
  | 'subscribed';
declare type ListFields = ListField | Array<ListField> | 'all';

/**
 * Member Declarations
 */
declare type MemberLevel = 'admins' | 'all' | 'none' | 'normal' | 'owners';
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
declare type MemberFields = MemberField | Array<MemberField> | 'all';
type Membership =
  'active'
  | 'admin'
  | 'deactivated'
  | 'me'
  | 'none'
  | 'normal';
declare type Memberships = Membership | Array<Membership> | 'all';

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
declare type OrganizationFields = OrganizationField | Array<OrganizationField> | 'all';

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


declare type GroupPermission =
  'disabled'
  | 'members'
  | 'observers'
  | 'org'
  | 'public';

declare type CommentsPrefs = GroupPermission;
declare type InvitationPrefs = 'admins' | 'members';
declare type VotingPrefs = GroupPermission;
declare type Background = string;
declare type Email = string;

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

declare type Format = 'count' | 'list' | 'minimal';


declare type PermissionLevel = 'org' | 'private' | 'public';

declare type PowerUp =
    'calendar'
  | 'cardAging'
  | 'recap'
  | 'voting';

declare type PowerUps = Array<PowerUp> | 'all';
