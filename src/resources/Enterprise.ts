import { BaseResource } from "./BaseResource";
import { NestedMemberField, MemberFilter, Member } from "./Member";
import { MembershipFilter } from "./Membership";
import {
  Organization,
  OrganizationField,
  OrganizationFilter,
} from "./Organization";
import {
  AllOrFieldOrListOf,
  TypedFetch,
  ValidResourceFields,
} from "../typeDefs";

export type SortOrder = "asc" | "ascending" | "desc" | "descending" | "id";

type ValueOrArray<T> = Omit<AllOrFieldOrListOf<T>, "all">;

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

/**
 The data corresponding to an enterprise. The fields that are present in the
 * record are contingent on the `fields` param passed to the method used to
 * retrieve the enterprise data.
 * @typedef {Object} EnterpriseRecord
 * @property id The ID of the enterprise.
 * @property name Short-form name of the enterprise.
 * @property displayName Long-form name of the enterprise used when displaying
 *                       the full name of the enterprise.
 * @property prefs JSON Object containing information about the preferences set
 *                 within the enterprise.
 * @property ssoActivationFailed Determines whether SSO successfully activated.
 * @property idAdmins Array of Member IDs that are admins of the enterprise.
 * @property idMembers Array of Member IDs that belong to the enterprise.
 * @property idOrganizations Array of Organization IDs that belong to the enterprise.
 * @property products Array of products that the enterprise has enabled.
 * @property userTypes Object containing keys for every member type and values
 *                     representing the count of each type of member.
 */
export interface EnterpriseRecord {
  id: string;
  name: string;
  displayName: string;
  prefs: EnterprisePrefsRecord;
  ssoActivationFailed: boolean;
  idAdmins: string[];
  idMembers: string[];
  idOrganizations: string[];
  products: number[];
  userTypes: Record<EnterpriseUserType, number>;
}

export type EnterpriseField = ValidResourceFields<EnterpriseRecord>;

export class Enterprise extends BaseResource {
  public getEnterprise(params?: {
    fields?: AllOrFieldOrListOf<EnterpriseField>;
    members?: MemberFilter;
    memberFields?: NestedMemberField;
    memberFilter?: "none" | string;
    memberSort?: string;
    memberSortBy?: "none" | string;
    memberSortOrder?: SortOrder;
    memberStartIndex?: number;
    memberCount?: number;
    organizations?: OrganizationFilter;
    organizationFields?: AllOrFieldOrListOf<OrganizationField>;
    organizationPaidAccounts?: boolean;
    organizationMemberships?: ValueOrArray<MembershipFilter>;
  }): TypedFetch<EnterpriseRecord> {
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

  public getIfOrgTransferrable(idOrganization: string): TypedFetch<unknown> {
    return this.apiGet(`/transferrable/organization/${idOrganization}`);
  }

  public addMemberAsAdmin(idMember: string): TypedFetch<unknown> {
    return this.apiPut(`/admins/${idMember}`);
  }

  public removeMemberFromAdmin(idMember: string): TypedFetch<unknown> {
    return this.apiDelete(`/admins/${idMember}`);
  }

  public members(idMember: string = ""): Member {
    return new Member(this.config, this.pathElements, "members", {
      identifier: idMember,
      isReturnUrl: this.isReturnUrl,
    });
  }

  public organizations(idOrganization: string = ""): Organization {
    return new Organization(this.config, this.pathElements, "organizations", {
      identifier: idOrganization,
      isReturnUrl: this.isReturnUrl,
    });
  }
}
