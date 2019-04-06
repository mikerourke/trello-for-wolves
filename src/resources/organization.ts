import BaseResource from './baseResource';
import Action, { ActionField, ActionFilter } from './action';
import Board, { BoardField, BoardFilter } from './board';
import { ListFilter } from './list';
import Member, { MemberField, MemberFilter } from './member';
import Membership, { MembershipFilter } from './membership';
import { ArgumentGroup, FilterDate, Format, PermissionLevel } from '../types';

export type OrganizationField =
  | 'billableMemberCount'
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

export type OrganizationFilter = 'all' | 'members' | 'none' | 'public';

type BoardVisibilityFilter = 'admin' | 'none' | 'org';

type BoardVisibilityRestrictionLevel = 'org' | 'private' | 'public';

class Pref extends BaseResource {
  public updateAssociatedDomain = (value: string): Promise<any> =>
    this.httpPut('/associatedDomain', { value });

  public updateBoardVisibilityRestriction = (
    level: BoardVisibilityRestrictionLevel,
    value: BoardVisibilityFilter,
  ): Promise<any> =>
    this.httpPut(`/boardVisibilityRestrict/${level}`, { value });

  public updateExternalMembersDisabled = (value: boolean): Promise<any> =>
    this.httpPut('/externalMembersDisabled', { value });

  public updateGoogleAppsVersion = (value: number): Promise<any> =>
    this.httpPut('/googleAppsVersion', { value });

  public updateOrgInviteRestrict = (value: string): Promise<any> =>
    this.httpPut('/orgInviteRestrict', { value });

  public updatePermissionLevel = (value: PermissionLevel): Promise<any> =>
    this.httpPut('/permissionLevel', { value });

  public deleteAssociatedDomain = (): Promise<any> =>
    this.httpDelete('/associatedDomain');

  public deleteOrgInviteRestrict = (emailAddress: string): Promise<any> =>
    this.httpDelete('/orgInviteRestrict', { value: emailAddress });
}

/**
 * @namespace Organization
 */
export default class Organization extends BaseResource {
  public getOrganizations = (queryArgs?: {
    filter?: ArgumentGroup<OrganizationFilter>;
    fields?: ArgumentGroup<OrganizationField>;
    paidAccount?: boolean;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getOrganization = (queryArgs?: {
    actions?: ArgumentGroup<ActionFilter>;
    actionsEntities?: boolean;
    actionsDisplay?: boolean;
    actionsLimit?: number;
    actionFields?: ArgumentGroup<ActionField>;
    memberships?: ArgumentGroup<MembershipFilter>;
    membershipsMember?: boolean;
    membershipsMemberFields?: ArgumentGroup<MemberField>;
    members?: MemberFilter;
    memberFields?: ArgumentGroup<MemberField>;
    memberActivity?: boolean;
    membersInvited?: MemberFilter;
    membersInvitedFields?: ArgumentGroup<MemberField>;
    pluginData?: boolean;
    boards?: ArgumentGroup<BoardFilter>;
    boardFields?: ArgumentGroup<BoardField>;
    boardActions?: ArgumentGroup<ActionFilter>;
    boardActionsEntities?: boolean;
    boardActionsDisplay?: boolean;
    boardActionsFormat?: Format;
    boardActionsSince?: FilterDate;
    boardActionsLimit?: number;
    boardActionFields?: ArgumentGroup<ActionField>;
    boardLists?: ArgumentGroup<ListFilter>;
    boardPluginData?: boolean;
    paidAccount?: boolean;
    fields?: ArgumentGroup<OrganizationField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getOrganizationsFilteredBy = (
    filter: ArgumentGroup<OrganizationFilter>,
  ): Promise<any> => this.httpGet('/', { filter });

  public getFieldValue = (field: OrganizationField): Promise<any> =>
    this.httpGet(`/${field}`);

  public actions = () => new Action(this.config, `${this.routePath}/actions`);

  public boards = () => new Board(this.config, `${this.routePath}/boards`);

  public getDeltas = (queryArgs: {
    tags: string;
    ixLastUpdate: number;
  }): Promise<any> => this.httpGet('/deltas', queryArgs);

  public members = (memberId: string = '') =>
    new Member(this.config, `${this.routePath}/members/${memberId}`);

  public membersInvited = () =>
    new Member(this.config, `${this.routePath}/membersInvited`);

  public memberships = (membershipId: string = '') =>
    new Membership(
      this.config,
      `${this.routePath}/memberships/${membershipId}`,
    );

  public getPluginData = (): Promise<any> => this.httpGet('/pluginData');

  public getTags = (): Promise<any> => this.httpGet('/tags');

  public updateOrganization = (queryArgs?: {
    prefs?: {
      associatedDomain?: string;
      externalMembersDisabled?: boolean;
      googleAppsVersion?: number;
      orgInviteRestrict?: string;
      permissionLevel?: PermissionLevel;
      boardVisibilityRestrict?: {
        orgRestriction?: BoardVisibilityFilter;
        privateRestriction?: BoardVisibilityFilter;
        publicRestriction?: BoardVisibilityFilter;
      };
    };
    name?: string;
    displayName?: string;
    desc?: string;
    website?: string | null;
  }): Promise<any> => this.httpPut('/', { ...queryArgs, separator: '/' });

  public updateDescription = (value: string): Promise<any> =>
    this.httpPut('/desc', { value });

  public updateDisplayName = (value: string): Promise<any> =>
    this.httpPut('/displayName', { value });

  public updateName = (value: string): Promise<any> =>
    this.httpPut('/name', { value });

  public prefs = () => new Pref(this.config, `${this.routePath}/prefs`);

  public updateWebsite = (value: string | null): Promise<any> =>
    this.httpPut('/website', { value });

  public addOrganization = (queryArgs?: {
    name?: string;
    displayName?: string;
    desc?: string;
    website?: string;
  }): Promise<any> => this.httpPost('/', { ...queryArgs, separator: '/' });

  public uploadLogo = (file: Object): Promise<any> =>
    this.httpPost('/logo', { file });

  public addTags = (name: string): Promise<any> =>
    this.httpPost('/tags', { name });

  public deleteOrganization = (): Promise<any> => this.httpDelete('/');

  public deleteLogo = (): Promise<any> => this.httpDelete('/logo');
}
