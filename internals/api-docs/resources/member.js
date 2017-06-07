/**
 * @api {path} /members member
 * @apiVersion 1.0.0
 * @apiName member
 * @apiGroup overview
 * @apiDescription
 *    Members represent people that are on the team associated with a board.
 *    They have a permission level ("Admin" or "Normal"), that controls the
 *    changes they are able to make to a board.
 */

/**
 * @apiDefine MemberFilterQueryArg
 * @apiParam {String="admins","all","none","normal","owners"} [filter]
 *    Member level types to include in the response
 */

/**
 * @apiDefine MemberFieldQueryArg
 * @apiParam {String="avatarHash","bioData","idPremOrgsAdmin","memberType","products","status","url"} field
 *    Member field to get value for.
 */

/**
 * @apiDefine MemberFieldsQueryArg
 * @apiParam {String[]="all","avatarHash","bioData","idPremOrgsAdmin","memberType","products","status","url"} [fields=["avatarHash","fullName","initials","username"]]
 *    Member fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 */

/**
 * @apiDefine MemberEveryFieldQueryArg
 * @apiParam {String="avatarHash","avatarSource","bio","bioData","confirmed","email","fullName","gravatarHash","idBoards","idBoardsPinned","idOrganizations","idPremOrgsAdmin","initials","loginTypes","memberType","oneTimeMessagesDismissed","prefs","premiumFeatures","products","status","status","trophies","uploadedAvatarHash","url","username"} field
 *    Member field to get value for.
 */

/**
 * @apiDefine MemberEveryFieldsQueryArg
 * @apiParam {String="all","avatarHash","avatarSource","bio","bioData","confirmed","email","fullName","gravatarHash","idBoards","idBoardsPinned","idOrganizations","idPremOrgsAdmin","initials","loginTypes","memberType","oneTimeMessagesDismissed","prefs","premiumFeatures","products","status","status","trophies","uploadedAvatarHash","url","username"} [fields='"all"']
 *    Member fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 */

/**
 * @apiDefine ActionMemberInclusionQueryArgs
 * @apiParam {Boolean} [actionMember=true] Indicates if member fields should be
 *    included in response for actions.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [actionMemberFields='"avatarHash,fullName,initials,username"']
 *    Member fields for actions to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [actionMemberCreator=true] Indicates if member creator
 *    fields should be included in response for actions.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [actionMemberFields='"avatarHash,fullName,initials,username"']
 *    Member creator fields for actions to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine MemberInclusionQueryArgs
 * @apiParam {Boolean} [member=true] Indicates if member fields should be
 *    included in response.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberFields='"avatarHash,fullName,initials,username"']
 *    Member fields to include in response, can either be <code>"all"</code>
 *    or an array of field names.
 */

/**
 * @apiDefine MemberCreatorInclusionQueryArgs
 * @apiParam {Boolean} [memberCreator=true] Indicates if member creator fields
 *    should be included in response.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberCreatorFields='"avatarHash,fullName,initials,username"']
 *    Member creator fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine MembershipsMemberInclusionQueryArgs
 * @apiParam {Boolean} [membershipsMember=true] Indicates if membership member
 *    fields should be included in response.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberCreatorFields='"avatarHash,fullName,initials,username"']
 *    Membership member fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine MembersInvitedInclusionQueryArgs
 * @apiParam {String="admins","all","none","normal","owners"} [membersInvited=true]
 *    Member levels for invited members that should be included in response.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [membersInvitedFields='"avatarHash,fullName,initials,username"']
 *    Invited member fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine MembershipFilterQueryArg
 * @apiParam {String="all","active","admin","deactivated","me","none","normal"} [filter='"all"']
 *    Membership types to include in response.
 */

/**
 * @apiDefine MembershipsQueryArgs
 * @apiParam {String="all","active","admin","deactivated","me","none","normal"} [memberships='"none"']
 *    Membership data to include in response.
 */
