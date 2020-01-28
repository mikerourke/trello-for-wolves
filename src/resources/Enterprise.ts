import { BaseResource } from "./BaseResource";
import { BoardField } from "./Board";
import { NestedMemberField, MemberFilter } from "./Member";
import { MembershipFilter } from "./Membership";
import { OrganizationField, OrganizationFilter } from "./Organization";
import { AllOfOrListOf, TypedFetch, ValidResourceFields } from "../typeDefs";

export type SortOrder = "asc" | "ascending" | "desc" | "descending" | "id";

type ValueOrArray<T> = Omit<AllOfOrListOf<T>, "all">;

export interface EnterprisePrefsRecord {
  ssoOnly: boolean;
  signup: {
    message: string;
    confirmation: string;
    banner: string;
    bannerHtml: string;
    confirmationHtml: string;
    messageHtml: string;
  };
  mandatoryTransferDate: string | null;
  maxMembers: number | null;
}

export type EnterpriseUserType =
  | "all"
  | "member"
  | "collaborator"
  | "saml"
  | "none";

export interface EnterpriseRecord {
  /** The ID of the enterprise. */
  id: string;
  /** Short-form name of the enterprise. */
  name: string;
  /**
   * Long-form name of the enterprise used when displaying the full name of the
   * enterprise.
   */
  displayName: string;
  /**
   * JSON Object containing information about the preferences set within the
   * enterprise.
   */
  prefs: EnterprisePrefsRecord;
  /** Determines whether SSO successfully activated. */
  ssoActivationFailed: boolean;
  /** Array of Member IDs that are admins of the enterprise. */
  idAdmins: string[];
  /** Array of Member IDs that belong to the enterprise. */
  idMembers: string[];
  /** Array of Organization IDs that belong to the enterprise. */
  idOrganizations: string[];
  /** Array of products that the enterprise has enabled. */
  products: number[];
  /**
   * Object containing keys for every member type (all, member, collaborator,
   * saml, none) and values representing the count of each type of member.
   */
  userTypes: Record<EnterpriseUserType, number>;
}

export type EnterpriseField = ValidResourceFields<EnterpriseRecord>;

export class Enterprise extends BaseResource {
  public getEnterprise(params?: {
    fields?: AllOfOrListOf<EnterpriseField>;
    members?: MemberFilter;
    memberFields?: NestedMemberField;
    memberFilter?: "none" | string;
    memberSort?: string;
    memberSortBy?: "none" | string;
    memberSortOrder?: SortOrder;
    memberStartIndex?: number;
    memberCount?: number;
    organizations?: OrganizationFilter;
    organizationFields?: AllOfOrListOf<OrganizationField>;
    organizationPaidAccounts?: boolean;
    organizationMemberships?: ValueOrArray<MembershipFilter>;
  }): TypedFetch<EnterpriseRecord> {
    this.validateGetSingle();
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
    tosAccepted?: boolean;
  }): TypedFetch<unknown> {
    return this.apiGet("/signupUrl", params);
  }

  public getMember(
    idMember: string,
    params?: {
      idMember?: string | "none";
      fields?: ValueOrArray<NestedMemberField>;
      organizationFields?: AllOfOrListOf<OrganizationField>;
      boardFields?: AllOfOrListOf<BoardField>;
    },
  ): TypedFetch<unknown> {
    return this.apiGet(`/members/${idMember}`, params);
  }

  public getMembers(params?: {
    fields?: ValueOrArray<EnterpriseField>;
    filter?: string;
    sort?: string;
    sortBy?: "none" | string;
    sortOrder?: SortOrder;
    startIndex?: number;
    count?: number;
    organizationFields?: AllOfOrListOf<OrganizationField>;
    boardFields?: AllOfOrListOf<BoardField>;
  }): TypedFetch<unknown> {
    return this.apiGet("/members", params);
  }

  public getIfOrgTransferrable(orgId: string): TypedFetch<unknown> {
    return this.apiGet(`/transferrable/organization/${orgId}`);
  }

  public transferToOrganization(idOrganization: string): TypedFetch<unknown> {
    return this.apiPut("/organizations", { idOrganization });
  }

  public addMemberAsAdmin(idMember: string): TypedFetch<unknown> {
    return this.apiPut(`/admins/${idMember}`);
  }

  public addToken(params?: {
    expiration: "none" | "1hour" | "1day" | "30days" | "never";
  }): TypedFetch<unknown> {
    return this.apiPost("/tokens", params);
  }

  public deactivateMember(
    idMember: string,
    params: {
      value: boolean;
      fields?: ValueOrArray<NestedMemberField>;
      organizationFields?: AllOfOrListOf<OrganizationField>;
      boardFields?: AllOfOrListOf<BoardField>;
    },
  ): TypedFetch<unknown> {
    return this.apiPut(`/members/${idMember}/deactivated`, params);
  }

  public dissociateOrganization(idOrg: string): TypedFetch<unknown> {
    return this.apiDelete(`/organizations/${idOrg}`);
  }

  public removeMemberFromAdmin(idMember: string): TypedFetch<unknown> {
    return this.apiDelete(`/admins/${idMember}`);
  }
}
