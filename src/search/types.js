/* @flow */

/**
 * @apiDefine ModelTypesQueryArg
 * @apiParam {String="all","actions","boards","cards","members","organizations"} [modelTypes='"all"']
 * Model types to limit search to.  , can either be <code>"all"</code> or a
 *    comma separated list of field names.
 */
export type ModelType =
  'actions'
  | 'boards'
  | 'cards'
  | 'members'
  | 'organizations';
