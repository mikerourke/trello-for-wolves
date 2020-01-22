import { BaseResource } from "./BaseResource";
import { ArgumentGroup } from "../typeDefs";
import { MemberField, MemberType } from "./Member";
import { BoardMemberType } from "./Board";

export type MembershipFilter =
  | "active"
  | "admin"
  | "deactivated"
  | "me"
  | "none"
  | "normal";

export class Membership extends BaseResource {
  public getMemberships(params?: {
    filter?: ArgumentGroup<MembershipFilter>;
    member?: boolean;
    // Member Fields are only allowed when called from a Board:
    memberFields?: ArgumentGroup<MemberField>;
  }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public getMembership(params?: {
    member?: boolean;
    // Member Fields are only allowed when called from a Board:
    memberFields?: ArgumentGroup<MemberField>;
  }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public updateMembership(
    params:
      | {
          // When called from a Board:
          type: BoardMemberType;
          fields?: ArgumentGroup<MemberField>;
        }
      | {
          // When called from Member or Organization:
          type: MemberType;
          fields?: ArgumentGroup<MemberField>;
        },
  ): Promise<unknown> {
    return this.httpPut("/", params);
  }
}
