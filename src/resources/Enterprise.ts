import {
  AllOrFieldOrListOf,
  EnterpriseField,
  EnterpriseMemberFilter,
  EnterpriseRecord,
  FieldOrListOf,
  GetEnterprisesField,
  MembershipFilter,
  NestedMembersParams,
  NestedOrganizationsParams,
  SortOrder,
  TypedFetch,
} from "../typeDefs";

import { BaseResource } from "./BaseResource";
import { Member } from "./Member";
import { Organization } from "./Organization";

export class Enterprise extends BaseResource {
  public getEnterprise(
    params?: {
      fields?: AllOrFieldOrListOf<EnterpriseField>;
      memberFilter?: "none" | string;
      memberSort?: string;
      memberSortBy?: "none" | string;
      memberSortOrder?: SortOrder;
      memberStartIndex?: number;
      memberCount?: number;
      organizationPaidAccounts?: boolean;
      organizationMemberships?: FieldOrListOf<MembershipFilter>;
    } & NestedMembersParams &
      NestedOrganizationsParams,
  ): TypedFetch<EnterpriseRecord> {
    return this.apiGet("/", params as Record<string, unknown>);
  }

  public getEnterprises(params?: {
    fields?: AllOrFieldOrListOf<GetEnterprisesField>;
    filter?: EnterpriseMemberFilter;
  }): TypedFetch<EnterpriseRecord[]> {
    return this.apiGet("/", params);
  }

  public getAdmins(params?: {
    fields?: "fullName" | "userName";
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

  public members(idMember: string = ""): Member {
    return new Member(this.config, this.pathElements, "members", {
      identifier: idMember,
    });
  }

  public organizations(idOrganization: string = ""): Organization {
    return new Organization(this.config, this.pathElements, "organizations", {
      identifier: idOrganization,
    });
  }
}
