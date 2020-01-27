import { BaseResource } from "./BaseResource";
import { PermissionLevel, TypedFetch } from "../typeDefs";

export type BoardVisibilityFilter = "admin" | "none" | "org";

export type BoardVisibilityRestrictionLevel = "org" | "private" | "public";

export class OrganizationPref extends BaseResource {
  public updateAssociatedDomain(value: string): TypedFetch<unknown> {
    return this.apiPut("/associatedDomain", { value });
  }

  public updateBoardVisibilityRestriction(
    level: BoardVisibilityRestrictionLevel,
    value: BoardVisibilityFilter,
  ): TypedFetch<unknown> {
    return this.apiPut(`/boardVisibilityRestrict/${level}`, { value });
  }

  public updateExternalMembersDisabled(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/externalMembersDisabled", { value });
  }

  public updateGoogleAppsVersion(value: number): TypedFetch<unknown> {
    return this.apiPut("/googleAppsVersion", { value });
  }

  public updateOrgInviteRestrict(value: string): TypedFetch<unknown> {
    return this.apiPut("/orgInviteRestrict", { value });
  }

  public updatePermissionLevel(value: PermissionLevel): TypedFetch<unknown> {
    return this.apiPut("/permissionLevel", { value });
  }

  public deleteAssociatedDomain(): TypedFetch<unknown> {
    return this.apiDelete("/associatedDomain");
  }

  public deleteOrgInviteRestrict(emailAddress: string): TypedFetch<unknown> {
    return this.apiDelete("/orgInviteRestrict", { value: emailAddress });
  }
}