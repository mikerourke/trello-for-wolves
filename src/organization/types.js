/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

export type BoardVisibilityFilter =
  'admin'
  | 'none'
  | 'org';

/**
 * @apiDefine OrganizationFieldQueryArg
 * @apiParam {String="billableMemberCount","desc","descData","displayName","idBoards","invitations","invited","logoHash","memberships","name","powerUps","prefs","premiumFeatures","products","url","website"} field
 *    Organization field to get value for.
 */

/**
 * @apiDefine OrganizationFieldsQueryArg
 * @apiParam {String="all","billableMemberCount","desc","descData","displayName","idBoards","invitations","invited","logoHash","memberships","name","powerUps","prefs","premiumFeatures","products","url","website"} [fields='"all"']
 *    Organization fields to include in response, can either be
 *    <code>"all"</code> or a comma separated list of field names.
 */
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

export type OrganizationFilter =
  'all'
  | 'members'
  | 'none'
  | 'public';

/**
 * @apiDefine OrganizationInclusionQueryArgs
 * @apiParam {Boolean} [organization=false] Include <code>organization</code>
 *    data in the response.
 * @apiParam {String="all","billableMemberCount","desc","descData","displayName","idBoards","invitations","invited","logoHash","memberships","name","powerUps","prefs","premiumFeatures","products","url","website"} [organizationFields='"name,displayName"']
 *    Organization fields to include in the response, can either be
 *    <code>"all"</code> or a comma separated list of field names.
 */
export type OrganizationInclusionQueryArgs = {
  organization?: boolean,
  organizationFields?: ArgumentGroup<OrganizationField>,
};
