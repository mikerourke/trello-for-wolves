// @flow
import { generateTypeMap } from '../utils/type-mapper';
import BaseResource from './base-resource';
import Action from './action';
import Board from './board';
import Member from './member';
import Membership from './membership';
import type {
  ActionField,
  ActionFilter,
  ArgumentGroup,
  BoardField,
  BoardFilter,
  FilterDate,
  Format,
  ListFilter,
  MemberField,
  MemberFilter,
  MembershipFilter,
  PermissionLevel,
} from '../types';

export const organizationFieldMap = generateTypeMap(
  'billableMemberCount',
  'desc',
  'descData',
  'displayName',
  'idBoards',
  'invitations',
  'invited',
  'logoHash',
  'memberships',
  'name',
  'powerUps',
  'prefs',
  'premiumFeatures',
  'products',
  'url',
  'website',
);
export type OrganizationField = $Keys<typeof organizationFieldMap>;


export const organizationFilterMap = generateTypeMap(
  'all',
  'members',
  'none',
  'public',
);
export type OrganizationFilter = $Keys<typeof organizationFilterMap>;

export const boardVisibilityFilterMap = generateTypeMap('admin', 'none', 'org');
type BoardVisibilityFilter = $Keys<typeof boardVisibilityFilterMap>;

export const boardVisibilityRestrictionLevelMap = generateTypeMap('org', 'private', 'public');
type BoardVisibilityRestrictionLevel = $Keys<typeof boardVisibilityRestrictionLevelMap>;

class Pref extends BaseResource {
  /* istanbul ignore next: Requires Business Class subscription */
  updateAssociatedDomain(value: string): Promise<any> {
    return this.httpPut('/associatedDomain', { value });
  }

  /* istanbul ignore next: Requires special permissions */
  updateBoardVisibilityRestriction(
    level: BoardVisibilityRestrictionLevel,
    value: BoardVisibilityFilter,
  ): Promise<any> {
    return this.httpPut(`/boardVisibilityRestrict/${level}`, { value });
  }

  /* istanbul ignore next: Requires special permissions */
  updateExternalMembersDisabled(value: boolean): Promise<any> {
    return this.httpPut('/externalMembersDisabled', { value });
  }

  /* istanbul ignore next: Requires special permissions */
  updateGoogleAppsVersion(value: number): Promise<any> {
    return this.httpPut('/googleAppsVersion', { value });
  }

  /* istanbul ignore next: Requires special permissions */
  updateOrgInviteRestrict(value: string): Promise<any> {
    return this.httpPut('/orgInviteRestrict', { value });
  }

  updatePermissionLevel(value: PermissionLevel): Promise<any> {
    return this.httpPut('/permissionLevel', { value });
  }

  /* istanbul ignore next: Requires special permissions */
  deleteAssociatedDomain(): Promise<any> {
    return this.httpDelete('/associatedDomain');
  }

  /* istanbul ignore next: Requires special permissions */
  deleteOrgInviteRestrict(emailAddress: string): Promise<any> {
    return this.httpDelete('/orgInviteRestrict', { value: emailAddress });
  }
}

/**
 * @namespace Organization
 */
export default class Organization extends BaseResource {
  getOrganizations(
    queryArgs?: {
      filter?: ArgumentGroup<OrganizationFilter>,
      fields?: ArgumentGroup<OrganizationField>,
      paidAccount?: boolean,
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getOrganization(
    queryArgs?: {
      actions?: ArgumentGroup<ActionFilter>,
      actionsEntities?: boolean,
      actionsDisplay?: boolean,
      actionsLimit?: number,
      actionFields?: ArgumentGroup<ActionField>,
      memberships?: ArgumentGroup<MembershipFilter>,
      membershipsMember?: boolean,
      membershipsMemberFields?: ArgumentGroup<MemberField>,
      members?: MemberFilter,
      memberFields?: ArgumentGroup<MemberField>,
      memberActivity?: boolean,
      membersInvited?: MemberFilter,
      membersInvitedFields?: ArgumentGroup<MemberField>,
      pluginData?: boolean,
      boards?: ArgumentGroup<BoardFilter>,
      boardFields?: ArgumentGroup<BoardField>,
      boardActions?: ArgumentGroup<ActionFilter>,
      boardActionsEntities?: boolean,
      boardActionsDisplay?: boolean,
      boardActionsFormat?: Format,
      boardActionsSince?: FilterDate,
      boardActionsLimit?: number,
      boardActionFields?: ArgumentGroup<ActionField>,
      boardLists?: ArgumentGroup<ListFilter>,
      boardPluginData?: boolean,
      paidAccount?: boolean,
      fields?: ArgumentGroup<OrganizationField>,
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getOrganizationsFilteredBy(filter: ArgumentGroup<OrganizationFilter>): Promise<any> {
    return this.httpGet('/', { filter });
  }

  getFieldValue(field: OrganizationField): Promise<any> {
    return this.httpGet(`/${field}`);
  }

  actions() {
    return new Action(this.config, `${this.routePath}/actions`);
  }

  boards() {
    return new Board(this.config, `${this.routePath}/boards`);
  }

  /* istanbul ignore next: Requires Business Class subscription */
  getDeltas(
    queryArgs: {
      tags: string,
      ixLastUpdate: number,
    },
  ): Promise<any> {
    return this.httpGet('/deltas', queryArgs);
  }

  members(memberId?: string = '') {
    return new Member(this.config, `${this.routePath}/members/${memberId}`);
  }

  membersInvited() {
    return new Member(this.config, `${this.routePath}/membersInvited`);
  }

  memberships(membershipId?: string = '') {
    return new Membership(this.config, `${this.routePath}/memberships/${membershipId}`);
  }

  getPluginData(): Promise<any> {
    return this.httpGet('/pluginData');
  }

  /* istanbul ignore next: Requires Business Class subscription */
  getTags(): Promise<any> {
    return this.httpGet('/tags');
  }

  updateOrganization(
    queryArgs?: {
      prefs?: {
        associatedDomain?: string,
        externalMembersDisabled?: boolean,
        googleAppsVersion?: number,
        orgInviteRestrict?: string,
        permissionLevel?: PermissionLevel,
        boardVisibilityRestrict?: {
          orgRestriction?: BoardVisibilityFilter,
          privateRestriction?: BoardVisibilityFilter,
          publicRestriction?: BoardVisibilityFilter,
        },
      },
      name?: string,
      displayName?: string,
      desc?: string,
      website?: ?string,
    },
  ): Promise<any> {
    return this.httpPut('/', { ...queryArgs, separator: '/' });
  }

  updateDescription(value: string): Promise<any> {
    return this.httpPut('/desc', { value });
  }

  updateDisplayName(value: string): Promise<any> {
    return this.httpPut('/displayName', { value });
  }

  updateName(value: string): Promise<any> {
    return this.httpPut('/name', { value });
  }

  prefs() {
    return new Pref(this.config, `${this.routePath}/prefs`);
  }

  updateWebsite(value: ?string): Promise<any> {
    return this.httpPut('/website', { value });
  }

  addOrganization(
    queryArgs?: {
      name?: string,
      displayName?: string,
      desc?: string,
      website?: string,
    },
  ): Promise<any> {
    return this.httpPost('/', queryArgs);
  }

  uploadLogo(file: Object): Promise<any> {
    return this.httpPost('/logo', { file });
  }

  /* istanbul ignore next: Requires Business Class subscription */
  addTags(name: string): Promise<any> {
    return this.httpPost('/tags', { name });
  }

  deleteOrganization(): Promise<any> {
    return this.httpDelete('/');
  }

  deleteLogo(): Promise<any> {
    return this.httpDelete('/logo');
  }
}
