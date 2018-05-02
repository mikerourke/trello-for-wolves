import BaseResource from './baseResource';
import { BoardField } from './board';
import { MemberEnterpriseOnlyField, MemberFilter } from './member';
import { MembershipFilter } from './membership';
import { OrganizationField, OrganizationFilter } from './organization';
import { ArgumentGroup } from '../types';

type Combination<T> = T | T[];

type EnterpriseField =
  | 'id'
  | 'name'
  | 'displayName'
  | 'prefs'
  | 'ssoActivationFailed'
  | 'idAdmins'
  | 'memberIds'
  | 'orgIds'
  | 'products'
  | 'userTypes'
  | 'memberIds'
  | 'orgIds';

type SortOrder = 'id' | 'ascending' | 'descending' | 'asc' | 'desc';

/**
 * @namespace Enterprise
 */
export default class Enterprise extends BaseResource {
  public getEnterprise = (queryArgs?: {
    fields?: ArgumentGroup<EnterpriseField>;
    members?: MemberFilter;
    memberFields?: MemberEnterpriseOnlyField;
    memberFilter?: 'none' | string;
    memberSortBy?: 'none' | string;
    memberSortOrder?: SortOrder;
    memberStartIndex?: number;
    memberCount?: number;
    organizations?: OrganizationFilter;
    organizationFields?: ArgumentGroup<OrganizationField>;
    organizationPaidAccounts?: boolean;
    organizationMemberships?: Combination<MembershipFilter>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getAdmins = (queryArgs?: {
    fields: 'fullName' | 'userName';
  }): Promise<any> => this.httpGet('/admins', queryArgs);

  public getSignupUrl = (queryArgs?: {
    authenticate?: boolean;
    confirmationAccepted?: boolean;
    returnUrl?: 'none' | string;
  }): Promise<any> => this.httpGet('/signupUrl', queryArgs);

  public getMembers = (queryArgs?: {
    fields?: Combination<EnterpriseField>;
    filter?: string;
    sortBy?: 'none' | string;
    sortOrder?: SortOrder;
    startIndex?: number;
    count?: number;
    organizationFields?: ArgumentGroup<OrganizationField>;
    boardFields?: ArgumentGroup<BoardField>;
  }): Promise<any> => this.httpGet('/members', queryArgs);

  public getMember = (
    memberId: string,
    queryArgs?: {
      fields?: Combination<MemberEnterpriseOnlyField>;
      organizationFields?: ArgumentGroup<OrganizationField>;
      boardFields?: ArgumentGroup<BoardField>;
    },
  ): Promise<any> => this.httpGet(`/members/${memberId}`, queryArgs);

  public getIfOrgTransferrable = (orgId: string): Promise<any> =>
    this.httpGet(`/transferrable/organization/${orgId}`);

  public deactivateMember = (
    memberId: string,
    queryArgs?: {
      fields?: Combination<MemberEnterpriseOnlyField>;
      organizationFields?: ArgumentGroup<OrganizationField>;
      boardFields?: ArgumentGroup<BoardField>;
    },
  ): Promise<any> =>
    this.httpPut(`/members/${memberId}/deactivated`, queryArgs);

  public transferToOrganization = (orgId: string): Promise<any> =>
    this.httpPut('/organizations', { idOrganization: orgId });

  public addMemberAsAdmin = (memberId: string): Promise<any> =>
    this.httpPut(`/admins/${memberId}`);

  public addToken = (queryArgs?: {
    expiration: 'none' | '1hour' | '1day' | '30days' | 'never';
  }): Promise<any> => this.httpPost('/tokens', queryArgs);

  public dissociateOrganization = (orgId: string): Promise<any> =>
    this.httpDelete(`/organizations/${orgId}`);

  public removeMemberFromAdmin = (memberId: string): Promise<any> =>
    this.httpDelete(`/admins/${memberId}`);
}
