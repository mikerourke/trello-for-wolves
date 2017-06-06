/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  FilterQueryArg,
  MembershipFilter,
  MemberInclusionQueryArgs,
  ResourceConstructorOptions,
} from '../types';

export default class Membership extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'membership', options);
  }

  getMembership(
    queryArgs?: FilterQueryArg<MembershipFilter> &
      MemberInclusionQueryArgs = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getMemberships(queryArgs?: MemberInclusionQueryArgs = {}): Promise<*> {
    return this.httpGet('/', queryArgs);
  }
}
