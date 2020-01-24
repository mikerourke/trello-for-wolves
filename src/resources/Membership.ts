import { BaseResource } from "./BaseResource";
import { BoardMemberType } from "./Board";
import { MemberField, MemberType } from "./Member";
import { AllOfOrListOf, TypedFetch } from "../typeDefs";

export type MembershipFilter =
  | "active"
  | "admin"
  | "deactivated"
  | "me"
  | "none"
  | "normal";

export class Membership extends BaseResource {
  public getMemberships(params?: {
    filter?: AllOfOrListOf<MembershipFilter>;
    member?: boolean;
    // Member Fields are only allowed when called from a Board:
    memberFields?: AllOfOrListOf<MemberField>;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getMembership(params?: {
    member?: boolean;
    // Member Fields are only allowed when called from a Board:
    memberFields?: AllOfOrListOf<MemberField>;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  /**
   * Use the BoardMemberType when calling this from a board and MemberType
   * when calling from a member or organization.
   */
  public updateMembership(params: {
    // When called from Member or Organization:
    type: BoardMemberType | MemberType;
    fields?: AllOfOrListOf<MemberField>;
  }): TypedFetch<unknown> {
    return this.apiPut("/", params);
  }
}
