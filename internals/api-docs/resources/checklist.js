/**
 * @api {path} /checklists checklist
 * @apiVersion 1.0.0
 * @apiName checklist
 * @apiGroup overview
 * @apiDescription
 *    A checklist is a way of keeping track of subtasks within a card. You can
 *    add multiple checklists to a single card.
 */

/**
 * @apiDefine ChecklistFieldsQueryArg
 * @apiParam {String="all","idBoard","idCard","name","pos"} [fields='"all"']
 *    Checklist fields to include in response, can either be <code>"all"</code>
 *    or an array of field names.
 */

/**
 * @apiDefine ChecklistFilterQueryArg
 * @apiParam {String="all","none"} [filter='"all"']
 *    Checklist types to include in response.
 */

/**
 * @apiDefine ChecklistInclusionQueryArgs
 * @apiParam {String="all","none"} [checklists='"none"'] Checklists to include
 *    in response.
 * @apiParam {String="all","idBoard","idCard","name","pos"} [checklistFields='"all"']
 *    Checklist fields to include in response, can either be <code>"all"</code>
 *    or an array of field names.
 */

/**
 * @apiDefine CheckItemInclusionQueryArgs
 * @apiParam {String="all","none"} [checkItems='"none"'] Checklist items to
 *    include in response.
 * @apiParam {String="all","name","nameData","pos","state","value"} [checkItemFields='"all"']
 *    Checklist item fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine CheckItemStateInclusionQueryArgs
 * @apiParam {Boolean} [checkItemStates=true] Indicates if check item state
 *    data should be included in response.
 * @apiParam {String="all","idCheckItem","state"} [checkItemStateFields='"all"']
 *    Check item state fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */
