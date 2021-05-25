import {
  AllOrFieldOrListOf,
  AnyParams,
  BoardMemberType,
  MemberField,
  MemberFilter,
  MembershipFilter,
  MembershipRecord,
  NestedActionsParams,
  NestedMemberParams,
  TypedFetch,
} from "../typeDefs";

import { BaseResource } from "./BaseResource";

export class Membership extends BaseResource {
  public getMembership(
    params?: NestedActionsParams & NestedMemberParams,
  ): TypedFetch<MembershipRecord> {
    return this.apiGet("/", params as AnyParams);
  }

  public getMemberships(
    params?: {
      filter?: Omit<MemberFilter, "owners"> | Omit<MembershipFilter, "none">;
      activity?: boolean;
      orgMemberType?: boolean;
    } & NestedActionsParams &
      NestedMemberParams,
  ): TypedFetch<MembershipRecord[]> {
    return this.apiGet("/", params as Record<string, unknown>);
  }

  public updateMembership(params: {
    type: BoardMemberType;
    memberFields?: AllOrFieldOrListOf<MemberField>;
  }): TypedFetch<MembershipRecord> {
    return this.apiPut("/", { ...params, idMembership: this.identifier });
  }
}
