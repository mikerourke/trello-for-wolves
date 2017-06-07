/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  ArgumentGroup,
  Auth,
  MemberField,
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

  getMembership(
    queryArgs?: {
      filter?: ArgumentGroup<MembershipFilter>,
      member?: boolean,
      memberFields?: ArgumentGroup<MemberField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getMemberships(
    queryArgs?: {
      member?: boolean,
      memberFields?: ArgumentGroup<MemberField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }
}
