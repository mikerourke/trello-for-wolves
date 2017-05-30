/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

export type MemberLevel = 'admins' | 'all' | 'none' | 'normal' | 'owners';

export type MemberField =
  'avatarHash'
  | 'bio'
  | 'bioData'
  | 'confirmed'
  | 'fullName'
  | 'idPremOrgsAdmin'
  | 'initials'
  | 'memberType'
  | 'products'
  | 'status'
  | 'url'
  | 'username';

export type InvitedMemberField = MemberField &
  'avatarSource'
  | 'email'
  | 'gravatarHash'
  | 'idBoards'
  | 'idBoardsPineed'
  | 'idOrganizations'
  | 'loginTypes'
  | 'oneTimeMessageDismissed'
  | 'prefs'
  | 'premiumFeatures'
  | 'trophies'
  | 'uploadedAvatarHash';

export type Membership =
  'active'
  | 'admin'
  | 'deactivated'
  | 'me'
  | 'none'
  | 'normal';

export type MemberType = 'admin' | 'normal' | 'observer';

export type MemberQueryArgs = {
  member?: boolean,
  memberFields?: ArgumentGroup<MemberField>,
};

export type MemberCreatorQueryArgs = {
  memberCreator?: boolean,
  memberCreatorFields?: boolean,
};

export type MembershipsQueryArgs = {
  membershipsMember?: boolean,
  membershipsMemberFields?: ArgumentGroup<MemberField>,
};
