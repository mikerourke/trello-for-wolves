/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  ArgumentGroup,
  BoardMemberType,
  MemberField,
  MemberType,
} from '../types';

export type MembershipFilter =
  'active'
  | 'admin'
  | 'deactivated'
  | 'me'
  | 'none'
  | 'normal';

/**
 * @namespace Membership
 */
export default class Membership extends BaseResource {
  getMemberships(
    queryArgs?: {
      filter?: ArgumentGroup<MembershipFilter>,
      member?: boolean,
      // Member Fields are only allowed when called from a Board:
      memberFields?: ArgumentGroup<MemberField>,
    },
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getMembership(
    queryArgs?: {
      member?: boolean,
      // Member Fields are only allowed when called from a Board:
      memberFields?: ArgumentGroup<MemberField>,
    },
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  updateMembership(
    queryArgs: {
      // When called from a Board:
      type: BoardMemberType,
      fields?: ArgumentGroup<MemberField>,
    } | {
      // When called from Member or Organization:
      type: MemberType,
      fields?: ArgumentGroup<MemberField>,
    },
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }
}
