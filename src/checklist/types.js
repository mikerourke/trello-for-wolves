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

export type ChecklistFieldsQueryArgs = {
  checklists?: AllOrNone,
  checklistFields?: ArgumentGroup<ChecklistField>,
};

export type CheckItemStatesQueryArgs = {
  checkItemStates?: AllOrNone,
  checkItemStateFields?: ArgumentGroup<CheckItemState>,
};
