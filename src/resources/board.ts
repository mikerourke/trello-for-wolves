import BaseResource from './baseResource';
import Action, { ActionField, ActionFilter } from './action';
import { AttachmentField, AttachmentFilter } from './attachment';
import Card, { CardAging, CardField, CardFilter } from './card';
import Checklist, { ChecklistField } from './checklist';
import Label, { LabelColor, LabelField } from './label';
import List, { ListField, ListFilter } from './list';
import Member, { MemberField, MemberFilter } from './member';
import Membership, { MembershipFilter } from './membership';
import Organization, { OrganizationField } from './organization';
import {
  AllOrNone,
  ArgumentGroup,
  FilterDate,
  Format,
  KeepFromSourceField,
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
  public getMyPrefs = (): Promise<any> => this.httpGet('/');

  public updateEmailPosition = (value: Position): Promise<any> =>
    this.httpPut('/emailPosition', { value });

  public moveToEmailList = (emailListId: string): Promise<any> =>
    this.httpPut('/idEmailList', { value: emailListId });

  public updateShowListGuide = (value: boolean): Promise<any> =>
    this.httpPut('/showListGuide', { value });

  public updateShowSidebar = (value: boolean): Promise<any> =>
    this.httpPut('/showSidebar', { value });

  public updateShowSidebarActivity = (value: boolean): Promise<any> =>
    this.httpPut('/showSidebarActivity', { value });

  public updateShowSidebarBoardActions = (value: boolean): Promise<any> =>
    this.httpPut('/showSidebarBoardActions', { value });

  public updateShowSidebarMembers = (value: boolean): Promise<any> =>
    this.httpPut('/showSidebarMembers', { value });
}

class Pref extends BaseResource {
  public updateBackground = (value: string): Promise<any> =>
    this.httpPut('/background', { value });

  public updateCalendarFeedEnabled = (value: boolean): Promise<any> =>
    this.httpPut('/calendarFeedEnabled', { value });

  public updateCardAging = (value: CardAging): Promise<any> =>
    this.httpPut('/cardAging', { value });

  public updateCardCovers = (value: boolean): Promise<any> =>
    this.httpPut('/cardCovers', { value });

  public updateComments = (value: GroupPermission): Promise<any> =>
    this.httpPut('/comments', { value });

  public updateInvitations = (value: Invitation): Promise<any> =>
    this.httpPut('/invitations', { value });

  public updatePermissionLevel = (value: BoardPermissionLevel): Promise<any> =>
    this.httpPut('/permissionLevel', { value });

  public updateSelfJoin = (value: boolean): Promise<any> =>
    this.httpPut('/selfJoin', { value });

  public updateVoting = (value: GroupPermission): Promise<any> =>
    this.httpPut('/voting', { value });
}

/**
 * @namespace Board
 */
export default class Board extends BaseResource {
  public getBoards = (queryArgs?: {
    filter?: ArgumentGroup<BoardFilter>;
    fields?: ArgumentGroup<BoardField>;
    actions?: ArgumentGroup<ActionFilter>;
    actionsEntities?: boolean;
    actionsLimit?: number;
    actionsFormat?: Format;
    actionsSince?: FilterDate;
    actionFields?: ArgumentGroup<ActionField>;
    memberships?: ArgumentGroup<MembershipFilter>;
    organization?: boolean;
    organizationFields?: ArgumentGroup<OrganizationField>;
    lists?: ListFilter;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getBoard = (
    queryArgs?:
      | {
          actions?: ArgumentGroup<ActionFilter>;
          actionsEntities?: boolean;
          actionsDisplay?: boolean;
          actionsFormat?: Format;
          actionsSince?: FilterDate;
          actionsLimit?: number;
          actionFields?: ArgumentGroup<ActionField>;
          actionMember?: boolean;
          actionMemberFields?: ArgumentGroup<MemberField>;
          actionMemberCreator?: boolean;
          actionMemberCreatorFields?: ArgumentGroup<MemberField>;
          cards?: CardFilter;
          cardFields?: ArgumentGroup<CardField>;
          cardAttachments?: AttachmentFilter;
          cardAttachmentFields?: ArgumentGroup<AttachmentField>;
          cardChecklists?: AllOrNone;
          cardPluginData?: boolean;
          cardStickers?: boolean;
          boardStars?: BoardStarsFilter;
          labels?: AllOrNone;
          labelFields?: ArgumentGroup<LabelField>;
          labelsLimit?: number;
          lists?: ListFilter;
          listFields?: ArgumentGroup<ListField>;
          memberships?: ArgumentGroup<MembershipFilter>;
          membershipsMember?: boolean;
          membershipsMemberFields?: ArgumentGroup<MemberField>;
          members?: MemberFilter;
          memberFields?: ArgumentGroup<MemberField>;
          membersInvited?: MemberFilter;
          membersInvitedFields?: ArgumentGroup<MemberField>;
          pluginData?: boolean;
          checklists?: AllOrNone;
          checklistFields?: ArgumentGroup<ChecklistField>;
          organization?: boolean;
          organizationFields?: ArgumentGroup<OrganizationField>;
          organizationMemberships?: ArgumentGroup<MembershipFilter>;
          organizationPluginData?: boolean;
          myPrefs?: boolean;
          tags?: boolean;
          fields?: ArgumentGroup<BoardField>;
        }
      | {
          // This is the only option if calling from a different resource.
          fields?: ArgumentGroup<BoardField>;
        },
  ): Promise<any> => this.httpGet('/', queryArgs);

  public getBoardsFilteredBy = (
    filter: ArgumentGroup<BoardFilter>,
  ): Promise<any> => this.httpGet('/', { filter });

  public getFieldValue = (field: BoardField): Promise<any> =>
    this.httpGet(`/${field}`);

  public actions = () => new Action(this.config, `${this.routePath}/actions`);

  public getBoardPlugins = (): Promise<any> => this.httpGet('/boardPlugins');

  public getBoardStars = (queryArgs?: {
    filter?: BoardStarsFilter;
  }): Promise<any> => this.httpGet('/boardStars', queryArgs);

  public cards = (cardId: string = '') =>
    new Card(this.config, `${this.routePath}/cards/${cardId}`);

  public checklists = () =>
    new Checklist(this.config, `${this.routePath}/checklists`);

  public getCustomFields = (): Promise<any> => this.httpGet('/customFields');

  public getDeltas = (queryArgs: {
    tags: string;
    ixLastUpdate: number;
  }): Promise<any> => this.httpGet('/deltas', queryArgs);

  public getTags = (): Promise<any> => this.httpGet('/idTags');

  public labels = (labelId: string = '') =>
    new Label(this.config, `${this.routePath}/labels/${labelId}`);

  public lists = () => new List(this.config, `${this.routePath}/lists`);

  public members = (memberId: string = '') =>
    new Member(this.config, `${this.routePath}/members/${memberId}`);

  public membersInvited = () =>
    new Member(this.config, `${this.routePath}/membersInvited`);

  public memberships = (membershipId: string = '') =>
    new Membership(
      this.config,
      `${this.routePath}/memberships/${membershipId}`,
    );

  public myPrefs = () => new MyPref(this.config, `${this.routePath}/myPrefs`);

  public organization = () =>
    new Organization(this.config, `${this.routePath}/organization`);

  public getPluginData = (): Promise<any> => this.httpGet('/pluginData');

  updateBoard = (queryArgs?: {
    name?: string;
    desc?: string;
    closed?: boolean;
    subscribed?: boolean;
    idOrganization?: string;
    prefs?: {
      permissionLevel?: BoardPermissionLevel;
      selfJoin?: boolean;
      cardCovers?: boolean;
      invitations?: Invitation;
      voting?: GroupPermission;
      comments?: GroupPermission;
      background?: string;
      cardAging?: CardAging;
      calendarFeedEnabled?: boolean;
    };
    labelNames?: {
      green?: string;
      yellow?: string;
      orange?: string;
      red?: string;
      purple?: string;
      blue?: string;
    };
  }): Promise<any> => this.httpPut('/', { ...queryArgs, separator: '/' });

  public updateClosedStatus = (value: boolean): Promise<any> =>
    this.httpPut('/closed', { value });

  public updateDescription = (value: string): Promise<any> =>
    this.httpPut('/desc', { value });

  public moveToOrganization = (organizationId: string): Promise<any> =>
    this.httpPut('/idOrganization', { value: organizationId });

  public updateLabelNameForColor = (
    labelColor: LabelColor,
    value: string,
  ): Promise<any> => this.httpPut(`/labelNames/${labelColor}`, { value });

  public updateName = (value: string): Promise<any> =>
    this.httpPut('/name', { value });

  public prefs = () => new Pref(this.config, `${this.routePath}/prefs`);

  public updateSubscribed = (value: boolean): Promise<any> =>
    this.httpPut('/subscribed', { value });

  public addBoard = (queryArgs: {
    name: string;
    defaultLabels?: boolean;
    defaultLists?: boolean;
    desc?: string;
    idOrganization?: string;
    idBoardSource?: string;
    keepFromSource?: ArgumentGroup<KeepFromSourceField>;
    powerUps?: ArgumentGroup<PowerUp>;
    prefs?: {
      permissionLevel?: PermissionLevel;
      voting?: GroupPermission;
      comments?: GroupPermission;
      invitations?: Invitation;
      selfJoin?: boolean;
      cardCovers?: boolean;
      background?: string;
      cardAging?: CardAging;
    };
  }): Promise<any> => this.httpPost('/', { ...queryArgs, separator: '_' });

  public generateCalendarKey = (): Promise<any> =>
    this.httpPost('/calendarKey/generate');

  public generateEmailKey = (): Promise<any> =>
    this.httpPost('/emailKey/generate');

  public addTags = (value: string): Promise<any> =>
    this.httpPost('/tags', { value });

  public markAsViewed = (): Promise<any> => this.httpPost('/markAsViewed');

  public addPowerUp = (value: PowerUp): Promise<any> =>
    this.httpPost('/powerUps', { value });

  public deletePowerUp = (powerUp: PowerUp): Promise<any> =>
    this.httpDelete(`/powerUps/${powerUp}`);
}
