// @flow
import BaseResource from './baseResource';
import Action from './action';
import Card from './card';
import Checklist from './checklist';
import Label from './label';
import List from './list';
import Member from './member';
import Membership from './membership';
import Organization from './organization';
import type {
  ActionField,
  ActionFilter,
  AllOrNone,
  ArgumentGroup,
  AttachmentField,
  AttachmentFilter,
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
} from '../types';

export type BoardField =
  | 'closed'
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
  | 'closed'
  | 'members'
  | 'open'
  | 'organization'
  | 'pinned'
  | 'public'
  | 'starred'
  | 'unpinned';

export type BoardMemberType = 'admin' | 'normal' | 'observer';

export type BoardStarsFilter = 'none' | 'mine';

type BoardPermissionLevel = PermissionLevel | 'org';

type GroupPermission = 'disabled' | 'members' | 'observers' | 'org' | 'public';

type Invitation = 'admins' | 'members';

type PowerUp = 'calendar' | 'cardAging' | 'recap' | 'voting';

class MyPref extends BaseResource {
  getMyPrefs(): Promise<any> {
    return this.httpGet('/');
  }

  updateEmailPosition(value: Position): Promise<any> {
    return this.httpPut('/emailPosition', { value });
  }

  /**
   * @example
   * PUT > .../boards/[boardId]/myPrefs/idEmailList?value=[emailListId]&key=...
   * @see {@link https://developers.trello.com/advanced-reference/board#put-1-boards-board-id-myprefs-idemaillist}
   */
  /* istanbul ignore next: Requires special permissions */
  moveToEmailList(emailListId: string): Promise<any> {
    return this.httpPut('/idEmailList', { value: emailListId });
  }

  updateShowListGuide(value: boolean): Promise<any> {
    return this.httpPut('/showListGuide', { value });
  }

  updateShowSidebar(value: boolean): Promise<any> {
    return this.httpPut('/showSidebar', { value });
  }

  updateShowSidebarActivity(value: boolean): Promise<any> {
    return this.httpPut('/showSidebarActivity', { value });
  }

  updateShowSidebarBoardActions(value: boolean): Promise<any> {
    return this.httpPut('/showSidebarBoardActions', { value });
  }

  updateShowSidebarMembers(value: boolean): Promise<any> {
    return this.httpPut('/showSidebarMembers', { value });
  }
}

class Pref extends BaseResource {
  updateBackground(value: string): Promise<any> {
    return this.httpPut('/background', { value });
  }

  updateCalendarFeedEnabled(value: boolean): Promise<any> {
    return this.httpPut('/calendarFeedEnabled', { value });
  }

  updateCardAging(value: CardAging): Promise<any> {
    return this.httpPut('/cardAging', { value });
  }

  updateCardCovers(value: boolean): Promise<any> {
    return this.httpPut('/cardCovers', { value });
  }

  updateComments(value: GroupPermission): Promise<any> {
    return this.httpPut('/comments', { value });
  }

  updateInvitations(value: Invitation): Promise<any> {
    return this.httpPut('/invitations', { value });
  }

  updatePermissionLevel(value: BoardPermissionLevel): Promise<any> {
    return this.httpPut('/permissionLevel', { value });
  }

  updateSelfJoin(value: boolean): Promise<any> {
    return this.httpPut('/selfJoin', { value });
  }

  updateVoting(value: GroupPermission): Promise<any> {
    return this.httpPut('/voting', { value });
  }
}

/**
 * @namespace Board
 */
export default class Board extends BaseResource {
  getBoards(queryArgs?: {
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
  }): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getBoard(
    queryArgs?:
      | {
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
        }
      | {
          // This is the only option if calling from a different resource.
          fields?: ArgumentGroup<BoardField>,
        },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getBoardsFilteredBy(filter: ArgumentGroup<BoardFilter>): Promise<any> {
    return this.httpGet('/', { filter });
  }

  getFieldValue(field: BoardField): Promise<any> {
    return this.httpGet(`/${field}`);
  }

  actions() {
    return new Action(this.config, `${this.routePath}/actions`);
  }

  getBoardStars(queryArgs?: { filter?: BoardStarsFilter }): Promise<any> {
    return this.httpGet('/boardStars', queryArgs);
  }

  cards(cardId?: string = '') {
    return new Card(this.config, `${this.routePath}/cards/${cardId}`);
  }

  checklists() {
    return new Checklist(this.config, `${this.routePath}/checklists`);
  }

  /* istanbul ignore next: Requires Business Class subscription */
  getDeltas(queryArgs: { tags: string, ixLastUpdate: number }): Promise<any> {
    return this.httpGet('/deltas', queryArgs);
  }

  /* istanbul ignore next: Requires Business Class subscription */
  getTags(): Promise<any> {
    return this.httpGet('/idTags');
  }

  labels(labelId?: string = '') {
    return new Label(this.config, `${this.routePath}/labels/${labelId}`);
  }

  lists() {
    return new List(this.config, `${this.routePath}/lists`);
  }

  members(memberId?: string = '') {
    return new Member(this.config, `${this.routePath}/members/${memberId}`);
  }

  membersInvited() {
    return new Member(this.config, `${this.routePath}/membersInvited`);
  }

  memberships(membershipId?: string = '') {
    return new Membership(
      this.config,
      `${this.routePath}/memberships/${membershipId}`,
    );
  }

  myPrefs() {
    return new MyPref(this.config, `${this.routePath}/myPrefs`);
  }

  organization() {
    return new Organization(this.config, `${this.routePath}/organization`);
  }

  getPluginData(): Promise<any> {
    return this.httpGet('/pluginData');
  }

  updateBoard(queryArgs?: {
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
  }): Promise<any> {
    return this.httpPut('/', { ...queryArgs, separator: '/' });
  }

  updateClosedStatus(value: boolean): Promise<any> {
    return this.httpPut('/closed', { value });
  }

  updateDescription(value: string): Promise<any> {
    return this.httpPut('/desc', { value });
  }

  moveToOrganization(organizationId: string): Promise<any> {
    return this.httpPut('/idOrganization', { value: organizationId });
  }

  updateLabelNameForColor(labelColor: LabelColor, value: string): Promise<any> {
    return this.httpPut(`/labelNames/${labelColor}`, { value });
  }

  updateName(value: string): Promise<any> {
    return this.httpPut('/name', { value });
  }

  prefs() {
    return new Pref(this.config, `${this.routePath}/prefs`);
  }

  updateSubscribed(value: boolean): Promise<any> {
    return this.httpPut('/subscribed', { value });
  }

  addBoard(queryArgs: {
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
  }): Promise<any> {
    return this.httpPost('/', { ...queryArgs, separator: '_' });
  }

  /* istanbul ignore next: This works, I don't want to keep re-testing it. */
  generateCalendarKey(): Promise<any> {
    return this.httpPost('/calendarKey/generate');
  }

  /* istanbul ignore next: This works, I don't want to keep re-testing it. */
  generateEmailKey(): Promise<any> {
    return this.httpPost('/emailKey/generate');
  }

  /* istanbul ignore next: Requires Business Class subscription */
  addTags(value: string): Promise<any> {
    return this.httpPost('/tags', { value });
  }

  markAsViewed(): Promise<any> {
    return this.httpPost('/markAsViewed');
  }

  /* istanbul ignore next: Requires special permissions */
  addPowerUp(value: PowerUp): Promise<any> {
    return this.httpPost('/powerUps', { value });
  }

  deletePowerUp(powerUp: PowerUp): Promise<any> {
    return this.httpDelete(`/powerUps/${powerUp}`);
  }
}
