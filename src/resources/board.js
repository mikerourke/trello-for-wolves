/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Action from './action';
import Card from './card';
import Checklist from './checklist';
import Label from './label';
import List from './list';
import Member from './member';
import Membership from './membership';
import Organization from './organization';

/* Types */
import type {
  ActionField,
  ActionFilter,
  AllOrNone,
  ArgumentGroup,
  AttachmentField,
  AttachmentFilter,
  Auth,
  CardAging,
  CardField,
  CardFilter,
  ChecklistField,
  FilterDate,
  Format,
  KeepFromSourceField,
  LabelColor,
  LabelField,
  ListField,
  ListFilter,
  MemberField,
  MemberFilter,
  MembershipFilter,
  OrganizationField,
  PermissionLevel,
  Position,
  ResourceConstructorOptions,
} from '../types';

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

export type BoardFilter =
  'closed'
  | 'members'
  | 'open'
  | 'organization'
  | 'pinned'
  | 'public'
  | 'starred'
  | 'unpinned'

export type BoardStarsFilter = 'none' | 'mine';

type BoardPermissionLevel = PermissionLevel | 'org';

type GroupPermission =
  'disabled'
  | 'members'
  | 'observers'
  | 'org'
  | 'public';

type Invitation = 'admins' | 'members';

type PowerUp = 'calendar' | 'cardAging' | 'recap' | 'voting';

class MyPref extends BaseResource {
  constructor(
    auth: Auth,
    boardId: string,
  ) {
    super(auth, 'myPref', { parentPath: `boards/${boardId}` });
  }

  getMyPrefs(): Promise<*> {
    return this.httpGet('/');
  }

  updateEmailPosition(value: Position): Promise<*> {
    return this.httpPut('/emailPosition', { value });
  }

  /**
   * @example
   * PUT > .../boards/[boardId]/myPrefs/idEmailList?value=[emailListId]&key=...
   * @see {@link https://developers.trello.com/advanced-reference/board#put-1-boards-board-id-myprefs-idemaillist}
   */
  moveToEmailList(emailListId: string): Promise<*> {
    return this.httpPut('/idEmailList', { value: emailListId });
  }

  updateShowListGuide(value: boolean): Promise<*> {
    return this.httpPut('/showListGuide', { value });
  }

  updateShowSidebar(value: boolean): Promise<*> {
    return this.httpPut('/showSidebar', { value });
  }

  updateShowSidebarActivity(value: boolean): Promise<*> {
    return this.httpPut('/showSidebarActivity', { value });
  }

  updateShowSidebarBoardActions(value: boolean): Promise<*> {
    return this.httpPut('/showSidebarBoardActions', { value });
  }

  updateShowSidebarMembers(value: boolean): Promise<*> {
    return this.httpPut('/showSidebarMembers', { value });
  }
}

class Pref extends BaseResource {
  constructor(
    auth: Auth,
    boardId: string,
  ) {
    super(auth, 'pref', { parentPath: `boards/${boardId}` });
  }

  updateBackground(value: string): Promise<*> {
    return this.httpPut('/background', { value });
  }

  updateCalendarFeedEnabled(value: boolean): Promise<*> {
    return this.httpPut('/calendarFeedEnabled', { value });
  }

  updateCardAging(value: CardAging): Promise<*> {
    return this.httpPut('/cardAging', { value });
  }

  updateCardCovers(value: boolean): Promise<*> {
    return this.httpPut('/cardCovers', { value });
  }

  updateComments(value: GroupPermission): Promise<*> {
    return this.httpPut('/comments', { value });
  }

  updateInvitations(value: Invitation): Promise<*> {
    return this.httpPut('/invitations', { value });
  }

  updatePermissionLevel(value: BoardPermissionLevel): Promise<*> {
    return this.httpPut('/permissionLevel', { value });
  }

  updateSelfJoin(value: boolean): Promise<*> {
    return this.httpPut('/selfJoin', { value });
  }

  updateVoting(value: GroupPermission): Promise<*> {
    return this.httpPut('/voting', { value });
  }
}

export default class Board extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'board', options);
  }

  getBoards(
    queryArgs?: {
      filter?: ArgumentGroup<BoardFilter>,
      fields?: ArgumentGroup<BoardField>,
      actions?: ArgumentGroup<ActionFilter>,
      actionsEntities?: boolean,
      actionsLimit?: number,
      actionsFormat?: Format,
      actionsSince?: FilterDate,
      actionFields?: ArgumentGroup<ActionField>,
      memberships?: ArgumentGroup<MembershipFilter>,
      organization?: boolean,
      organizationFields?: ArgumentGroup<OrganizationField>,
      lists?: ListFilter,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getBoard(
    queryArgs?: {
      actions?: ArgumentGroup<ActionFilter>,
      actionsEntities?: boolean,
      actionsDisplay?: boolean,
      actionsFormat?: Format,
      actionsSince?: FilterDate,
      actionsLimit?: number,
      actionFields?: ArgumentGroup<ActionField>,
      actionMember?: boolean,
      actionMemberFields?: ArgumentGroup<MemberField>,
      actionMemberCreator?: boolean,
      actionMemberCreatorFields?: ArgumentGroup<MemberField>,
      cards?: CardFilter,
      cardFields?: ArgumentGroup<CardField>,
      cardAttachments?: AttachmentFilter,
      cardAttachmentFields?: ArgumentGroup<AttachmentField>,
      cardChecklists?: AllOrNone,
      cardPluginData?: boolean,
      cardStickers?: boolean,
      boardStars?: BoardStarsFilter,
      labels?: AllOrNone,
      labelFields?: ArgumentGroup<LabelField>,
      labelsLimit?: number,
      lists?: ListFilter,
      listFields?: ArgumentGroup<ListField>,
      memberships?: ArgumentGroup<MembershipFilter>,
      membershipsMember?: boolean,
      membershipsMemberFields?: ArgumentGroup<MemberField>,
      members?: MemberFilter,
      memberFields?: ArgumentGroup<MemberField>,
      membersInvited?: MemberFilter,
      membersInvitedFields?: ArgumentGroup<MemberField>,
      pluginData?: boolean,
      checklists?: AllOrNone,
      checklistFields?: ArgumentGroup<ChecklistField>,
      organization?: boolean,
      organizationFields?: ArgumentGroup<OrganizationField>,
      organizationMemberships?: ArgumentGroup<MembershipFilter>,
      organizationPluginData?: boolean,
      myPrefs?: boolean,
      tags?: boolean,
      fields?: ArgumentGroup<BoardField>,
    } | {
      // This is the only option if calling from a different resource.
      fields?: ArgumentGroup<BoardField>,
    }= {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: BoardField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  getFilteredBoards(filter: ArgumentGroup<BoardFilter>): Promise<*> {
    return this.httpGet('/', { filter });
  }

  actions() {
    return new Action(this.auth, this.getOptionsForChild());
  }

  getBoardStars(
    queryArgs?: {
      filter?: BoardStarsFilter,
    } = {},
  ): Promise<*> {
    return this.httpGet('/boardStars', queryArgs);
  }

  cards(cardId?: string = '') {
    return new Card(this.auth, this.getOptionsForChild(cardId));
  }

  checklists() {
    return new Checklist(this.auth, this.getOptionsForChild());
  }

  getDeltas(
    queryArgs: {
      tags: string,
      ixLastUpdate: number,
    },
  ): Promise<*> {
    return this.httpGet('/deltas', queryArgs);
  }

  getTags(): Promise<*> {
    return this.httpGet('/idTags');
  }

  labels(labelId?: string = '') {
    return new Label(this.auth, this.getOptionsForChild(labelId));
  }

  lists() {
    return new List(this.auth, this.getOptionsForChild());
  }

  members(memberId?: string = '') {
    return new Member(this.auth, this.getOptionsForChild(memberId));
  }

  membersInvited() {
    return new Member(
      this.auth, this.getOptionsForChild('', '/membersInvited'));
  }

  memberships(membershipId?: string = '') {
    return new Membership(this.auth, this.getOptionsForChild(membershipId));
  }

  myPrefs() {
    return new MyPref(this.auth, this.instanceId);
  }

  organization() {
    return new Organization(
      this.auth, this.getOptionsForChild('', '/organization'));
  }

  getPluginData(): Promise<*> {
    return this.httpGet('/pluginData');
  }

  updateBoard(
    queryArgs?: {
      name?: string,
      desc?: string,
      closed?: boolean,
      subscribed?: boolean,
      idOrganization?: string,
      prefs?: {
        permissionLevel?: BoardPermissionLevel,
        selfJoin?: boolean,
        cardCovers?: boolean,
        invitations?: Invitation,
        voting?: GroupPermission,
        comments?: GroupPermission,
        background?: string,
        cardAging?: CardAging,
        calendarFeedEnabled?: boolean,
      },
      labelNames?: {
        green?: string,
        yellow?: string,
        orange?: string,
        red?: string,
        purple?: string,
        blue?: string,
      },
    } = {},
  ): Promise<*> {
    return this.httpPut('/', { ...queryArgs, separator: '/' });
  }

  updateClosedStatus(value: boolean): Promise<*> {
    return this.httpPut('/closed', { value });
  }

  updateDescription(value: string): Promise<*> {
    return this.httpPut('/desc', { value });
  }

  updateLabelNameForColor(
    labelColor: LabelColor,
    value: string,
  ): Promise<*> {
    return this.httpPut(`/labelNames/${labelColor}`, { value });
  }

  updateName(value: string): Promise<*> {
    return this.httpPut('/name', { value });
  }

  prefs() {
    return new Pref(this.auth, this.instanceId);
  }

  updateSubscribed(value: boolean): Promise<*> {
    return this.httpPut('/subscribed', { value });
  }

  addBoard(
    queryArgs: {
      name: string,
      defaultLabels?: boolean,
      defaultLists?: boolean,
      desc?: string,
      idOrganization?: string,
      idBoardSource?: string,
      keepFromSource?: ArgumentGroup<KeepFromSourceField>,
      powerUps?: ArgumentGroup<PowerUp>,
      prefs?: {
        permissionLevel?: PermissionLevel,
        voting?: GroupPermission,
        comments?: GroupPermission,
        invitations?: Invitation,
        selfJoin?: boolean,
        cardCovers?: boolean,
        background?: string,
        cardAging?: CardAging,
      },
    },
  ): Promise<*> {
    return this.httpPost('/', { ...queryArgs, separator: '_' });
  }

  generateCalendarKey(): Promise<*> {
    return this.httpPost('/calendarKey/generate');
  }

  generateEmailKey(): Promise<*> {
    return this.httpPost('/emailKey/generate');
  }

  addTags(value: string): Promise<*> {
    return this.httpPost('/tags', { value });
  }

  markAsViewed(): Promise<*> {
    return this.httpPost('/markAsViewed');
  }

  addPowerUp(value: PowerUp): Promise<*> {
    return this.httpPost('/powerUps', { value });
  }

  deletePowerUp(powerUp: PowerUp): Promise<*> {
    return this.httpDelete(`/powerUps/${powerUp}`);
  }
}
