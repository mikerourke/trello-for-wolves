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
  public getEnterprise(options?: {
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
    return this.httpGet("/", options);
  }

  public getAdmins(options?: {
    fields: "fullName" | "userName";
  }): Promise<unknown> {
    return this.httpGet("/admins", options);
  }

  public getSignupUrl(options?: {
    authenticate?: boolean;
    confirmationAccepted?: boolean;
    returnUrl?: "none" | string;
  }): Promise<unknown> {
    return this.httpGet("/signupUrl", options);
  }

  public getMembers(options?: {
    fields?: ValueOrArray<EnterpriseField>;
    filter?: string;
    sortBy?: "none" | string;
    sortOrder?: SortOrder;
    startIndex?: number;
    count?: number;
    organizationFields?: ArgumentGroup<OrganizationField>;
    boardFields?: ArgumentGroup<BoardField>;
  }): Promise<unknown> {
    return this.httpGet("/members", options);
  }

  public getMember(
    memberId: string,
    options?: {
      fields?: ValueOrArray<MemberEnterpriseOnlyField>;
      organizationFields?: ArgumentGroup<OrganizationField>;
      boardFields?: ArgumentGroup<BoardField>;
    },
  ): Promise<unknown> {
    return this.httpGet(`/members/${memberId}`, options);
  }

  public getIfOrgTransferrable(orgId: string): Promise<unknown> {
    return this.httpGet(`/transferrable/organization/${orgId}`);
  }

  public deactivateMember(
    memberId: string,
    options?: {
      fields?: ValueOrArray<MemberEnterpriseOnlyField>;
      organizationFields?: ArgumentGroup<OrganizationField>;
      boardFields?: ArgumentGroup<BoardField>;
    },
  ): Promise<unknown> {
    return this.httpPut(`/members/${memberId}/deactivated`, options);
  }

  public transferToOrganization(orgId: string): Promise<unknown> {
    return this.httpPut("/organizations", { idOrganization: orgId });
  }

  public addMemberAsAdmin(memberId: string): Promise<unknown> {
    return this.httpPut(`/admins/${memberId}`);
  }

  public addToken(options?: {
    expiration: "none" | "1hour" | "1day" | "30days" | "never";
  }): Promise<unknown> {
    return this.httpPost("/tokens", options);
  }

  public dissociateOrganization(orgId: string): Promise<unknown> {
    return this.httpDelete(`/organizations/${orgId}`);
  }

  public removeMemberFromAdmin(memberId: string): Promise<unknown> {
    return this.httpDelete(`/admins/${memberId}`);
  }
}
