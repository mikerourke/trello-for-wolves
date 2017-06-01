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

export type MemberType = 'admin' | 'normal' | 'observer';

/**
 * @apiDefine MemberInclusionQueryArgs
 * @apiParam {Boolean} [member=true] Include member fields in response.
 * @apiParam {String=all,avatarHash,bio,bioData,confirmed,fullName,idPremOrgsAdmin,initials,memberType,products,status,url,username"} [memberFields="avatarHash,fullName,initials,username"]
 * Member fields to include in response, can either be <code>all</code> or a comma separated list of field names.
 */
export type MemberInclusionQueryArgs = {
  member?: boolean,
  memberFields?: ArgumentGroup<MemberField>,
};

/**
 * @apiDefine MemberCreatorInclusionQueryArgs
 * @apiParam {Boolean} [memberCreator=true] Include member creator fields in response.
 * @apiParam {String=all,avatarHash,bio,bioData,confirmed,fullName,idPremOrgsAdmin,initials,memberType,products,status,url,username"} [memberCreatorFields="avatarHash,fullName,initials,username"]
 * Member creator fields to include in response, can either be <code>all</code> or a comma separated list of field names.
 */
export type MemberCreatorInclusionQueryArgs = {
  memberCreator?: boolean,
  memberCreatorFields?: ArgumentGroup<MemberField>,
};

export type MembershipsMemberInclusionQueryArgs = {
  membershipsMember?: boolean,
  membershipsMemberFields?: ArgumentGroup<MemberField>,
};

export type MembersInvitedInclusionQueryArgs = {
  membersInvited?: boolean,
  membersInvitedFields?: ArgumentGroup<MemberField>,
};
