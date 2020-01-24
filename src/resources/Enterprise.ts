import { BaseResource } from "./BaseResource";
import { BoardField } from "./Board";
import { MemberBasicField, MemberFilter } from "./Member";
import { MembershipFilter } from "./Membership";
import { OrganizationField, OrganizationFilter } from "./Organization";
import { AllOfOrListOf, TypedFetch } from "../typeDefs";

type ValueOrArray<T> = Omit<AllOfOrListOf<T>, "all">;

export type EnterpriseField =
  | "displayName"
  | "id"
  | "idAdmins"
  | "memberIds"
  | "name"
  | "orgIds"
  | "prefs"
  | "products"
  | "ssoActivationFailed"
  | "userTypes";

export type SortOrder = "asc" | "ascending" | "desc" | "descending" | "id";

export class Enterprise extends BaseResource {
  public getEnterprise(params?: {
    fields?: AllOfOrListOf<EnterpriseField>;
    memberCount?: number;
    memberFields?: MemberBasicField;
    memberFilter?: "none" | string;
    members?: MemberFilter;
    memberSortBy?: "none" | string;
    memberSortOrder?: SortOrder;
    memberStartIndex?: number;
    organizationFields?: AllOfOrListOf<OrganizationField>;
    organizationMemberships?: ValueOrArray<MembershipFilter>;
    organizationPaidAccounts?: boolean;
    organizations?: OrganizationFilter;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getAdmins(params?: {
    fields: "fullName" | "userName";
  }): TypedFetch<unknown> {
    return this.apiGet("/admins", params);
  }

  public getSignupUrl(params?: {
    authenticate?: boolean;
    confirmationAccepted?: boolean;
    returnUrl?: "none" | string;
  }): TypedFetch<unknown> {
    return this.apiGet("/signupUrl", params);
  }

  public getMembers(params?: {
    boardFields?: AllOfOrListOf<BoardField>;
    count?: number;
    fields?: ValueOrArray<EnterpriseField>;
    filter?: string;
    organizationFields?: AllOfOrListOf<OrganizationField>;
    sortBy?: "none" | string;
    sortOrder?: SortOrder;
    startIndex?: number;
  }): TypedFetch<unknown> {
    return this.apiGet("/members", params);
  }

  public getMember(
    memberId: string,
    params?: {
      boardFields?: AllOfOrListOf<BoardField>;
      fields?: ValueOrArray<MemberBasicField>;
      organizationFields?: AllOfOrListOf<OrganizationField>;
    },
  ): TypedFetch<unknown> {
    return this.apiGet(`/members/${memberId}`, params);
  }

  public getIfOrgTransferrable(orgId: string): TypedFetch<unknown> {
    return this.apiGet(`/transferrable/organization/${orgId}`);
  }

  public transferToOrganization(orgId: string): TypedFetch<unknown> {
    return this.apiPut("/organizations", { idOrganization: orgId });
  }

  public addMemberAsAdmin(memberId: string): TypedFetch<unknown> {
    return this.apiPut(`/admins/${memberId}`);
  }

  public addToken(params?: {
    expiration: "none" | "1hour" | "1day" | "30days" | "never";
  }): TypedFetch<unknown> {
    return this.apiPost("/tokens", params);
  }

  public deactivateMember(
    memberId: string,
    params?: {
      boardFields?: AllOfOrListOf<BoardField>;
      fields?: ValueOrArray<MemberBasicField>;
      organizationFields?: AllOfOrListOf<OrganizationField>;
    },
  ): TypedFetch<unknown> {
    return this.apiPut(`/members/${memberId}/deactivated`, params);
  }

  public dissociateOrganization(orgId: string): TypedFetch<unknown> {
    return this.apiDelete(`/organizations/${orgId}`);
  }

  public removeMemberFromAdmin(memberId: string): TypedFetch<unknown> {
    return this.apiDelete(`/admins/${memberId}`);
  }
}
