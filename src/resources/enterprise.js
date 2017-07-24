/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  ArgumentGroup,
  BoardField,
  MemberEnterpriseOnlyField,
  MemberFilter,
  MembershipFilter,
  OrganizationField,
  OrganizationFilter,
} from '../types';

type Combination<T> = T | Array<T>;

type EnterpriseField =
  'id'
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
  getEnterprise(
    queryArgs?: {
      fields?: ArgumentGroup<EnterpriseField>,
      members?: MemberFilter,
      memberFields?: MemberEnterpriseOnlyField,
      memberFilter?: 'none' | string,
      memberSortBy?: 'none' | string,
      memberSortOrder?: SortOrder,
      memberStartIndex?: number,
      memberCount?: number,
      organizations?: OrganizationFilter,
      organizationFields?: ArgumentGroup<OrganizationField>,
      organizationPaidAccounts?: boolean,
      organizationMemberships?: Combination<MembershipFilter>,
    },
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getAdmins(
    queryArgs?: {
      fields: 'fullName' | 'userName',
    },
  ): Promise<*> {
    return this.httpGet('/admins', queryArgs);
  }

  getSignupUrl(
    queryArgs?: {
      authenticate?: boolean,
      confirmationAccepted?: boolean,
      returnUrl?: 'none' | string,
    },
  ): Promise<*> {
    return this.httpGet('/signupUrl', queryArgs);
  }

  getMembers(
    queryArgs?: {
      fields?: Combination<EnterpriseField>,
      filter?: string,
      sortBy?: 'none' | string,
      sortOrder?: SortOrder,
      startIndex?: number,
      count?: number,
      organizationFields?: ArgumentGroup<OrganizationField>,
      boardFields?: ArgumentGroup<BoardField>,
    },
  ): Promise<*> {
    return this.httpGet('/members', queryArgs);
  }

  getMember(
    memberId: string,
    queryArgs?: {
      fields?: Combination<MemberEnterpriseOnlyField>,
      organizationFields?: ArgumentGroup<OrganizationField>,
      boardFields?: ArgumentGroup<BoardField>,
    },
  ): Promise<*> {
    return this.httpGet(`/members/${memberId}`, queryArgs);
  }

  getIfOrgTransferrable(orgId: string): Promise<*> {
    return this.httpGet(`/transferrable/organization/${orgId}`);
  }

  deactivateMember(
    memberId: string,
    queryArgs?: {
      fields?: Combination<MemberEnterpriseOnlyField>,
      organizationFields?: ArgumentGroup<OrganizationField>,
      boardFields?: ArgumentGroup<BoardField>,
    },
  ): Promise<*> {
    return this.httpPut(`/members/${memberId}/deactivated`, queryArgs);
  }

  transferToOrganization(orgId: string): Promise<*> {
    return this.httpPut('/organizations', { idOrganization: orgId });
  }

  addMemberAsAdmin(memberId: string): Promise<*> {
    return this.httpPut(`/admins/${memberId}`);
  }

  addToken(
    queryArgs?: {
      expiration: 'none' | '1hour' | '1day' | '30days' | 'never',
    },
  ): Promise<*> {
    return this.httpPost('/tokens', queryArgs);
  }

  dissociateOrganization(orgId: string): Promise<*> {
    return this.httpDelete(`/organizations/${orgId}`);
  }

  removeMemberFromAdmin(memberId: string): Promise<*> {
    return this.httpDelete(`/admins/${memberId}`);
  }
}
