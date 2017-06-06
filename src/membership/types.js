/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

/**
 * @apiDefine MembershipFilterQueryArg
 * @apiParam {String="all","active","admin","deactivated","me","none","normal"} [filter='"all"']
 *    Membership types to include in response.
 */
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
