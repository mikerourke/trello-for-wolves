import { BaseResource } from "./BaseResource";
import { ArgumentGroup } from "../typeDefs";
import { MemberEnterpriseOnlyField, MemberFilter } from "./Member";
import { OrganizationField, OrganizationFilter } from "./Organization";
import { MembershipFilter } from "./Membership";
import { BoardField } from "./Board";

type ValueOrArray<T> = Omit<ArgumentGroup<T>, "all">;

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
    fields?: ArgumentGroup<EnterpriseField>;
    memberCount?: number;
    memberFields?: MemberEnterpriseOnlyField;
    memberFilter?: "none" | string;
    members?: MemberFilter;
    memberSortBy?: "none" | string;
    memberSortOrder?: SortOrder;
    memberStartIndex?: number;
    organizationFields?: ArgumentGroup<OrganizationField>;
    organizationMemberships?: ValueOrArray<MembershipFilter>;
    organizationPaidAccounts?: boolean;
    organizations?: OrganizationFilter;
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
    boardFields?: ArgumentGroup<BoardField>;
    count?: number;
    fields?: ValueOrArray<EnterpriseField>;
    filter?: string;
    organizationFields?: ArgumentGroup<OrganizationField>;
    sortBy?: "none" | string;
    sortOrder?: SortOrder;
    startIndex?: number;
  }): Promise<unknown> {
    return this.apiGet("/members", params);
  }

  public getMember(
    memberId: string,
    params?: {
      boardFields?: ArgumentGroup<BoardField>;
      fields?: ValueOrArray<MemberEnterpriseOnlyField>;
      organizationFields?: ArgumentGroup<OrganizationField>;
    },
  ): Promise<unknown> {
    return this.apiGet(`/members/${memberId}`, params);
  }

  public getIfOrgTransferrable(orgId: string): Promise<unknown> {
    return this.apiGet(`/transferrable/organization/${orgId}`);
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

  public deactivateMember(
    memberId: string,
    params?: {
      boardFields?: ArgumentGroup<BoardField>;
      fields?: ValueOrArray<MemberEnterpriseOnlyField>;
      organizationFields?: ArgumentGroup<OrganizationField>;
    },
  ): Promise<unknown> {
    return this.apiPut(`/members/${memberId}/deactivated`, params);
  }

  public dissociateOrganization(orgId: string): Promise<unknown> {
    return this.apiDelete(`/organizations/${orgId}`);
  }

  public removeMemberFromAdmin(memberId: string): Promise<unknown> {
    return this.apiDelete(`/admins/${memberId}`);
  }
}
