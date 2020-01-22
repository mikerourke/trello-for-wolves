import { BaseResource } from "./BaseResource";
import { PermissionLevel } from "../typeDefs";

export type BoardVisibilityFilter = "admin" | "none" | "org";

export type BoardVisibilityRestrictionLevel = "org" | "private" | "public";

export class OrganizationPref extends BaseResource {
  public updateAssociatedDomain(value: string): Promise<unknown> {
    return this.httpPut("/associatedDomain", { value });
  }

  public updateBoardVisibilityRestriction(
    level: BoardVisibilityRestrictionLevel,
    value: BoardVisibilityFilter,
  ): Promise<unknown> {
    return this.httpPut(`/boardVisibilityRestrict/${level}`, { value });
  }

  public updateExternalMembersDisabled(value: boolean): Promise<unknown> {
    return this.httpPut("/externalMembersDisabled", { value });
  }

  public updateGoogleAppsVersion(value: number): Promise<unknown> {
    return this.httpPut("/googleAppsVersion", { value });
  }

  public updateOrgInviteRestrict(value: string): Promise<unknown> {
    return this.httpPut("/orgInviteRestrict", { value });
  }

  public updatePermissionLevel(value: PermissionLevel): Promise<unknown> {
    return this.httpPut("/permissionLevel", { value });
  }

  public deleteAssociatedDomain(): Promise<unknown> {
    return this.httpDelete("/associatedDomain");
  }

  public deleteOrgInviteRestrict(emailAddress: string): Promise<unknown> {
    return this.httpDelete("/orgInviteRestrict", { value: emailAddress });
  }
}
