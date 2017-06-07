/**
 * @api {path} /lists list
 * @apiVersion 1.0.0
 * @apiName list
 * @apiGroup overview
 * @apiDescription
 *    A List is a collection of Cards. In the standard Trello interface, Lists
 *    are stacked horizontally and are ordered on a board.
 */

/**
 * @apiDefine ListFieldQueryArg
 * @apiParam {String="closed","idBoard","name","pos","subscribed"} field
 *    List field to get value for.
 */

/**
 * @apiDefine ListFieldsQueryArg
 * @apiParam {String="all","closed","idBoard","name","pos","subscribed"} [fields='"all"']
 *    List fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 */

/**
 * @apiDefine ListFilterQueryArg
 * @apiParam {String="all","closed","none","open"} [filter='"all"']
 *    Limit response to include specified statuses, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine ListInclusionQueryArgs
 * @apiParam {String="all","closed","none","open"} [list='"all"']
 *    Limit response to include specified statuses, can either be
 *    <code>"all"</code> or an array of field names.
 * @apiParam {String="all","closed","idBoard","name","pos","subscribed"} [listFields='"all"']
 *    List fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */
