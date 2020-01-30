import { BaseResource } from "./BaseResource";
import { BoardMemberType } from "./Board";
import {
  MemberField,
  MemberFilter,
  MemberInvitedField,
  MemberRecord,
} from "./Member";
import { AllOrFieldOrListOf, TypedFetch } from "../typeDefs";

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
    memberFields?: AllOrFieldOrListOf<MemberField>;
  }): TypedFetch<MembershipRecord> {
    return this.apiGet("/", params);
  }

  public getMemberships(params?: {
    filter?: Omit<MemberFilter, "owners"> | Omit<MembershipFilter, "none">;
    member?: boolean;
    // These are callable from a Board only:
    activity?: boolean;
    orgMemberType?: boolean;
    memberFields?: AllOrFieldOrListOf<MemberField>;
  }): TypedFetch<MembershipRecord[]> {
    return this.apiGet("/", params);
  }

  public getNestedMemberships<TPayload extends object>(
    filter?: AllOrFieldOrListOf<MembershipFilter>,
  ): TypedFetch<TPayload & { memberships: MembershipRecord[] }> {
    return this.apiGetNested({ memberships: filter });
  }

  public updateMembership(params: {
    type: BoardMemberType;
    memberFields?: AllOrFieldOrListOf<MemberInvitedField>;
  }): TypedFetch<MembershipRecord> {
    if (!this.identifier) {
      throw new Error(
        "You must pass a membership ID to memberships() when calling updateMembership() from a board",
      );
    }

    return this.apiPut("/", { ...params, idMembership: this.identifier });
  }
}
