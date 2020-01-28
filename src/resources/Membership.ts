import { BaseResource } from "./BaseResource";
import { BoardMemberType } from "./Board";
import {
  MemberField,
  MemberFilter,
  MemberInvitedField,
  MemberRecord,
  MemberType,
} from "./Member";
import { AllOfOrListOf, TypedFetch } from "../typeDefs";

export type MembershipFilter =
  | "active"
  | "admin"
  | "all"
  | "deactivated"
  | "me"
  | "none"
  | "normal";

export interface MembershipRecord {
  id: string;
  idMember: string;
  memberType: string;
  unconfirmed: boolean;
  deactivated: boolean;
  orgMemberType?: string;
  member?: MemberRecord;
}

export class Membership extends BaseResource {
  public getMembership(params?: {
    member?: boolean;
    memberFields?: AllOfOrListOf<MemberField>;
  }): TypedFetch<MembershipRecord> {
    this.validateGetSingle();
    return this.apiGet("/", params);
  }

  public getMemberships(params?: {
    filter?: Omit<MemberFilter, "owners"> | Omit<MembershipFilter, "none">;
    member?: boolean;
    // These are callable from a Board only:
    activity?: boolean;
    orgMemberType?: boolean;
    memberFields?: AllOfOrListOf<MemberField>;
  }): TypedFetch<MembershipRecord[]> {
    return this.apiGet("/", params);
  }

  /**
   * Use the BoardMemberType when calling this from a board and MemberType
   * when calling from a member or organization.
   */
  public updateMembership(params: {
    // When called from Member or Organization:
    type: BoardMemberType | MemberType;
    fields?: AllOfOrListOf<MemberInvitedField>;
  }): TypedFetch<MembershipRecord> {
    return this.apiPut("/", params);
  }
}
