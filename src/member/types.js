/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

/**
 * @apiDefine MemberFilterQueryArg
 * @apiParam {String="admins","all","none","normal","owners"} [filter]
 *    Member level types to include in the response
 */
export type MemberFilter = 'admins' | 'all' | 'none' | 'normal' | 'owners';

export type AvatarSourceField =
  'gravatar'
  | 'none'
  | 'upload';

/**
 * @apiDefine MemberFieldQueryArg
 * @apiParam {String="avatarHash","bioData","idPremOrgsAdmin","memberType","products","status","url"} field
 *    Member field to get value for.
 */

/**
 * @apiDefine MemberFieldsQueryArg
 * @apiParam {String="all","avatarHash","bioData","idPremOrgsAdmin","memberType","products","status","url"} [fields='"all"']
 *    Member fields to include in response, can either be <code>"all"</code> or
 *    a comma separated list of field names.
 */
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

/**
 * @apiDefine MemberEveryFieldQueryArg
 * @apiParam {String="avatarHash","avatarSource","bio","bioData","confirmed","email","fullName","gravatarHash","idBoards","idBoardsPinned","idOrganizations","idPremOrgsAdmin","initials","loginTypes","memberType","oneTimeMessagesDismissed","prefs","premiumFeatures","products","status","status","trophies","uploadedAvatarHash","url","username"} field
 *    Member field to get value for.
 */

/**
 * @apiDefine MemberEveryFieldsQueryArg
 * @apiParam {String="all","avatarHash","avatarSource","bio","bioData","confirmed","email","fullName","gravatarHash","idBoards","idBoardsPinned","idOrganizations","idPremOrgsAdmin","initials","loginTypes","memberType","oneTimeMessagesDismissed","prefs","premiumFeatures","products","status","status","trophies","uploadedAvatarHash","url","username"} [fields='"all"']
 *    Member fields to include in response, can either be <code>"all"</code> or
 *    a comma separated list of field names.
 */
export type MemberEveryField = MemberField & MemberDetailField;

export type MemberType = 'admin' | 'normal' | 'observer';

/**
 * @apiDefine ActionMemberInclusionQueryArgs
 * @apiParam {Boolean} [actionMember=true] Indicates if member fields should be
 *    included in response for actions.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [actionMemberFields='"avatarHash,fullName,initials,username"']
 *    Member fields for actions to include in response, can either be
 *    <code>"all"</code> or a comma separated list of field names.
 * @apiParam {Boolean} [actionMemberCreator=true] Indicates if member creator
 *    fields should be included in response for actions.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [actionMemberFields='"avatarHash,fullName,initials,username"']
 *    Member creator fields for actions to include in response, can either be
 *    <code>"all"</code> or a comma separated list of field names.
 */
export type ActionMemberInclusionQueryArgs = {
  actionMember?: boolean,
  actionMemberFields?: ArgumentGroup<MemberField>,
  actionMemberCreator?: boolean,
  actionMemberCreatorFields?: ArgumentGroup<MemberField>,
};

/**
 * @apiDefine MemberInclusionQueryArgs
 * @apiParam {Boolean} [member=true] Indicates if member fields should be
 *    included in response.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberFields='"avatarHash,fullName,initials,username"']
 *    Member fields to include in response, can either be <code>"all"</code>
 *    or a comma separated list of field names.
 */
export type MemberInclusionQueryArgs = {
  member?: boolean,
  memberFields?: ArgumentGroup<MemberField>,
};

/**
 * @apiDefine MemberCreatorInclusionQueryArgs
 * @apiParam {Boolean} [memberCreator=true] Indicates if member creator fields
 *    should be included in response.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberCreatorFields='"avatarHash,fullName,initials,username"']
 *    Member creator fields to include in response, can either be
 *    <code>"all"</code> or a comma separated list of field names.
 */
export type MemberCreatorInclusionQueryArgs = {
  memberCreator?: boolean,
  memberCreatorFields?: ArgumentGroup<MemberField>,
};

/**
 * @apiDefine MembershipsMemberInclusionQueryArgs
 * @apiParam {Boolean} [membershipsMember=true] Indicates if membership member
 *    fields should be included in response.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberCreatorFields='"avatarHash,fullName,initials,username"']
 *    Membership member fields to include in response, can either be
 *    <code>"all"</code> or a comma separated list of field names.
 */
export type MembershipsMemberInclusionQueryArgs = {
  membershipsMember?: boolean,
  membershipsMemberFields?: ArgumentGroup<MemberField>,
};

/**
 * @apiDefine MembersInvitedInclusionQueryArgs
 * @apiParam {String="admins","all","none","normal","owners"} [membersInvited=true]
 *    Member levels for invited members that should be included in response.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [membersInvitedFields='"avatarHash,fullName,initials,username"']
 *    Invited member fields to include in response, can either be
 *    <code>"all"</code> or a comma separated list of field names.
 */
export type MembersInvitedInclusionQueryArgs = {
  membersInvited?: MemberFilter,
  membersInvitedFields?: ArgumentGroup<MemberField>,
};
