import BaseResource from './baseResource';
import { BoardMemberType } from './board';
import { MemberField, MemberType } from './member';
import { ArgumentGroup } from '../types';

export type MembershipFilter =
  | 'active'
  | 'admin'
  | 'deactivated'
  | 'me'
  | 'none'
  | 'normal';

/**
 * @namespace Membership
 */
export default class Membership extends BaseResource {
  public getMemberships = (queryArgs?: {
    filter?: ArgumentGroup<MembershipFilter>;
    member?: boolean;
    // Member Fields are only allowed when called from a Board:
    memberFields?: ArgumentGroup<MemberField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getMembership = (queryArgs?: {
    member?: boolean;
    // Member Fields are only allowed when called from a Board:
    memberFields?: ArgumentGroup<MemberField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public updateMembership = (
    queryArgs:
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
  ): Promise<any> => this.httpPut('/', queryArgs);
}
