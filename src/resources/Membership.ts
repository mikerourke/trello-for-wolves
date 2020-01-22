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
  public getMemberships(options?: {
    filter?: ArgumentGroup<MembershipFilter>;
    member?: boolean;
    // Member Fields are only allowed when called from a Board:
    memberFields?: ArgumentGroup<MemberField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getMembership(options?: {
    member?: boolean;
    // Member Fields are only allowed when called from a Board:
    memberFields?: ArgumentGroup<MemberField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public updateMembership(
    options:
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
    return this.httpPut("/", options);
  }
}
