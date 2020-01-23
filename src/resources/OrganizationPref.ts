import { BaseResource } from "./BaseResource";
import { PermissionLevel } from "../typeDefs";

export type BoardVisibilityFilter = "admin" | "none" | "org";

export type BoardVisibilityRestrictionLevel = "org" | "private" | "public";

export class OrganizationPref extends BaseResource {
  public updateAssociatedDomain(value: string): Promise<unknown> {
    return this.apiPut("/associatedDomain", { value });
  }

  public updateBoardVisibilityRestriction(
    level: BoardVisibilityRestrictionLevel,
    value: BoardVisibilityFilter,
  ): Promise<unknown> {
    return this.apiPut(`/boardVisibilityRestrict/${level}`, { value });
  }

  public updateExternalMembersDisabled(value: boolean): Promise<unknown> {
    return this.apiPut("/externalMembersDisabled", { value });
  }

  public updateGoogleAppsVersion(value: number): Promise<unknown> {
    return this.apiPut("/googleAppsVersion", { value });
  }

  public updateOrgInviteRestrict(value: string): Promise<unknown> {
    return this.apiPut("/orgInviteRestrict", { value });
  }

  public updatePermissionLevel(value: PermissionLevel): Promise<unknown> {
    return this.apiPut("/permissionLevel", { value });
  }

  public deleteAssociatedDomain(): Promise<unknown> {
    return this.apiDelete("/associatedDomain");
  }

  public deleteOrgInviteRestrict(emailAddress: string): Promise<unknown> {
    return this.apiDelete("/orgInviteRestrict", { value: emailAddress });
  }
}
