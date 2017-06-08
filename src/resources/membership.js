/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  ArgumentGroup,
  Auth,
  MemberField,
  MemberType,
  ResourceConstructorOptions,
} from '../types';

export type MembershipFilter =
  'active'
  | 'admin'
  | 'deactivated'
  | 'me'
  | 'none'
  | 'normal';

export default class Membership extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'membership', options);
  }

  getMemberships(
    queryArgs?: {
      member?: boolean,
      memberFields?: ArgumentGroup<MemberField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getMembership(
    queryArgs?: {
      filter?: ArgumentGroup<MembershipFilter>,
      member?: boolean,
      memberFields?: ArgumentGroup<MemberField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  updateMembership(
    queryArgs: {
      type: MemberType,
      fields?: ArgumentGroup<MemberField>,
    },
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }
}
