/* @flow */

/* Types */
import type {
  AllOrNone,
  ArgumentGroup,
} from '../types';

export type ChecklistField = 'idBoard' | 'idCard' | 'name' | 'pos';

export type CheckItemField = 'name' | 'nameData' | 'pos' | 'state' | 'value';

export type CheckItemState = 'complete' | 'false' | 'incomplete' | 'true';

export type CheckItemStateField = 'idCheckItem' | 'state';

/**
 * @apiDefine ChecklistInclusionQueryArgs
 * @apiParam {String="all","none"} [checklists='"none"'] Checklists to include
 *    in response.
 * @apiParam {String="all","idBoard","idCard","name","pos"} [checklistFields='"all"']
 *    Checklist fields to include in response, can either be <code>"all"</code>
 *    or a comma separated list of field names.
 */
export type ChecklistInclusionQueryArgs = {
  checklists?: AllOrNone,
  checklistFields?: ArgumentGroup<ChecklistField>,
};

/**
 * @apiDefine CheckItemInclusionQueryArgs
 * @apiParam {String="all","none"} [checkItems='"none"'] Checklist items to
 *    include in response.
 * @apiParam {String="all","name","nameData","pos","state","value"} [checkItemFields='"all"']
 *    Checklist item fields to include in response, can either be
 *    <code>"all"</code> or a comma separated list of field names.
 */
export type CheckItemInclusionQueryArgs = {
  checkItems?: AllOrNone,
  checkItemFields?: ArgumentGroup<CheckItemField>,
};

export type CheckItemStateInclusionQueryArgs = {
  checkItemStates?: AllOrNone,
  checkItemStateFields?: ArgumentGroup<CheckItemState>,
};
