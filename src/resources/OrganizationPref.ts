import { BaseResource } from "./BaseResource";
import {
  BoardVisibilityFilter,
  BoardVisibilityRestrictionLevel,
  PermissionLevel,
  TypedFetch,
} from "../typeDefs";

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

  public removeAssociatedDomain(): TypedFetch<unknown> {
    return this.apiDelete("/associatedDomain");
  }

  public removeOrgInviteRestrict(): TypedFetch<unknown> {
    return this.apiDelete("/orgInviteRestrict");
  }
}
