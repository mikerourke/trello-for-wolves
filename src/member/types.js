/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

export type MemberFilter = 'admins' | 'all' | 'none' | 'normal' | 'owners';

export type AvatarSourceField =
  'gravatar'
  | 'none'
  | 'upload';

export type MemberField =
  'avatarHash'
  | 'bioData'
  | 'confirmed'
  | 'idPremOrgsAdmin'
  | 'memberType'
  | 'products'
  | 'status'
  | 'url';

export type MemberDetailField =
  'avatarSource'
  | 'bio'
  | 'email'
  | 'fullName'
  | 'gravatarHash'
  | 'idBoards'
  | 'idBoardsPineed'
  | 'idOrganizations'
  | 'initials'
  | 'loginTypes'
  | 'oneTimeMessageDismissed'
  | 'prefs'
  | 'premiumFeatures'
  | 'trophies'
  | 'uploadedAvatarHash'
  | 'username';

export type MemberEveryField = MemberField & MemberDetailField;

export type MemberType = 'admin' | 'normal' | 'observer';

export type ActionMemberInclusionQueryArgs = {
  actionMember?: boolean,
  actionMemberFields?: ArgumentGroup<MemberField>,
  actionMemberCreator?: boolean,
  actionMemberCreatorFields?: ArgumentGroup<MemberField>,
};

export type MemberInclusionQueryArgs = {
  member?: boolean,
  memberFields?: ArgumentGroup<MemberField>,
};

export type MemberCreatorInclusionQueryArgs = {
  memberCreator?: boolean,
  memberCreatorFields?: ArgumentGroup<MemberField>,
};

export type MembershipsMemberInclusionQueryArgs = {
  membershipsMember?: boolean,
  membershipsMemberFields?: ArgumentGroup<MemberField>,
};

export type MembersInvitedInclusionQueryArgs = {
  membersInvited?: MemberFilter,
  membersInvitedFields?: ArgumentGroup<MemberField>,
};
