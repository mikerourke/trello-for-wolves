/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

export type MembershipFilter =
  'active'
  | 'admin'
  | 'deactivated'
  | 'me'
  | 'none'
  | 'normal';

/**
 * @apiDefine MembershipsQueryArgs
 * @apiParam {String="all","active","admin","deactivated","me","none","normal"} [memberships='"none"']
 *    Membership data to include in response.
 */
export type MembershipsQueryArgs = {
  memberships?: ArgumentGroup<MembershipFilter>,
}
