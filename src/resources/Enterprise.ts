import { BaseResource } from "./BaseResource";
import { ArgumentGroup } from "../typeDefs";
import { MemberEnterpriseOnlyField, MemberFilter } from "./Member";
import { OrganizationField, OrganizationFilter } from "./Organization";
import { MembershipFilter } from "./Membership";
import { BoardField } from "./Board";

type ValueOrArray<T> = Omit<ArgumentGroup<T>, "all">;

export type EnterpriseField =
  | "id"
  | "name"
  | "displayName"
  | "prefs"
  | "ssoActivationFailed"
  | "idAdmins"
  | "products"
  | "userTypes"
  | "memberIds"
  | "orgIds";

export type SortOrder = "id" | "ascending" | "descending" | "asc" | "desc";

export class Enterprise extends BaseResource {
  public getEnterprise(params?: {
    fields?: ArgumentGroup<EnterpriseField>;
    members?: MemberFilter;
    memberFields?: MemberEnterpriseOnlyField;
    memberFilter?: "none" | string;
    memberSortBy?: "none" | string;
    memberSortOrder?: SortOrder;
    memberStartIndex?: number;
    memberCount?: number;
    organizations?: OrganizationFilter;
    organizationFields?: ArgumentGroup<OrganizationField>;
    organizationPaidAccounts?: boolean;
    organizationMemberships?: ValueOrArray<MembershipFilter>;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getAdmins(params?: {
    fields: "fullName" | "userName";
  }): Promise<unknown> {
    return this.apiGet("/admins", params);
  }

  public getSignupUrl(params?: {
    authenticate?: boolean;
    confirmationAccepted?: boolean;
    returnUrl?: "none" | string;
  }): Promise<unknown> {
    return this.apiGet("/signupUrl", params);
  }

  public getMembers(params?: {
    fields?: ValueOrArray<EnterpriseField>;
    filter?: string;
    sortBy?: "none" | string;
    sortOrder?: SortOrder;
    startIndex?: number;
    count?: number;
    organizationFields?: ArgumentGroup<OrganizationField>;
    boardFields?: ArgumentGroup<BoardField>;
  }): Promise<unknown> {
    return this.apiGet("/members", params);
  }

  public getMember(
    memberId: string,
    params?: {
      fields?: ValueOrArray<MemberEnterpriseOnlyField>;
      organizationFields?: ArgumentGroup<OrganizationField>;
      boardFields?: ArgumentGroup<BoardField>;
    },
  ): Promise<unknown> {
    return this.apiGet(`/members/${memberId}`, params);
  }

  public getIfOrgTransferrable(orgId: string): Promise<unknown> {
    return this.apiGet(`/transferrable/organization/${orgId}`);
  }

  public deactivateMember(
    memberId: string,
    params?: {
      fields?: ValueOrArray<MemberEnterpriseOnlyField>;
      organizationFields?: ArgumentGroup<OrganizationField>;
      boardFields?: ArgumentGroup<BoardField>;
    },
  ): Promise<unknown> {
    return this.apiPut(`/members/${memberId}/deactivated`, params);
  }

  public transferToOrganization(orgId: string): Promise<unknown> {
    return this.apiPut("/organizations", { idOrganization: orgId });
  }

  public addMemberAsAdmin(memberId: string): Promise<unknown> {
    return this.apiPut(`/admins/${memberId}`);
  }

  public addToken(params?: {
    expiration: "none" | "1hour" | "1day" | "30days" | "never";
  }): Promise<unknown> {
    return this.apiPost("/tokens", params);
  }

  public dissociateOrganization(orgId: string): Promise<unknown> {
    return this.apiDelete(`/organizations/${orgId}`);
  }

  public removeMemberFromAdmin(memberId: string): Promise<unknown> {
    return this.apiDelete(`/admins/${memberId}`);
  }
}
