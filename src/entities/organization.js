/* @flow */

/* Types */
import type { Auth } from '../types';

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

export default class Organization {
  auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }
}
