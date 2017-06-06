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

export type MembershipsQueryArgs = {
  memberships?: ArgumentGroup<MembershipFilter>,
}
