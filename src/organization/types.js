/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

export type OrganizationFilter =
  'all'
  | 'members'
  | 'none'
  | 'public';

export type OrganizationField =
  'billableMemberCount'
  | 'desc'
  | 'descData'
  | 'displayName'
  | 'idBoards'
  | 'invitations'
  | 'invited'
  | 'logoHash'
  | 'memberships'
  | 'name'
  | 'powerUps'
  | 'prefs'
  | 'premiumFeatures'
  | 'products'
  | 'url'
  | 'website';

export type OrganizationInclusionQueryArgs = {
  organization?: boolean,
  organizationFields?: ArgumentGroup<OrganizationField>,
};
