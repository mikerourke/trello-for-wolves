/**
 * @api {path} /organizations organization
 * @apiVersion 1.0.0
 * @apiName organization
 * @apiGroup overview
 * @apiDescription
 *    RESTful endpoints that point to <code>organizations</code> refer to the
 *    Trello concept of Teams.
 *    <br><br>
 *    Trello offers the option to create teams, and to set your boards so that
 *    they belong to those teams. Just like boards, teams can have members
 *    (including team admins and normal team members). There are no limits to
 *    the number of members you can have in a team, or the number of teams you
 *    can belong to in a single account.
 */

/**
 * @apiDefine OrganizationFieldQueryArg
 * @apiParam {String="billableMemberCount","desc","descData","displayName","idBoards","invitations","invited","logoHash","memberships","name","powerUps","prefs","premiumFeatures","products","url","website"} field
 *    Organization field to get value for.
 */

/**
 * @apiDefine OrganizationFieldsQueryArg
 * @apiParam {String="all","billableMemberCount","desc","descData","displayName","idBoards","invitations","invited","logoHash","memberships","name","powerUps","prefs","premiumFeatures","products","url","website"} [fields='"all"']
 *    Organization fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine OrganizationInclusionQueryArgs
 * @apiParam {Boolean} [organization=false] Include <code>organization</code>
 *    data in the response.
 * @apiParam {String="all","billableMemberCount","desc","descData","displayName","idBoards","invitations","invited","logoHash","memberships","name","powerUps","prefs","premiumFeatures","products","url","website"} [organizationFields='"name,displayName"']
 *    Organization fields to include in the response, can either be
 *    <code>"all"</code> or an array of field names.
 */
