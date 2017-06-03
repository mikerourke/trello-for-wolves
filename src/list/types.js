/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

/**
 * @apiDefine ListFieldQueryArg
 * @apiParam {String="closed","idBoard","name","pos","subscribed"} field
 * List field to get value for.
 */

/**
 * @apiDefine ListFieldsQueryArg
 * @apiParam {String="all","closed","idBoard","name","pos","subscribed"} [fields='"all"']
 * List fields to include in response, can either be <code>"all"</code> or a comma separated list of field names.
 */
export type ListField = 'closed' | 'idBoard' | 'name' | 'pos' | 'subscribed';

/**
 * @apiDefine ListFilterQueryArg
 * @apiParam {String="all","closed","none","open"} [filter='"all"']
 * Limit response to include specified statuses, can either be <code>"all"</code> or a comma separated list of field names.
 */
export type ListFilter = 'all' | 'closed' | 'none' | 'open';

/**
 * @apiDefine ListInclusionQueryArgs
 * @apiParam {String="all","closed","none","open"} [list='"all"']
 * Limit response to include specified statuses, can either be <code>"all"</code> or a comma separated list of field names.
 * @apiParam {String="all","closed","idBoard","name","pos","subscribed"} [listFields='"all"']
 * Member fields to include in response, can either be <code>"all"</code> or a comma separated list of field names.
 */
export type ListInclusionQueryArgs = {
  list?: ListFilter,
  listFields?: ArgumentGroup<ListField>,
};
