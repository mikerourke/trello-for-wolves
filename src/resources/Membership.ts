import { BaseResource } from "./BaseResource";
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
    return this.apiGet("/", params);
  }

  public updateMembership(params: {
    type: BoardMemberType;
    memberFields?: AllOrFieldOrListOf<MemberField>;
  }): TypedFetch<MembershipRecord> {
    return this.apiPut("/", { ...params, idMembership: this.identifier });
  }
}
