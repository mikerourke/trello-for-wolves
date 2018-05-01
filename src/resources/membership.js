// @flow
import { generateTypeMap } from '../utils/typeMapper';
import BaseResource from './baseResource';
import type {
  ArgumentGroup,
  BoardMemberType,
  MemberField,
  MemberType,
} from '../types';

export const membershipFilterMap = generateTypeMap(
  'active',
  'admin',
  'deactivated',
  'me',
  'none',
  'normal',
);
export type MembershipFilter = $Keys<typeof membershipFilterMap>;

/**
 * @namespace Membership
 */
export default class Membership extends BaseResource {
  getMemberships(queryArgs?: {
    filter?: ArgumentGroup<MembershipFilter>,
    member?: boolean,
    // Member Fields are only allowed when called from a Board:
    memberFields?: ArgumentGroup<MemberField>,
  }): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getMembership(queryArgs?: {
    member?: boolean,
    // Member Fields are only allowed when called from a Board:
    memberFields?: ArgumentGroup<MemberField>,
  }): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  updateMembership(
    queryArgs:
      | {
          // When called from a Board:
          type: BoardMemberType,
          fields?: ArgumentGroup<MemberField>,
        }
      | {
          // When called from Member or Organization:
          type: MemberType,
          fields?: ArgumentGroup<MemberField>,
        },
  ): Promise<any> {
    return this.httpPut('/', queryArgs);
  }
}
